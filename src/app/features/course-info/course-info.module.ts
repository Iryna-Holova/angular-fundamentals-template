import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseInfoComponent } from './course-info.component';
import { CourseInfoRoutingModule } from './course-info-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [CourseInfoComponent],
  imports: [CommonModule, SharedModule, CourseInfoRoutingModule],
})
export class CourseInfoModule {}
