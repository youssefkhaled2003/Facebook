import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

interface workInfo {
  school: string | null;
  college: string | null;
  gpa: string | null;
  work: number | null;

}

interface EditingStates {
  [key: string]: boolean;
}

interface NewValues {
  [key: string]: any;
}

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent {
  workInfo: workInfo = {
    school:  null,
    college:  null,
    gpa:  null,
    work:  null
  };

  isEditing: EditingStates = {
    school:  false,
    college:  false,
    gpa:  false,
    work:  false
  };

  newValues: NewValues = {
    school:  '',
    college:  '',
    gpa:  null,
    work:  ''
  };

  constructor(private db: AngularFireDatabase) { }

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo(): void {
    // Replace 'userId' with the actual user ID or path as needed
    const userId = 'userId';
    this.db.object<workInfo>(`users/${userId}`).valueChanges().subscribe(data => {
      if (data) {
        this.workInfo = {
          school: data.school || null,
          college: data.college || null,
          gpa: data.gpa || null,
          work: data.work || null,

        };
      }
    });
  }

  getUserInfoValue(field: keyof workInfo): any {
    return this.workInfo[field];
  }

  setUserInfoValue(field: keyof workInfo, value: any): void {
    this.workInfo[field] = value;
  }

  startEditing(field: keyof workInfo): void {
    this.isEditing[field] = true;
    this.newValues[field] = this.getUserInfoValue(field) || '';
  }

  submitField(field: keyof workInfo, newValue: any): void {
    if (newValue !== '') {
      const userId = 'userId';
      this.db.object(`users/${userId}/${field}`).set(newValue).then(() => {
        this.setUserInfoValue(field, newValue);
        this.isEditing[field] = false;
      }).catch(error => {
        console.error(`Error updating ${field}:`, error);
      });
    }
  }

  submitMobileNumber(): void {
    this.submitField('school', this.newValues['school']);
  }

  submitBirthDate(): void {
    this.submitField('college', this.newValues['college']);
  }

  submitGender(): void {
    this.submitField('gpa', this.newValues['gpa']);
  }

  submitAge(): void {
    this.submitField('work', this.newValues['work']);
  }

  submitFullName(): void {
    this.submitField('work', this.newValues['work']);
  }
}
