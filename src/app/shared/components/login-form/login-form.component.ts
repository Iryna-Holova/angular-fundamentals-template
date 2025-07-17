import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { BUTTON_TEXT } from '@shared/constants/text.constants';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  @ViewChild('loginForm') public loginForm!: NgForm;

  email = '';
  password = '';

  readonly BUTTON_TEXT = BUTTON_TEXT;

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form submitted:', this.loginForm.value);
    }
  }
}
