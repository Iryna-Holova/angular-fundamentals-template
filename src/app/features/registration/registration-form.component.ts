import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { AuthService } from '@app/auth/services/auth.service';
import { TEXT } from '@shared/constants';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  submitted: boolean = false;
  isPasswordVisible: boolean = false;

  FIELDS = {
    NAME: 'name',
    EMAIL: 'email',
    PASSWORD: 'password',
  };

  readonly TEXT = TEXT;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      [this.FIELDS.NAME]: ['', [Validators.required, Validators.minLength(6)]],
      [this.FIELDS.EMAIL]: ['', [Validators.required, Validators.email]],
      [this.FIELDS.PASSWORD]: ['', [Validators.required]],
    });
  }

  get nameCtrl(): AbstractControl<string> | null {
    return this.registrationForm.get(this.FIELDS.NAME);
  }

  get emailCtrl(): AbstractControl<string> | null {
    return this.registrationForm.get(this.FIELDS.EMAIL);
  }

  get passwordCtrl(): AbstractControl<string> | null {
    return this.registrationForm.get(this.FIELDS.PASSWORD);
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registrationForm.valid) {
      this.authService.register(this.registrationForm.value).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          if (err.error?.errors) {
            alert(err.error.errors.join('\n'));
          } else {
            alert('Unexpected error. Please try again later.');
          }
        },
      });
    }
  }
}
