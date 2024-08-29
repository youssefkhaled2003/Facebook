import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../sharedmodule/shared.module';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { PostsComponent } from './posts/posts.component';
import { CommentsComponent } from './comments/comments.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'posts', component: PostsComponent },
      { path: 'comments', component: CommentsComponent },
    ]
  }
];

@NgModule({
  declarations: [
    AdminPageComponent,
    PostsComponent,
    CommentsComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminPageModule { }
