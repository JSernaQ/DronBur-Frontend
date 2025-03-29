import { Component, OnInit } from '@angular/core';
import { l } from '@angular/core/navigation_types.d-u4EOrrdZ';
import { firstValueFrom, Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { FirebaseService } from 'src/app/modules/auth/services/firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit {

  user !: any;

  constructor(private afAuth: FirebaseService, private apiServe: ApiService) { }

  ngOnInit() {
    this.getUser()
  }

  async getUser() {
    try {
      const user = await firstValueFrom(this.afAuth.getCurrenUser());
  
      if (!user) {
        console.warn('No se encontró un usuario autenticado.');
        return;
      }
  
        this.user = await this.apiServe.getUser(user.uid);
        console.log('Usuario obtenido:', this.user);
      
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
    }
  }
  

}
