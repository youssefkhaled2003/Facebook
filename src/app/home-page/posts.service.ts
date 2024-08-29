import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Post } from './posts.modal';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = 'https://facebook-7a692-default-rtdb.firebaseio.com/posts.json';

  constructor(private http: HttpClient) {}

  addPost(post: Post): Observable<string> {
    return this.http.post<{ name: string }>(this.apiUrl, post).pipe(
      map(response => response.name),
      catchError(this.handleError)
    );
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<{ [key: string]: Post }>(this.apiUrl).pipe(
      map(responseData => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            const post = responseData[key];
            postsArray.push({ ...post, id: key }); // Changed `index` to `id`
          }
        }
        return postsArray;
      }),
      catchError(this.handleError)
    );
  }

  updatePost(post: Post): Observable<void> {
    const updateUrl = `https://facebook-7a692-default-rtdb.firebaseio.com/posts/${post.id}.json`;
    return this.http.put<void>(updateUrl, post).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}
