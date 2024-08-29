import { SidebarService } from './../../sharedmodule/sidebar/sidebar.service';
import { HeaderService } from './../../sharedmodule/header/header.service';
import { User } from '../../login-page/user.model';
import { Component, OnInit } from '@angular/core';
import { Post } from '../posts.modal';
import { PostService } from '../posts.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  islogged=true;
  postarr: Post[] = [];
  private nextIndex: number = 0;


  constructor(private postService: PostService,
    private headerservice:HeaderService,
    private SidebarService:SidebarService
  ) {}

  ngOnInit(): void {

    this.SidebarService.deactivate();
    this.headerservice.activate();
    this.loadPosts();
  }

  private loadPosts(): void {
    this.postService.getPosts().subscribe(
      posts => {
        this.postarr = posts || [];

        // Convert IDs to numbers and calculate nextIndex
        const ids = this.postarr
          .map(post => parseInt(post.id ?? '0', 10)) // Convert ID to number or use 0 if ID is undefined
          .filter(id => !isNaN(id)); // Filter out any NaN values

        this.nextIndex = ids.length > 0
          ? Math.max(...ids) + 1
          : 0;
      },
      error => {
        console.error('Error retrieving posts:', error);
      }
    );
  }


  onPostCreated(newPost: Post): void {  // Now accepting Post object directly
    console.log('New post received:', newPost);


    this.postService.addPost(newPost).subscribe(
      () => {
        this.postarr.push(newPost);
        this.nextIndex++;
        console.log('Post added:', newPost);
      },
      error => {
        console.error('Error submitting post data:', error);
      }
    );
  }

  savePostChanges(post: Post): void {
    console.log('Updating post:', post);
    this.postService.updatePost(post).subscribe(
      () => {
        console.log('Post updated:', post);
      },
      error => {
        console.error('Error updating post:', error);
      }
    );
  }
}
