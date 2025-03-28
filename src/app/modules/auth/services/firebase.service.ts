import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from '@angular/router';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, deleteUser } from "firebase/auth";


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  userInfo !: any

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

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
  
  // async deleteUser(user: any) {
  
  //   deleteUser(user)

  // }
  
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

  signOut() {
    try {
      const auth = getAuth();
      signOut(auth).then(() => {
        console.log('Se cerro sesión.');
        this.router.navigate(['/']);
      }).catch((error) => {
        console.log(error);
        
      });
    } catch (error) {
      
    }
  }

}
