// src/app/posts/posts.component.ts
import { Component, OnInit } from '@angular/core';
import { PostService } from '../../home-page/posts.service';
import { Post } from '../../home-page/posts.modal';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  editedPost: Post | null = null;
  isCommentsOpen: boolean = false;
  activePost: Post | null = null;
  editingComment: any = null;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe(
      (posts: Post[]) => {
        this.posts = posts;
        console.log('Posts loaded:', this.posts);
      },
      (error) => {
        console.error('Error loading posts:', error);
      }
    );
  }

  editPost(post: Post): void {
    this.editedPost = { ...post }; // Create a copy of the post for editing
    // Ensure that the post content is an array that we can edit
    if (this.editedPost.post && typeof this.editedPost.post[0] === 'string') {
      this.editedPost.post = [...this.editedPost.post];
    }
  }

  updatePost(): void {
    if (this.editedPost) {
      this.postService.updatePost(this.editedPost).subscribe(
        () => {
          this.loadPosts(); // Refresh the list of posts
          this.editedPost = null; // Clear the edited post
        },
        (error) => {
          console.error('Error updating post:', error);
        }
      );
    }
  }

  toggleComments(post: Post): void {
    this.isCommentsOpen = !this.isCommentsOpen;
    this.activePost = this.isCommentsOpen ? post : null;
  }

  editComment(comment: any): void {
    this.editingComment = comment;
  }

  saveComment(): void {
    if (this.activePost && this.editingComment) {
      const commentIndex = this.activePost.comments.findIndex(c => c === this.editingComment);
      if (commentIndex > -1) {
        this.activePost.comments[commentIndex] = { ...this.editingComment };
        this.postService.updatePost(this.activePost).subscribe(
          () => {
            console.log('Comment updated:', this.activePost);
            this.editingComment = null; // Clear the edited comment
          },
          (error) => {
            console.error('Error updating comment:', error);
          }
        );
      }
    }
  }
}
