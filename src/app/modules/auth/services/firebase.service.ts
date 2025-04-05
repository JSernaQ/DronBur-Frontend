import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from '@angular/router';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, deleteUser } from "firebase/auth";
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { ApiServerService } from './api-server.service';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$: Observable<any> = this.currentUserSubject.asObservable();

  constructor(
    private afAuth: AngularFireAuth, 
    private router: Router, 
    private apiServer: ApiServerService
  ) {

    this.loadUserFromStorage();

  }

  async loadUserFromStorage() {

    this.afAuth.authState.subscribe(async user => {
      if (user) {

        const { userInfo } = await firstValueFrom(this.apiServer.getUser(user.uid));

        this.currentUserSubject.next(userInfo);
        await Preferences.set({
          key: 'user',
          value: JSON.stringify(userInfo)
        })

      } else
        await Preferences.remove({
          key: 'user'
        })
    });

  }

  getCurrentUser(): Observable<any> {
    return this.currentUser$;
  }

  async register(email: string, password: string) {
    if (!email || !password) {
      console.error('Error: Email o contraseña vacíos');
      return;
    }

    try {

      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      return userCredential;

    } catch (error) {
      console.error('Error al registrar usuario:', error);
      return false
    }
  }


  async login(email: string, password: string) {

    try {

      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password)

      const uid = userCredential.user?.uid;

      const mongoUser = await firstValueFrom(this.apiServer.getUser(uid))
      this.currentUserSubject.next(mongoUser.userInfo);

      await Preferences.set({
        key: 'user',
        value: JSON.stringify(mongoUser.userInfo)
      })
      console.log('as', JSON.stringify(mongoUser.userInfo));


      return userCredential

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return false
    }

  }

  async signInGoogle() {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();

      const userCredential = await signInWithPopup(auth, provider);
      return userCredential;

    } catch (error) {
      console.log(error);
      return false
    }
  }

  async signOut() {

    try {
      const auth = getAuth();
      signOut(auth);
      await Preferences.remove({ key: 'user' })
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }

  }


  // async deleteUser(user: any) {

  //   deleteUser(user)

  // }

}
