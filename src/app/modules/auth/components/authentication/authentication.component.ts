import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  standalone: false
})
export class AuthenticationComponent {

  email!: string;
  password!: string;

  constructor(private auth: FirebaseService, private apiServe: ApiService, private router: Router) { }  

  getCurrenUser() {
    const user = this.auth.getCurrenUser().subscribe()
    return user 
  }
  
};
