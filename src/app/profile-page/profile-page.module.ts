import { ExperienceComponent } from './experience/experience.component';
// src/app/profile-page/profile-page.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../sharedmodule/shared.module';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { BannerComponent } from './banner/banner.component'; // Ensure correct import path

import { InformationComponent } from './information/information.component';
import { WorkComponent } from './work/work.component';
import { HeaderComponent } from '../sharedmodule/header/header.component';

@NgModule({
  declarations: [
    ProfilePageComponent, // Ensure this is declared
    BannerComponent,
    InformationComponent,
    WorkComponent,
    ExperienceComponent,
    // Ensure this is declared
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: ProfilePageComponent }]),
    SharedModule,
    FormsModule,
     // Add FormsModule here

  ],
  exports: [
    ProfilePageComponent, // Export if needed in another module
     // Export if needed in another module
  ]
})
export class ProfilepageModule { }
