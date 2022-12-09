import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthComponentModule)
  },
  {
    path: 'conversation',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/conversation/conversation.module').then(m => m.ConversationPageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./pages/personalInformation/personalInformation.module').then(m => m.PersonalInformationPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
