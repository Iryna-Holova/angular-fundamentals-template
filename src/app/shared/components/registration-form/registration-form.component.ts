import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BUTTON_TEXT } from '@shared/constants/text.constants';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  submitted = false;

  readonly BUTTON_TEXT = BUTTON_TEXT;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get nameCtrl() {
    return this.registrationForm.get('name');
  }

  get emailCtrl() {
    return this.registrationForm.get('email');
  }

  get passwordCtrl() {
    return this.registrationForm.get('password');
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registrationForm.valid) {
      console.log('Form submitted:', this.registrationForm.value);
    }
  }
}
