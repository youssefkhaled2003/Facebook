import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

// Define types
interface UserInfo {
  mobileNumber: string | null;
  birthDate: string | null;
  gender: string | null;
  age: number | null;

}

interface EditingStates {
  [key: string]: boolean;
}

interface NewValues {
  [key: string]: any;
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {
  userInfo: UserInfo = {
    mobileNumber: null,
    birthDate: null,
    gender: null,
    age: null,

  };

  isEditing: EditingStates = {
    mobileNumber: false,
    birthDate: false,
    gender: false,
    age: false,

  };

  newValues: NewValues = {
    mobileNumber: '',
    birthDate: '',
    gender: '',
    age: null,
    fullName: ''
  };

  constructor(private db: AngularFireDatabase) { }

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo(): void {
    // Replace 'userId' with the actual user ID or path as needed
    const userId = 'userId';
    this.db.object<UserInfo>(`users/${userId}`).valueChanges().subscribe(data => {
      if (data) {
        this.userInfo = {
          mobileNumber: data.mobileNumber || null,
          birthDate: data.birthDate || null,
          gender: data.gender || null,
          age: data.age || null,

        };
      }
    });
  }

  getUserInfoValue(field: keyof UserInfo): any {
    return this.userInfo[field];
  }

  setUserInfoValue(field: keyof UserInfo, value: any): void {
    this.userInfo[field] = value;
  }

  startEditing(field: keyof UserInfo): void {
    this.isEditing[field] = true;
    this.newValues[field] = this.getUserInfoValue(field) || '';
  }

  submitField(field: keyof UserInfo, newValue: any): void {
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
    this.submitField('mobileNumber', this.newValues['mobileNumber']);
  }

  submitBirthDate(): void {
    this.submitField('birthDate', this.newValues['birthDate']);
  }

  submitGender(): void {
    this.submitField('gender', this.newValues['gender']);
  }

  submitAge(): void {
    this.submitField('age', this.newValues['age']);
  }


}
