import { User } from './../../login-page/user.model';
import { Component, EventEmitter, Output, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Post } from '../posts.modal'; // Fixed import path

@Component({
  selector: 'app-userpost',
  templateUrl: './userpost.component.html',
  styleUrls: ['./userpost.component.css']
})
export class UserpostComponent implements AfterViewChecked {
  @ViewChild('posttext') posttext!: ElementRef<HTMLTextAreaElement>;
  @Output() postCreated = new EventEmitter<Post>();
  imageselect = false;
  imageUrl: string | ArrayBuffer | null = null;

  constructor() {}

  ngAfterViewChecked(): void {
    // Ensure you need this; it might cause performance issues
  }

  onPost(): void {
    if (this.posttext && this.posttext.nativeElement) {
      const postText = this.posttext.nativeElement.value.trim();
      if (postText) {
        // Retrieve the username from local storage
        const userData = localStorage.getItem('userData');
        const userName = userData ? JSON.parse(userData).first_name + " " + JSON.parse(userData).surname : 'Anonymous';

        const newPost: Post = {
          id: Date.now().toString(), // Changed to string ID
          post: [postText],
          likes: 0,
          comments: [],
          isLiked: false,
          imageUrl: this.imageUrl ? this.imageUrl as string : undefined,
          date: new Date().toISOString(),
          userName: userName
        };

        this.postCreated.emit(newPost);
        this.posttext.nativeElement.value = '';  // Clear the textarea
        this.imageUrl = null;  // Reset imageUrl
      }
    } else {
      console.error("Textarea element not found or uninitialized.");
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imageUrl = e.target?.result as string | ArrayBuffer | null;
      };

      reader.readAsDataURL(file);
    }
  }
}
