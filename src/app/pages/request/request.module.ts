import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RequestPage } from './request.page';

import { RequestPageRoutingModule } from './request-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RequestPageRoutingModule
  ],
  declarations: [RequestPage]
})
export class RequestPageModule { }
