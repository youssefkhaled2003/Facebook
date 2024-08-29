// src/app/home-page/home-page.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { PostsComponent } from './posts/posts.component';
import { UserpostComponent } from './userpost/userpost.component';
import { CommentsComponent } from './comments/comments.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../sharedmodule/shared.module';

@NgModule({
  declarations: [
    HomePageComponent,
    PostsComponent,
    UserpostComponent,
    CommentsComponent,

  ],
  imports: [
    CommonModule,
    SharedModule, // Import SharedModule to use HeaderComponent, FooterComponent
    FormsModule,
    MatIconModule,
    RouterModule.forChild([{ path: '', component: HomePageComponent }])
  ]
})
export class HomePageModule { }
