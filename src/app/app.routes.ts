import { Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';
import { Users } from './features/users/pages/users/users';
import { authGuard } from './core/auth/auth-guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {path: 'login', component : Login},
  {path: 'app/users' , component : Users , canActivate : [authGuard]},
  { path: '**', redirectTo: 'login' },
];
