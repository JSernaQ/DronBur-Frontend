import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'component-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss'],
  standalone: false
})
export class SignOutComponent {

  constructor(private auth: FirebaseService, private router: Router) { }

  async signOut() {
    
    this.auth.signOut();

  };
  
}
