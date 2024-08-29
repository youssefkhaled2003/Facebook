// src/app/comments/comments.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../../home-page/posts.modal';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  @Input() post: Post | null = null;
  @Output() save = new EventEmitter<any>();
  comments: any[] = [];
  editingComment: any = null;

  ngOnInit() {
    if (this.post) {
      // Load comments from the post
      this.comments = this.post.comments || [];
    }
  }

  editComment(comment: any) {
    this.editingComment = comment;
  }

  saveComment() {
    this.save.emit(this.post);
    this.editingComment = null;
  }

}
