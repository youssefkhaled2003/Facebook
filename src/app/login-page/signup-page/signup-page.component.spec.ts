import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { ModalService } from '../model.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit, AfterViewInit {
  myForm!: FormGroup;
  @ViewChild('myModal', { static: false }) myModal!: ElementRef;
  private modalInstance: Modal | undefined;
  imageUrl: string | ArrayBuffer | null = null;

  constructor(
    private modalService: ModalService,
    private fb: FormBuilder,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      first_name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      date: ['', Validators.required],
      gender: ['', Validators.required],
      userIcon: [null], // Image upload
      isAdmin: [false]  // Admin flag
    });

    // Subscribe to the modal open event
    this.modalService.modalOpen$.subscribe(() => this.open());
  }

  ngAfterViewInit(): void {
    // Initialize the Bootstrap modal
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
        this.myForm.patchValue({ userIcon: this.imageUrl }); // Save base64 image to form
      };

      reader.readAsDataURL(file);
    }
  }

  open(): void {
    // Show the modal
    this.modalInstance?.show();
  }

  close(): void {
    // Hide the modal
    this.modalInstance?.hide();
  }

  onSubmit(): void {
    if (this.myForm.valid) {
      const userData: User = this.myForm.value;
      // this.usersService.signup(userData).subscribe(
      //   response => {
      //     console.log('User Data Submitted:', userData);
      //     console.log('Firebase Response:', response);
      //     this.close();  // Close the modal upon successful submission
      //   },
      //   error => {
      //     console.error('Error submitting user data:', error);
      //   }
      // );
    } else {
      console.log('Form is invalid');
    }
  }
}
