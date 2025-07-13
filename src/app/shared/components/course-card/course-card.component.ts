import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '@app/models/course.model';
import { BUTTON_TEXT, FIELD_NAMES } from '@shared/constants/text.constants';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
})
export class CourseCardComponent {
  @Input() course!: Course;
  @Input() editable = false;

  @Output() clickOnShow = new EventEmitter<void>();

  readonly BUTTON_TEXT = BUTTON_TEXT;
  readonly FIELD_NAMES = FIELD_NAMES;

  onShow(): void {
    this.clickOnShow.emit();
  }
}
