import { Component } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { ApiServerService } from '../../services/api-server.service';

@Component({
  selector: 'component-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: false
})
export class SignUpComponent {

  email!: string;
  password!: string;

  constructor(private auth: FirebaseService, private apiServe: ApiServerService, private router: Router) { }

  async register() {

    try {

      const userCredentials = await this.auth.register(this.email, this.password);

      if (userCredentials) {

        const user = userCredentials.user;

        if (user) {

          const newUser = {
            email: user.email,
            uid: user.uid,
            accessToken: await user.getIdToken(),
            photoURL: user?.photoURL,
            username: user?.displayName,
          }

          const userActived = await this.apiServe.createUser(newUser);

          userActived.subscribe(
            (data) => {
              if ((data as any).ok) {
                this.router.navigate(['main/tabs/chats']);
              }
              //else{
              //   // const user = this.auth.getCurrenUser()
              //   // this.auth.deleteUser(user)
                
              // }
            }
          )

        }

      }

    } catch (error) {

      console.error(error);

    }



  };

  async signInGoogle() {

    const userCredentials = await this.auth.signInGoogle();

    if (userCredentials) {
      this.router.navigate(['main/tabs/chats'])
    }

  };

  getCurrenUser() {
    const user = this.auth.getCurrenUser().subscribe()
    return user
  }

}
