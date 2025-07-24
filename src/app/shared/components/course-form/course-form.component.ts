import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { Author } from '@app/models/author.model';
import { mockedAuthorsList as AUTHORS } from '@shared/mocks/mock';
import { BUTTON_TEXT, FIELD_NAMES } from '@shared/constants/text.constants';
import { AUTHOR_NAME_PATTERN } from '@shared/constants/patterns.constants';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
})
export class CourseFormComponent {
  courseForm!: FormGroup;
  allAuthors: Author[] = [...AUTHORS];
  availableAuthors: Author[] = [...AUTHORS];
  submitted: boolean = false;

  FIELDS = {
    TITLE: 'title',
    DESCRIPTION: 'description',
    DURATION: 'duration',
    AUTHORS: 'authors',
    NEW_AUTHOR: 'author',
  };

  readonly BUTTON_TEXT = BUTTON_TEXT;
  readonly FIELD_NAMES = FIELD_NAMES;

  constructor(private fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);

    this.courseForm = this.fb.group({
      [this.FIELDS.TITLE]: ['', [Validators.required, Validators.minLength(2)]],
      [this.FIELDS.DESCRIPTION]: [
        '',
        [Validators.required, Validators.minLength(2)],
      ],
      [this.FIELDS.DURATION]: ['', [Validators.required, Validators.min(0)]],
      [this.FIELDS.AUTHORS]: this.fb.array([], Validators.required),
      [this.FIELDS.NEW_AUTHOR]: [
        '',
        [Validators.minLength(2), Validators.pattern(AUTHOR_NAME_PATTERN)],
      ],
    });
  }

  get titleCtrl(): AbstractControl<string> | null {
    return this.courseForm.get(this.FIELDS.TITLE);
  }

  get descriptionCtrl(): AbstractControl<string> | null {
    return this.courseForm.get(this.FIELDS.DESCRIPTION);
  }

  get durationCtrl(): AbstractControl<number> | null {
    return this.courseForm.get(this.FIELDS.DURATION);
  }

  get durationValue(): number {
    return this.durationCtrl?.value || 0;
  }

  get authors(): FormArray {
    return this.courseForm.get(this.FIELDS.AUTHORS) as FormArray;
  }

  get selectedAuthors(): Author[] {
    return this.authors.value as Author[];
  }

  get authorCtrl(): AbstractControl<string> | null {
    return this.courseForm.get(this.FIELDS.NEW_AUTHOR);
  }

  setAvailableAuthors(): void {
    this.availableAuthors = this.allAuthors.filter(
      (author) =>
        !this.selectedAuthors.find((selected) => selected.id === author.id)
    );
  }

  addExistingAuthor(author: Author): void {
    const authorControl = new FormControl(author);
    this.authors.push(authorControl);

    this.setAvailableAuthors();
  }

  removeAuthor(authorId: string): void {
    const index = this.selectedAuthors.findIndex(
      (author) => author.id === authorId
    );
    if (index >= 0) {
      this.authors.removeAt(index);

      this.setAvailableAuthors();
    }
  }

  addNewAuthor(): void {
    const authorControl = this.courseForm.get(this.FIELDS.NEW_AUTHOR);

    if (!authorControl || authorControl.invalid) {
      authorControl?.markAsTouched();
      return;
    }

    const authorName = authorControl.value?.trim();
    if (!authorName) return;

    const newAuthor: Author = {
      id: Date.now().toString(),
      name: authorName,
    };

    this.allAuthors.push(newAuthor);
    this.addExistingAuthor(newAuthor);
    authorControl.reset();
  }

  onSubmit(): void {
    this.submitted = true;
    this.courseForm.markAllAsTouched();

    if (this.courseForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    const { author, authors, ...formData } = this.courseForm.value;

    console.log('Form submitted:', {
      ...formData,
      authors: authors.map((author: Author) => author.id),
    });

    this.authors.clear();
    this.courseForm.reset();
    this.submitted = false;
  }
}
