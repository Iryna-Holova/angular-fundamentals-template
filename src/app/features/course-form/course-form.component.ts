import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { BUTTON_TEXT, FIELD_NAMES } from '@shared/constants/text.constants';
import { AUTHOR_NAME_PATTERN } from '@shared/constants/patterns.constants';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
})
export class CourseFormComponent implements OnInit, OnDestroy {
  courseForm!: FormGroup;
  allAuthors: Author[] = [];
  submitted: boolean = false;
  private subscription = new Subscription();

  FIELDS = {
    TITLE: 'title',
    DESCRIPTION: 'description',
    DURATION: 'duration',
    AUTHORS: 'authors',
    NEW_AUTHOR: 'author',
  };

  readonly BUTTON_TEXT = BUTTON_TEXT;
  readonly FIELD_NAMES = FIELD_NAMES;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public library: FaIconLibrary,
    private coursesStore: CoursesStoreService
  ) {
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

  ngOnInit(): void {
    this.subscription.add(
      this.coursesStore.authors$.subscribe((authors) => {
        this.allAuthors = authors;
      })
    );
    this.coursesStore.getAllAuthors().subscribe();
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
    const authorControl = this.courseForm.get(this.FIELDS.NEW_AUTHOR);

    if (!authorControl || authorControl.invalid) {
      authorControl?.markAsTouched();
      return;
    }

    const authorName = authorControl.value?.trim();
    if (!authorName) return;

    this.coursesStore.createAuthor(authorName).subscribe((response) => {
      this.addExistingAuthor(response.result);
    });

    authorControl.reset();
  }

  onSubmit(): void {
    this.submitted = true;
    this.courseForm.markAllAsTouched();

    if (this.courseForm.invalid) {
      return;
    }

    const { author, authors, ...formData } = this.courseForm.value;

    this.coursesStore
      .createCourse({
        ...formData,
        authors: authors.map((author: Author) => author.id),
      })
      .subscribe((response) => {
        if (response.successful) {
          this.router.navigate(['/courses']);
        }
      });

    console.log('Form submitted:', {
      ...formData,
      authors: authors.map((author: Author) => author.id),
    });

    this.authors.clear();
    this.courseForm.reset();
    this.submitted = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
