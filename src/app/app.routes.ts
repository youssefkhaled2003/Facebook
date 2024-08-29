
import { authGuard } from './auth.guard';


// app.routes.ts
import { Routes } from '@angular/router';
import { loggedGuard } from './logged.guard';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin-page/admin-page.module').then(m => m.AdminPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule),
    canActivate: [loggedGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login-page/login-page.module').then(m => m.LoginPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile-page/profile-page.module').then(m => m.ProfilepageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
