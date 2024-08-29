import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  active$ = this.isLoggedIn.asObservable();

  activate() {
    this.isLoggedIn.next(true);
  }

  deactivate() {
    this.isLoggedIn.next(false);
  }
}
