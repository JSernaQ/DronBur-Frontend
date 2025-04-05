import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatRoomPageRoutingModule } from './chat-room-routing.module';

import { ChatRoomPage } from './chat-room.page';
import { ChatRoomComponent } from 'src/app/modules/chat/components/chat-room/chat-room.component';
import { ChatModule } from 'src/app/modules/chat/chat.module';

@NgModule({
  imports: [
    ChatRoomPageRoutingModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ChatModule
  ],
  declarations: [
    ChatRoomPage,
  ]
})
export class ChatRoomPageModule {}
