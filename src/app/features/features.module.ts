import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
// import { SignaturePreviewComponent } from './signature-preview/signature-preview.component';
import { FeatureComponent } from './feature.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeneralComponent } from './general/general.component';
import { SocialComponent } from './social/social.component';
import { DesignComponent } from './design/design.component';
import { SignaturePreviewComponent } from './signature-preview/signature-preview.component';


@NgModule({
  declarations: [
    GeneralComponent,
    FeatureComponent,
    SocialComponent,
    DesignComponent,
    SignaturePreviewComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class FeaturesModule { }
