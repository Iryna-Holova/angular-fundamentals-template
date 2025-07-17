import { Component, Input } from '@angular/core';
import { Course } from '@app/models/course.model';
import { BUTTON_TEXT, FIELD_NAMES } from '@shared/constants/text.constants';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
})
export class CourseInfoComponent {
  @Input() course!: Course;

  readonly BUTTON_TEXT = BUTTON_TEXT;
  readonly FIELD_NAMES = FIELD_NAMES;
}
