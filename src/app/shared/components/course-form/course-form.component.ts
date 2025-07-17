import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { Author } from '@app/models/author.model';
import { BUTTON_TEXT, FIELD_NAMES } from '@app/shared/constants/text.constants';
import { mockedAuthorsList as AUTHORS } from '@shared/mocks/mock';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
})
export class CourseFormComponent {
  courseForm!: FormGroup;
  allAuthors: Author[] = [...AUTHORS];
  submitted = false;

  readonly BUTTON_TEXT = BUTTON_TEXT;
  readonly FIELD_NAMES = FIELD_NAMES;

  constructor(private fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);

    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      duration: ['', [Validators.required, Validators.min(0)]],
      courseAuthors: this.fb.array([], Validators.required),
      newAuthor: this.fb.group({
        name: [
          '',
          [Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9\s]+$/)],
        ],
      }),
    });
  }

  get durationValue() {
    return this.courseForm.get('duration')?.value || 0;
  }

  get authors(): FormArray {
    return this.courseForm.get('courseAuthors') as FormArray;
  }

  get selectedAuthors(): Author[] {
    return this.authors.value;
  }

  get availableAuthors(): Author[] {
    return this.allAuthors.filter(
      (author) =>
        !this.selectedAuthors.find((selected) => selected.id === author.id)
    );
  }

  addExistingAuthor(author: Author): void {
    const authorControl = new FormControl(author);
    this.authors.push(authorControl);
  }

  removeAuthor(authorId: string): void {
    const index = this.selectedAuthors.findIndex(
      (author) => author.id === authorId
    );
    if (index >= 0) {
      this.authors.removeAt(index);
    }
  }

  addNewAuthor(): void {
    const newAuthorGroup = this.courseForm.get('newAuthor') as FormGroup;
    const nameControl = newAuthorGroup.get('name');

    if (!nameControl || nameControl.invalid) {
      nameControl?.markAsTouched();
      return;
    }

    const authorName = nameControl.value?.trim();
    if (!authorName) return;

    const newAuthor: Author = {
      id: Date.now().toString(),
      name: authorName,
    };

    this.allAuthors.push(newAuthor);
    this.addExistingAuthor(newAuthor);
    nameControl.reset();
  }

  onSubmit(): void {
    this.submitted = true;
    this.courseForm.markAllAsTouched();

    if (this.courseForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    const { newAuthor, authors, ...formData } = this.courseForm.value;

    console.log('Form submitted:', {
      ...formData,
      authors: authors.map((author: Author) => author.id),
    });

    this.authors.clear();
    this.courseForm.reset();
    this.submitted = false;
  }
}
