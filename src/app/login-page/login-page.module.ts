// src/app/login-page/login-page.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../sharedmodule/shared.module'; // Corrected import
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import {  AngularFireAuthModule } from '@angular/fire/compat/auth';

@NgModule({
  declarations: [LoginPageComponent, SignupPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: LoginPageComponent }]),
    SharedModule, // Import SharedModule to use HeaderComponent, FooterComponent,
    AngularFireAuthModule,
  ],
})
export class LoginPageModule {}
