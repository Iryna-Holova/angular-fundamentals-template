import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  Subscription,
  takeUntil,
} from 'rxjs';

import { UserStoreService } from '@app/user/services/user-store.service';
import { Author, Course } from '@shared/types/courses.types';
import { TEXT, ROUTES } from '@shared/constants';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
})
export class CoursesComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly userStore = inject(UserStoreService);
  private readonly coursesStateFacade = inject(CoursesStateFacade);
  private readonly destroy$ = new Subject<void>();

  courses$: Observable<Course[]> = this.coursesStateFacade.courses$;
  isLoading$: Observable<boolean> =
    this.coursesStateFacade.isAllCoursesLoading$;
  isSearching$: Observable<boolean> = this.coursesStateFacade.isSearchingState$;
  errorMessage$: Observable<string | null> =
    this.coursesStateFacade.errorMessage$;

  searchTerm = '';
  private readonly searchSubject = new Subject<string>();

  readonly isAdmin = this.userStore.isAdmin;
  readonly TEXT = TEXT;
  readonly ROUTES = ROUTES;

  // courses: Course[] = [];
  authors: Author[] = [
    { name: 'John Doe', id: '9b87e8b8-6ba5-40fc-a439-c4e30a373d36' },
    { name: 'Michael Smith', id: '1c972c52-3198-4098-b6f7-799b45903199' },
    { name: 'Ann Wilson', id: '072fe3fc-e751-4745-9af5-aa9eed0ea9ed' },
    { name: 'Jane Stevens', id: '40b21bd5-cbae-4f33-b154-0252b1ae03a9' },
    { name: 'Bob Johnson', id: '5e0b0f18-32c9-4933-b142-50459b47f09e' },
    { name: 'Emily Davis', id: '9987de6a-b475-484a-b885-622b8fb88bda' },
    { name: 'Mary Brown', id: '4847f10d-0bb5-4417-bf24-f37e59141b54' },
  ];

  ngOnInit(): void {
    this.coursesStateFacade.getAllCourses();

    // Setup search with debouncing
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((searchTerm) => {
        if (searchTerm.trim()) {
          this.coursesStateFacade.getFilteredCourses(searchTerm);
        } else {
          this.coursesStateFacade.getAllCourses();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearchCourses(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.searchSubject.next(searchTerm);
  }

  onShowCourse(id: string): void {
    this.router.navigate([this.ROUTES.COURSE_INFO, id]);
  }

  onEditCourse(courseId: string): void {
    this.router.navigate([this.ROUTES.COURSE_EDIT, courseId]);
  }

  onDeleteCourse(courseId: string): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.coursesStateFacade.deleteCourse(courseId);
    }
  }
}
