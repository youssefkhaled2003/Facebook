import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../posts.modal';
import { PostService } from '../posts.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() post!: Post;
  newComment: string = '';
  userData: any = null;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData')!);
  }

  addComment() {
    if (this.post && this.newComment.trim() !== '') {
      this.post.comments = this.post.comments || [];
      this.post.comments.push({
        userName: `${this.userData.first_name} ${this.userData.surname}`,
        text: this.newComment.trim()
      });
      console.log('Adding comment to post:', this.post);

      this.postService.updatePost(this.post).subscribe(
        () => {
          console.log('Post updated with new comment:', this.post);
          this.newComment = '';
        },
        error => {
          console.error('Error updating post with new comment:', error);
        }
      );
    } else {
      console.warn('Comment is empty or post is undefined, not adding to post.');
    }
  }
}
