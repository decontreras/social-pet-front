import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdoptionApplicationPage } from './adoptionApplication.page';

import { AdoptionApplicationPageRoutingModule } from './adoptionApplication-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AdoptionApplicationPageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [AdoptionApplicationPage]
})
export class AdoptionApplicationPageModule { }
