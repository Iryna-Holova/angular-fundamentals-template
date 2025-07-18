import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import {
  BUTTON_TEXT,
  FIELD_NAMES,
  PAGE_TEXT,
} from '@shared/constants/text.constants';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  @ViewChild('loginForm') public loginForm!: NgForm;

  FIELDS = {
    EMAIL: 'email',
    PASSWORD: 'password',
  };

  readonly BUTTON_TEXT = BUTTON_TEXT;
  readonly FIELD_NAMES = FIELD_NAMES;
  readonly PAGE_TEXT = PAGE_TEXT;

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form submitted:', this.loginForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
