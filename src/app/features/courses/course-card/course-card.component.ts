import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Author, Course } from '@shared/types/courses.types';
import { TEXT } from '@shared/constants';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
})
export class CourseCardComponent {
  @Input() course!: Course;
  @Input() authors!: Author[];
  @Input() editable = false;

  @Output() clickOnShow = new EventEmitter<void>();

  readonly TEXT = TEXT;

  onShow(): void {
    this.clickOnShow.emit();
  }
}
