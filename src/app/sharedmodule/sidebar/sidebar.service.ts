import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService { // Correct class name
  private isAdmin = new BehaviorSubject<boolean>(false);
  active$ = this.isAdmin.asObservable();

  activate() {
    this.isAdmin.next(true);
  }

  deactivate() {
    this.isAdmin.next(false);
  }
}
