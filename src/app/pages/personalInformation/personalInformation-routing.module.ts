import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalInformationPage } from './personalInformation.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalInformationPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalInformationPageRoutingModule {}
