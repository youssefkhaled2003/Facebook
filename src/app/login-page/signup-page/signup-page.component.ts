import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { ModalService } from '../model.service'; // Ensure this service is correctly implemented
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../user.model';
import { UsersService } from '../users.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit, AfterViewInit {
  myForm!: FormGroup;
  @ViewChild('myModal', { static: false }) myModal!: ElementRef;
  private modalInstance: Modal | undefined;
  imageUrl: string | ArrayBuffer | null = null; // Store image preview

  constructor(
    private modalService: ModalService,
    private fb: FormBuilder,
    private usersService: UsersService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      first_name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      date: ['', Validators.required],
      gender: ['', Validators.required],
      userIcon: [null], // New form control for image
      isAdmin: false,
    });

    this.modalService.modalOpen$.subscribe(() => this.open());
  }

  ngAfterViewInit(): void {
    if (this.myModal) {
      this.modalInstance = new Modal(this.myModal.nativeElement);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imageUrl = e.target?.result as string | ArrayBuffer | null;
        this.myForm.patchValue({ userIcon: this.imageUrl }); // Store base64 image in form
      };

      reader.readAsDataURL(file);
    }
  }

  open(): void {
    this.modalInstance?.show();
  }

  close(): void {
    this.modalInstance?.hide();
  }

  onSubmit(): void {
    if (this.myForm.valid) {
      const userData: User = this.myForm.value;
      this.usersService.fireSignUp(userData);
      console.log('User Data Submitted:', userData);


    } else {
      console.log('Form is invalid');
    }
  }
}
