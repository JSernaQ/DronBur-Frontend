import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'component-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: false
})
export class SignInComponent {

  email!: string;
  password!: string;

  constructor(private auth: FirebaseService, private apiServe: ApiService, private router: Router) { }

  async login( ){
    
    const userCredentials = await this.auth.login(this.email, this.password)
        
    if (userCredentials) {
      this.router.navigate(['main/tabs/tab1'])
    }

  };

  async signInGoogle() {

    const userCredentials = await this.auth.signInGoogle();
    
    if (userCredentials) {
      this.router.navigate(['main/tabs/tab1'])
    }

  };

  getCurrenUser() {
    const user = this.auth.getCurrenUser().subscribe()
    console.log(user);
    
    return user 
  }

}
