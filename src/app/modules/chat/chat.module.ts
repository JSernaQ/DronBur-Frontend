import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { IonicModule } from '@ionic/angular';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ChatListComponent,
    ChatRoomComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    ChatListComponent,
    ChatRoomComponent
  ]
})
export class ChatModule { }
