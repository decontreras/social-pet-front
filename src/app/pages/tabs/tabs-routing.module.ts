import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../chat/chat.module').then(m => m.ChatPageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../request/request.module').then(m => m.RequestPageModule)
      },
      {
        path: 'tab4',
        loadChildren: () => import('../adoptionApplication/adoptionApplication.module').then(m => m.AdoptionApplicationPageModule)
      },
      {
        path: 'tab5',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'edit',
        loadChildren: () => import('../personalInformation/personalInformation.module').then(m => m.PersonalInformationPageModule)
      },
      {
        path: 'adoptionData',
        loadChildren: () => import('../adoptionData/adoptionData.module').then(m => m.AdoptionDataPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
