import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { CoursesStoreService } from '@app/services/courses-store.service';
import { ROUTES, TEXT, PATTERNS } from '@shared/constants';
import { Author } from '@shared/types/courses.types';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
})
export class CourseFormComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly library = inject(FaIconLibrary);
  private readonly coursesStore = inject(CoursesStoreService);

  private subscription = new Subscription();
  private allAuthors: Author[] = [];

  courseForm!: FormGroup;
  submitted = false;

  readonly courseId: string | null = this.route.snapshot.paramMap.get('id');
  readonly FIELDS = {
    TITLE: 'title',
    DESCRIPTION: 'description',
    DURATION: 'duration',
    AUTHORS: 'authors',
    NEW_AUTHOR: 'author',
  };
  readonly TEXT = TEXT;

  constructor() {
    this.library.addIconPacks(fas);
  }

  ngOnInit(): void {
    this.courseForm = this.createForm();

    this.subscription.add(
      this.coursesStore.authors$.subscribe((authors) => {
        this.allAuthors = authors;
      })
    );

    this.subscription.add(this.coursesStore.getAllAuthors().subscribe());

    if (this.courseId) {
      this.loadCourseData(this.courseId);
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      [this.FIELDS.TITLE]: ['', [Validators.required, Validators.minLength(2)]],
      [this.FIELDS.DESCRIPTION]: [
        '',
        [Validators.required, Validators.minLength(2)],
      ],
      [this.FIELDS.DURATION]: ['', [Validators.required, Validators.min(0)]],
      [this.FIELDS.AUTHORS]: this.fb.array([], Validators.required),
      [this.FIELDS.NEW_AUTHOR]: [
        '',
        [
          Validators.minLength(2),
          Validators.pattern(PATTERNS.AUTHOR_NAME_PATTERN),
        ],
      ],
    });
  }

  private loadCourseData(courseId: string): void {
    this.subscription.add(
      this.coursesStore.getCourse(courseId).subscribe((course) => {
        if (course?.id) {
          this.courseForm.patchValue({
            title: course.title,
            description: course.description,
            duration: course.duration,
          });

          const selectedAuthors = this.allAuthors.filter((a) =>
            course.authors.includes(a.id)
          );
          selectedAuthors.forEach((author) =>
            this.authors.push(new FormControl(author))
          );
        }
      })
    );
  }

  get authors(): FormArray {
    return this.courseForm.get(this.FIELDS.AUTHORS) as FormArray;
  }

  get selectedAuthors(): Author[] {
    return this.authors.value as Author[];
  }

  get availableAuthors(): Author[] {
    return this.allAuthors.filter(
      (author) =>
        !this.selectedAuthors.some((selected) => selected.id === author.id)
    );
  }

  addExistingAuthor(author: Author): void {
    this.authors.push(new FormControl(author));
  }

  removeAuthor(authorId: string): void {
    const index = this.selectedAuthors.findIndex((a) => a.id === authorId);
    if (index !== -1) this.authors.removeAt(index);
  }

  addNewAuthor(): void {
    const control = this.courseForm.get(this.FIELDS.NEW_AUTHOR);
    if (!control || control.invalid) {
      control?.markAsTouched();
      return;
    }

    const name = control.value?.trim();
    if (!name) return;

    this.subscription.add(
      this.coursesStore.createAuthor(name).subscribe((result) => {
        this.addExistingAuthor(result);
      })
    );

    control.reset();
  }

  onSubmit(): void {
    this.submitted = true;
    this.courseForm.markAllAsTouched();

    if (this.courseForm.invalid) return;

    const { author, authors, ...formData } = this.courseForm.value;
    const payload = {
      ...formData,
      authors: authors.map((a: Author) => a.id),
    };

    const request$ = this.courseId
      ? this.coursesStore.editCourse(this.courseId, payload)
      : this.coursesStore.createCourse(payload);

    this.subscription.add(
      request$.subscribe(() => this.router.navigate([ROUTES.COURSES]))
    );

    this.courseForm.reset();
    this.authors.clear();
    this.submitted = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
