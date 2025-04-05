import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/modules/chat/services/chat.service';

@Component({
  selector: 'component-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: false
})
export class SignInComponent {

  email!: string;
  password!: string;

  constructor(private auth: FirebaseService, private router: Router, private socketService: ChatService) { }

  async login() {

    const userCredentials = await this.auth.login(this.email, this.password)

    if (userCredentials) {
      const uid = userCredentials.user?.uid;

      if (uid) {
        this.socketService.initializeSocket(uid);
        this.router.navigate(['main/tabs/chats'])
      }
    }

  };

  async signInGoogle() {

    const userCredentials = await this.auth.signInGoogle();

    if (userCredentials) {
      this.router.navigate(['main/tabs/chats'])
    }

  };

  getCurrenUser() {
    const user = this.auth.getCurrentUser().subscribe()
    console.log(user);

    return user
  }

}
