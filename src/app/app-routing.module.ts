import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'account', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path : '', loadChildren : () => import('./features/features.module').then (m => m.FeaturesModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
