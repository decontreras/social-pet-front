import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConversationPage } from './conversation.page';
import { PublishComponentModule } from '../../components/publish/publish.module';
import { PreviewComponentModule } from '../../components/preview/preview.module';

import { ConversationPageRoutingModule } from './conversation-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PublishComponentModule,
    PreviewComponentModule,
    ConversationPageRoutingModule
  ],
  declarations: [ConversationPage]
})
export class ConversationPageModule { }
