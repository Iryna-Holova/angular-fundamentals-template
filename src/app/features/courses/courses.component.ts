import { Component } from '@angular/core';
import { Course } from '@app/models/course.model';
import { mockedCoursesList } from '@shared/mocks/mock';
import { BUTTON_TEXT } from '@shared/constants/text.constants';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
})
export class CoursesComponent {
  courses: Course[] = mockedCoursesList;

  readonly BUTTON_TEXT = BUTTON_TEXT;

  onShowCourse(id: string): void {
    console.log('Show course', id); // TODO
  }

  onEditCourse(id: string): void {
    console.log('Edit course', id); // TODO
  }

  onDeleteCourse(id: string): void {
    console.log('Delete course', id); // TODO
  }
}
