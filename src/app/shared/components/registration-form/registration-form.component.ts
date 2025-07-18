import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  submitted = false;

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

  get nameCtrl() {
    return this.registrationForm.get(this.FIELDS.NAME);
  }

  get emailCtrl() {
    return this.registrationForm.get(this.FIELDS.EMAIL);
  }

  get passwordCtrl() {
    return this.registrationForm.get(this.FIELDS.PASSWORD);
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registrationForm.valid) {
      console.log('Form submitted:', this.registrationForm.value);
    }
  }
}
