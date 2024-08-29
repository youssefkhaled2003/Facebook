import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from './user.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import { HeaderService } from '../sharedmodule/header/header.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService implements OnInit {
  fixes: any[] = [];
  private apiUrl = 'https://facebook-7a692-default-rtdb.firebaseio.com/'; // Base URL
  private authUrl =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDDYrqohB-Ofz_fp05B8IDbhTDx38oGeP8'; // Firebase Auth URL

  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private router: Router,
    private dataService: DataService,
    private headerservice: HeaderService,


  ) {}

  ngOnInit(): void {
    this.headerservice.deactivate();
  }

  fireSignUp(user: User) {
    this.afAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        this.signUp(user);
      })
      .catch((error) => {
        console.error('Sign Up Error:', error);
      });
  }
  fireSignIn(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log('Sign In Success:', res);

        if (res.user) {
          const uid = res.user.uid;
          this.getUserData(uid).subscribe((userData) => {
            let userFound = false;

            Object.keys(userData).forEach(key => {
              const element = userData[key];
              if (element.email === email) {
                const user = element;
                userFound = true;
                localStorage.setItem('userData', JSON.stringify(user));
                this.headerservice.activate();
                if (user.isAdmin) {
                  this.router.navigate(['/admin']); // Navigate to admin page if user is admin
                } else {
                  this.router.navigate(['/home']); // Navigate to home page if user is not admin
                }
              }
            });

            if (!userFound) {
              console.log('User not found');
            }
          });
        }
      })
      .catch((error) => {
        console.error('Sign In Error:', error);
      });
  }


  getUserData(uid: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}users.json`)
      .pipe(catchError(this.handleError));
  }

  filterUser(users: User, uid: string): any {
    return users ? Object.values(users).find((user: any) => user.uid === uid) : null;
  }
  isAdmin(): boolean {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user: User = JSON.parse(userData);
      return user.isAdmin;
    }
    return false;
  }

  islogged():boolean{
    const userData = localStorage.getItem('userData');
    if (userData) {
      return true;
    }
    return false;

  }

  signUp(user: User): void {
    this.http
      .post(`${this.apiUrl}/users.json`, {
        email: user.email,
        password: user.password,
        first_name: user.first_name,
        surname: user.surname,
        date: user.date,
        gender: user.gender,
        userIcon: user.userIcon,
        isAdmin: user.isAdmin,

      })
      .pipe(catchError(this.handleError))
      .subscribe((res) => {
        console.log('User Signed Up:', res);
      });
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.error && error.error.error) {
        errorMessage += `\nDetails: ${JSON.stringify(error.error.error)}`;
      }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
  updateUser(user: User): Observable<any> {
    const userId = user.email; // Assuming `uid` is a unique identifier for users
    return this.http
      .put(`${this.apiUrl}/users/${userId}.json`, user)
      .pipe(catchError(this.handleError));
  }

}
