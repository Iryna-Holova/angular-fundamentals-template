import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import {
  BUTTON_TEXT,
  FIELD_NAMES,
  PAGE_TEXT,
} from '@shared/constants/text.constants';

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

  readonly BUTTON_TEXT = BUTTON_TEXT;
  readonly FIELD_NAMES = FIELD_NAMES;
  readonly PAGE_TEXT = PAGE_TEXT;

  constructor(private fb: FormBuilder) {}

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
      console.log('Form submitted:', this.registrationForm.value);
    }
  }
}
