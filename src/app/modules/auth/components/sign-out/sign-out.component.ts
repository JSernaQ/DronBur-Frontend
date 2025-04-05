import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { ChatService } from 'src/app/modules/chat/services/chat.service';

@Component({
  selector: 'component-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss'],
  standalone: false
})
export class SignOutComponent {

  constructor(private auth: FirebaseService, private chatService: ChatService) { }

  async signOut() {
    
    try {
      await this.auth.signOut();
      this.chatService.disconnectSocket();
      console.log('Se cerro la sesión con exito');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }

  };
  
}
