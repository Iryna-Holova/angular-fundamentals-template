import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalComponent } from './components/modal/modal.component';
import {
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  InputWrapperComponent,
  SearchComponent,
  CourseCardComponent,
  LoginFormComponent,
  RegistrationFormComponent,
  CourseFormComponent,
} from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthorNamesPipe } from './pipes/author-names.pipe';
import { DurationPipe } from './pipes/duration.pipe';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { EmailValidatorDirective } from '@shared/directives/email.directive';

const components = [
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  InputWrapperComponent,
  SearchComponent,
  ModalComponent,
  CourseCardComponent,
  LoginFormComponent,
  RegistrationFormComponent,
  CourseFormComponent,
  AuthorNamesPipe,
  DurationPipe,
  CustomDatePipe,
  EmailValidatorDirective,
];

@NgModule({
  declarations: [components],
  imports: [CommonModule, FontAwesomeModule, FormsModule, ReactiveFormsModule],
  exports: [components],
})
export class SharedModule {}
