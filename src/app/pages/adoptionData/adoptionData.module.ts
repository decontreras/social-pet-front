import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdoptionDataPage } from './adoptionData.page';
import { PublishComponentModule } from '../../components/publish/publish.module';
import { FeedComponentModule } from '../../components/feed/feed.module';

import { AdoptionDataPageRoutingModule } from './adoptionData-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PublishComponentModule,
    FeedComponentModule,
    AdoptionDataPageRoutingModule
  ],
  declarations: [AdoptionDataPage]
})
export class AdoptionDataPageModule { }
