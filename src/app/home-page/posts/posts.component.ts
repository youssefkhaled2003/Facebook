// src/app/posts/posts.component.ts
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Post } from '../posts.modal';
import { PostService } from './../posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @Input() postarr: Post[] = [];
  @Output() opencomments = new EventEmitter<Post | null>();
  isCommentOpen = false;
  activePost: Post | null = null;
  userData: any = null;

  constructor(private postService: PostService) {}

  ngOnInit() {
    if (localStorage.getItem('userData')) {
      this.userData = JSON.parse(localStorage.getItem('userData')!);
    }
    if (this.postarr && this.postarr.length > 0) {
      console.log('Post array:', this.postarr);
    } else {
      console.log('No posts received');
    }
  }

  onComment(post: Post) {
    if (this.activePost === post) {
      this.isCommentOpen = !this.isCommentOpen;
    } else {
      this.isCommentOpen = true;
      this.activePost = post;
    }
    this.opencomments.emit(this.isCommentOpen ? this.activePost : null);
  }

  toggleComments(post: Post) {
    this.isCommentOpen = !this.isCommentOpen;
    this.activePost = this.isCommentOpen ? post : null;
  }

  onLiked(postIndex: number) {
    if (postIndex >= 0 && postIndex < this.postarr.length) {
      const post = this.postarr[postIndex];
      post.isLiked = !post.isLiked;
      post.likes += post.isLiked ? 1 : -1;

      this.postService.updatePost(post).subscribe(
        () => {
          console.log(`Post ${postIndex} updated:`, post);
        },
        error => {
          console.error('Error updating post:', error);
        }
      );
    }
  }

  onSaveComment(updatedComment: any) {
    const postIndex = this.postarr.findIndex(post => post === this.activePost);
    if (postIndex > -1) {
      this.postarr[postIndex] = { ...this.activePost, ...updatedComment };
      this.postService.updatePost(this.postarr[postIndex]).subscribe(
        () => {
          console.log('Comment updated:', this.postarr[postIndex]);
        },
        error => {
          console.error('Error updating comment:', error);
        }
      );
    }
  }
}
