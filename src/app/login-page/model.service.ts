import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalOpen$ = new Subject<void>();

  openModal(): void {
    this.modalOpen$.next();
  }
}
