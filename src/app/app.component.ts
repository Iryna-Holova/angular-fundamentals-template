import { Component } from '@angular/core';
import { mockedCoursesList } from '@shared/mocks/mock';
import { BUTTON_TEXT, PAGE_TEXT } from '@shared/constants/text.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'courses-app';
  courses = mockedCoursesList;
  readonly BUTTON_TEXT = BUTTON_TEXT;
  readonly PAGE_TEXT = PAGE_TEXT;
}
