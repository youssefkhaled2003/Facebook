import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private fixesRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.fixesRef = db.list('users'); // Reference to the 'fixes' table
  }

  // Get all values from the 'fixes' table
  getAllFixes(): Observable<any[]> {
    return this.fixesRef.valueChanges(); // Retrieves the data as an observable
  }
}
