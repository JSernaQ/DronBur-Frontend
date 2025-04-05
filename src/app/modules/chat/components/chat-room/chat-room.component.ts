import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/modules/auth/services/firebase.service';
import { Subscription } from 'rxjs';
import { ApiServerService } from 'src/app/modules/auth/services/api-server.service';

@Component({
  selector: 'app-chat-room-component',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
  standalone: false
})
export class ChatRoomComponent implements OnInit, OnDestroy {

  chatId !: any;
  chatInfoSubscription!: Subscription;
  chatInfo!: any;

  content: string = '';
  messagesList: any[] = [];

  newMessagesSubscription!: Subscription;

  userInfoSubscription!: Subscription;
  userInfo!: any;

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute,
    private authService: FirebaseService,
    private apiService: ApiServerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.chatId = this.route.snapshot.paramMap.get('id');
    this.chatService.joinChat(this.chatId);

    this.chatInfoSubscription = this.apiService.getChatInfo(this.chatId).subscribe(
      (res: any) => {
        console.log(res.infoChat);
        
        this.chatInfo = res.infoChat;
      }
    );
    
    if (this.messagesList.length === 0) {
      this.getMessage();
    };

    setTimeout(() => this.scrollToBottom(), 100);


    this.userInfoSubscription = this.authService.currentUser$.subscribe(user => {
      this.userInfo = user;
    });
    
    this.newMessagesSubscription = this.chatService.listenNewMessages().subscribe(
      (newMessage) => {
        console.log(newMessage);
        if (newMessage && newMessage.chatId == this.chatId) {
          const sender = typeof newMessage.sender === 'string'
          ? { _id: newMessage.sender }
          : newMessage.sender;
          
          this.messagesList.push({ ...newMessage, sender });
          setTimeout(() => this.scrollToBottom(), 100);
        }
      }
    );
  }
  
  getMessage() {
    this.chatService.getMessages(this.chatId).subscribe(
      (res: any) => {
        this.messagesList = res.messages;
        setTimeout(() => this.scrollToBottom(), 100);
      }
    );
  }

  scrollToBottom() {
    const messagesContainer = document.querySelector('.messages');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }
  
  

  async sendMessage() {
    if (this.content.trim() === '') return;

    // const newMessage = {
    //   chatId: this.chatId,
    //   sender: this.userInfo._id,
    //   content: this.content,
    //   type: 'text',
    // }
    
    this.chatService.sendMessage(this.chatId, this.userInfo._id, this.content);
    this.content = '';
    setTimeout(() => this.scrollToBottom(), 100);
  }

  goBack() {
    this.router.navigate(['main/tabs/chats'])
  }

  ngOnDestroy() {
    if (this.userInfoSubscription) this.userInfoSubscription.unsubscribe();
    if (this.newMessagesSubscription) this.newMessagesSubscription.unsubscribe();
    if (this.chatInfoSubscription) this.chatInfoSubscription.unsubscribe();
  }

}
