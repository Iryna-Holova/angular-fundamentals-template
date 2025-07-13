import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '@app/models/course.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  @Input() editable = false;

  @Output() showCourse = new EventEmitter<string>();
  @Output() editCourse = new EventEmitter<string>();
  @Output() deleteCourse = new EventEmitter<string>();

  onShow(id: string): void {
    this.showCourse.emit(id);
  }

  onEdit(id: string): void {
    this.editCourse.emit(id);
  }

  onDelete(id: string): void {
    this.deleteCourse.emit(id);
  }
}
