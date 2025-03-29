import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MomentsPageRoutingModule } from './moments-routing.module';

import { MomentsPage } from './moments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MomentsPageRoutingModule
  ],
  declarations: [MomentsPage]
})
export class MomentsPageModule {}
