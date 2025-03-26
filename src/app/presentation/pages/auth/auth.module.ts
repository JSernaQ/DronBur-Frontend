import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';
import { AuthenticationComponent } from 'src/app/modules/auth/components/authentication/authentication.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthPageRoutingModule,
  ],
  declarations: [
    AuthPage,
    AuthenticationComponent
  ]

})
export class AuthPageModule {}
