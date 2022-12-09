import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdoptionDataPage } from './adoptionData.page';

const routes: Routes = [
  {
    path: '',
    component: AdoptionDataPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdoptionDataPageRoutingModule {}
