import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  userForm: FormGroup;
  // userForm: FormGroup = new FormGroup({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  //   email: new FormControl(''),
  //   password: new FormControl('')
  // });

  constructor(private http: HttpClient, private fb: FormBuilder,private router: Router) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSaveUser() {
    if (this.userForm.valid) {
      this.http
        .post('http://localhost:8080/user/save', this.userForm.value)
        .subscribe({
          next: (res: any) => {
            console.log(res);
            alert('User Created');
            this.userForm.reset();
            this.navigateToLogin();
          },
          error: (error: any) => {
            console.error('Error:', error);
            alert('Registration failed. Please try again.');
          },
        });
    } else {
      alert('Please fill out the form correctly.');
    }
  }

  navigateToLogin(){
    this.router.navigate(['']);
  }
}
