import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PrincipalPageComponent } from './components/principal-page/principal-page.component';

@NgModule({
  declarations: [
    PrincipalPageComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    PrincipalPageComponent
  ]
})
export class FeedModule { }
