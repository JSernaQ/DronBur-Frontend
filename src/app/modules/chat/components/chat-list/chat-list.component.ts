import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { FirebaseService } from 'src/app/modules/auth/services/firebase.service';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
  standalone: false
})
export class ChatListComponent implements OnInit, OnDestroy {

  user: any = null;
  chats: any[] = [];
  userSubscription!: Subscription;
  chatsSubscription!: Subscription;
  isLoading: boolean = true;

  constructor(
    private chatService: ChatService, 
    private fbService: FirebaseService, 
    private apiServer: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userSubscription = this.fbService.getCurrentUser().subscribe(user => {
      if (user) {
        this.getChats(user.uidFB)
      }else {
        this.user = null;
        this.chats = [];
        this.isLoading = false;
      }
    })
  }

  async getChats(uid: string) {

    this.isLoading = true;

    try {
      
      this.user = await this.apiServer.getUser(uid);

      if (!this.user) {
        console.error('No se pudo obtener usuario');
        return;
      }

      if (this.chatsSubscription) {
        this.chatsSubscription.unsubscribe();
      }

      this.chatsSubscription = this.chatService.getChats(this.user._id).subscribe({
        next: (chats: any) => {
          console.log(chats);
          
          this.chats = chats?.chats || [];
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error al obtener los chats:', err);
          this.isLoading = false;
        }
      });
    } catch (error) {
      console.error('Error en getChats:', error);
      this.isLoading = false;
    }
  }
  
  openChat(chat: any) {
    console.log(chat._id);
    
    if (!chat || !chat._id) {
      console.error('Chat inválido:', chat);
      return;
    }
  
    this.router.navigate(['/main/tabs/chats', chat._id]);
  }

  ngOnDestroy() {
    if (this.userSubscription) this.userSubscription.unsubscribe();
    if (this.chatsSubscription) this.chatsSubscription.unsubscribe();
  }

}
