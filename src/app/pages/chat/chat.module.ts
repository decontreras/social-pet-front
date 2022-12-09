import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatPage } from './chat.page';
import { PublishComponentModule } from '../../components/publish/publish.module';

import { ChatPageRoutingModule } from './chat-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PublishComponentModule,
    ChatPageRoutingModule
  ],
  declarations: [ChatPage]
})
export class ChatPageModule { }
