import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ChatListComponent } from 'src/app/modules/chat/components/chat-list/chat-list.component';
import { ChatRoomComponent } from 'src/app/modules/chat/components/chat-room/chat-room.component';
import { ChatModule } from 'src/app/modules/chat/chat.module';


@NgModule({
  declarations: [
    ChatModule
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
  ]
})
export class ChatSharedModule {}
