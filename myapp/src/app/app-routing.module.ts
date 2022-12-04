import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard';

const routes: Routes = [
  { path: '', redirectTo: '/main/dashboard', pathMatch: 'full' },
  { path: 'main', canActivate:[AuthGuard], loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
  { path: 'Account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
