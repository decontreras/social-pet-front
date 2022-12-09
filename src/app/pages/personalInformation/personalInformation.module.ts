import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonalInformationPage } from './personalInformation.page';
import { PublishComponentModule } from '../../components/publish/publish.module';
import { FeedComponentModule } from '../../components/feed/feed.module';

import { PersonalInformationPageRoutingModule } from './personalInformation-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PublishComponentModule,
    FeedComponentModule,
    PersonalInformationPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PersonalInformationPage]
})
export class PersonalInformationPageModule { }
