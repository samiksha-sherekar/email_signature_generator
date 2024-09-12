import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureComponent } from './feature.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: "email-signature",
    pathMatch:'full'
  },
  {
    path: '',
    component: FeatureComponent
  },
  {
    path: 'email-signature',
    component: FeatureComponent,
    data: {
      authOnly: true,
    //   authGuardPipe: redirectUnauthorizedToHome
    },
    // canActivate: [AngularFireAuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
