import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublishComponent } from './publish.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [PublishComponent],
  exports: [PublishComponent]
})
export class PublishComponentModule { }
