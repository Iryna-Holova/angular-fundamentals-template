import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@app/auth/services/auth.service';
import { TEXT } from '@shared/constants';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  @ViewChild('loginForm') public loginForm!: NgForm;
  isPasswordVisible: boolean = false;

  FIELDS = {
    EMAIL: 'email',
    PASSWORD: 'password',
  };

  readonly TEXT = TEXT;

  constructor(private router: Router, private authService: AuthService) {}

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/courses']);
        },
        error: (err) => {
          alert(
            err.error?.result || 'Unexpected error. Please try again later.'
          );
        },
      });
    }
  }
}
