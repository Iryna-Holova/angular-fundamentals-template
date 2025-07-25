import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CourseFormComponent } from './course-form.component';
import { CourseFormRoutingModule } from './course-form-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [CourseFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    CourseFormRoutingModule,
  ],
})
export class CourseFormModule {}
