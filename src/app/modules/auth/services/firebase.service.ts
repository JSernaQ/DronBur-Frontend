import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { __awaiter } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  userInfo !: any 

  constructor(private afAuth: AngularFireAuth) { }

  getCurrenUser() {
    return this.afAuth.authState;
  }

  async register(email: string, password: string) {
    if (!email || !password) {
      console.error('Error: Email o contraseña vacíos');
      return;
    }

    try {

      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      console.log('Usuario registrado:', userCredential.user);
      return userCredential;

    } catch (error) {
      console.error('Error al registrar usuario:', error);
      return false
    }
  }


  async login(email: string, password: string) {

    try {
      
      return await this.afAuth.signInWithEmailAndPassword(email, password)

    } catch (error) {
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

}
