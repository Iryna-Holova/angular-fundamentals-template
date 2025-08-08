import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Course, CreateCourseRequest } from '@shared/types/courses.types';
import { CoursesState } from './courses.reducer';
import * as CoursesSelectors from './courses.selectors';
import * as CoursesActions from './courses.actions';

@Injectable({
  providedIn: 'root',
})
export class CoursesStateFacade {
  private readonly store = inject(Store<CoursesState>);

  // Observable properties
  public isAllCoursesLoading$: Observable<boolean> = this.store.select(
    CoursesSelectors.isAllCoursesLoadingSelector
  );

  public isSingleCourseLoading$: Observable<boolean> = this.store.select(
    CoursesSelectors.isSingleCourseLoadingSelector
  );

  public isSearchingState$: Observable<boolean> = this.store.select(
    CoursesSelectors.isSearchingStateSelector
  );

  public courses$: Observable<Course[]> = this.store.select(
    CoursesSelectors.getCourses
  );

  public allCourses$: Observable<Course[]> = this.store.select(
    CoursesSelectors.getAllCourses
  );

  public course$: Observable<Course | null> = this.store.select(
    CoursesSelectors.getCourse
  );

  public errorMessage$: Observable<string | null> = this.store.select(
    CoursesSelectors.getErrorMessage
  );

  // Action dispatching methods
  getAllCourses(): void {
    this.store.dispatch(CoursesActions.requestAllCourses());
  }

  getSingleCourse(id: string): void {
    this.store.dispatch(CoursesActions.requestSingleCourse({ id }));
  }

  getFilteredCourses(searchValue: string): void {
    this.store.dispatch(
      CoursesActions.requestFilteredCourses({
        value: searchValue,
      })
    );
  }

  editCourse(body: CreateCourseRequest, id: string): void {
    this.store.dispatch(
      CoursesActions.requestEditCourse({
        course: body,
        id,
      })
    );
  }

  createCourse(body: CreateCourseRequest): void {
    this.store.dispatch(
      CoursesActions.requestCreateCourse({
        course: body,
      })
    );
  }

  deleteCourse(id: string): void {
    this.store.dispatch(CoursesActions.requestDeleteCourse({ id }));
  }
}
