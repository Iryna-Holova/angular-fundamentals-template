import { Component, inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@app/auth/services/auth.service';
import { UserStoreService } from '@app/user/services/user-store.service';
import { ROUTES, TEXT } from '@shared/constants';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  private readonly userStore = inject(UserStoreService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly TEXT = TEXT;
  readonly ROUTES = ROUTES;

  @ViewChild('loginForm')
  public loginForm!: NgForm;
  isPasswordVisible: boolean = false;

  FIELDS = {
    EMAIL: 'email',
    PASSWORD: 'password',
  };

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit(): void {
    if (!this.loginForm.valid) return;

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.userStore.loadCurrentUser().subscribe({
          complete: () => this.router.navigate([ROUTES.COURSES]),
        });
      },
      error: (error) => {
        const message =
          error.error?.result || 'Unexpected error. Please try again later.';
        this.showError(message);
      },
    });
  }

  private showError(message: string): void {
    alert(message);
  }
}
