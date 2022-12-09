import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdoptionApplicationPage } from './adoptionApplication.page';

const routes: Routes = [
  {
    path: '',
    component: AdoptionApplicationPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdoptionApplicationPageRoutingModule {}
