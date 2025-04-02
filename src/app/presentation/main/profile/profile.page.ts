import { Component, OnDestroy, OnInit, } from '@angular/core';
import { firstValueFrom, Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { FirebaseService } from 'src/app/modules/auth/services/firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit, OnDestroy {

  user !: any;
  userSubscrition !: Subscription;

  constructor(private afAuth: FirebaseService, private apiServe: ApiService) { }

  ngOnInit() {
    this.userSubscrition = this.afAuth.getCurrentUser().subscribe(user => {
      if (user) {
        this.getUser(user?.uid)
      }else {
        this.user = null
      }
    })
  }

  ngOnDestroy(): void {
    if (this.userSubscrition) {
      this.userSubscrition.unsubscribe();
    }
  }

  async getUser(uid: String) {
    try {
      this.user = await this.apiServe.getUser(uid);
      console.log('Usuario obtenido:', this.user);

    } catch (error) {
      console.error('Error al obtener el usuario:', error);
    }
  }
  
}