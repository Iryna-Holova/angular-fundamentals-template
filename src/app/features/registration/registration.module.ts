import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RegistrationFormComponent } from './registration-form.component';
import { RegistrationRoutingModule } from './registration-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [RegistrationFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RegistrationRoutingModule,
  ],
})
export class RegistrationModule {}
