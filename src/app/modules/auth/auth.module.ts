import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationComponent } from './components/authentication/authentication.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignOutComponent } from './components/sign-out/sign-out.component';


@NgModule({
  declarations: [AuthenticationComponent, SignInComponent, SignUpComponent, SignOutComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    AuthenticationComponent,
    SignInComponent,
    SignUpComponent,
    SignOutComponent
  ]
})
export class AuthModule { }