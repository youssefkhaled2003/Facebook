import { User } from './../user.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { ModalService } from '../model.service'; // Ensure the path is correct
import { HeaderService } from '../../sharedmodule/header/header.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  myForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: UsersService,
    private modalService: ModalService,
    private router: Router,
    private headerservice:HeaderService,

  ) {}

  ngOnInit(): void {
    localStorage.removeItem('userData');
    this.headerservice.deactivate();
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.myForm.valid) {
      const { email, password } = this.myForm.value;

      this.authService.fireSignIn( email, password);

    }
  }
  openModal(): void {
    this.modalService.openModal();
  }
}
