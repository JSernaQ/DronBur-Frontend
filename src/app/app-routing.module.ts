import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { userActiveGuard } from './core/guards/user-active.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./presentation/pages/auth/sign-in/sign-in.module').then( m => m.SignInPageModule), canActivate: [userActiveGuard]
  },
  {
    path: 'signup',
    loadChildren: () => import('./presentation/pages/auth/sign-up/sign-up.module').then( m => m.SignUpPageModule), canActivate: [userActiveGuard]
  },
  {
    path: 'main',
    loadChildren: () => import('./presentation/main/tabs/tabs.module').then(m => m.TabsPageModule), canActivate: [authGuard]
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
