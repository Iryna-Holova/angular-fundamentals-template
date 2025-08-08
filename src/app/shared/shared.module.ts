import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  InputWrapperComponent,
} from '@shared/components';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { EmailValidatorDirective } from '@shared/directives/email.directive';
import { AuthorNamesPipe, CustomDatePipe, DurationPipe } from '@shared/pipes';

const components = [
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  InputWrapperComponent,
  ModalComponent,
  AuthorNamesPipe,
  DurationPipe,
  CustomDatePipe,
  EmailValidatorDirective,
];

@NgModule({
  declarations: [components],
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  exports: [components],
  providers: [{ provide: 'Window', useValue: window }],
})
export class SharedModule {}
