import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { CoursesService } from './courses.service';

import { Author } from '@app/models/author.model';
import { Course } from '@app/models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesStoreService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  private courses$$ = new BehaviorSubject<Course[]>([]);
  private authors$$ = new BehaviorSubject<Author[]>([]);

  public isLoading$ = this.isLoading$$.asObservable();
  public courses$ = this.courses$$.asObservable();
  public authors$ = this.authors$$.asObservable();

  constructor(private coursesService: CoursesService) {}

  getAll(): Observable<any> {
    this.isLoading$$.next(true);
    return this.coursesService.getAll().pipe(
      tap((response) => {
        if (response.successful) {
          this.courses$$.next(response.result);
        }
      }),
      finalize(() => this.isLoading$$.next(false))
    );
  }

  createCourse(course: Omit<Course, 'id'>): Observable<any> {
    this.isLoading$$.next(true);
    return this.coursesService.createCourse(course).pipe(
      tap((response) => {
        if (response.successful) {
          const currentCourses = this.courses$$.value;
          this.courses$$.next([...currentCourses, response.result]);
        }
      }),
      finalize(() => this.isLoading$$.next(false))
    );
  }

  getCourse(id: string): Observable<any> {
    this.isLoading$$.next(true);
    return this.coursesService
      .getCourse(id)
      .pipe(finalize(() => this.isLoading$$.next(false)));
  }

  editCourse(id: string, course: Omit<Course, 'id'>): Observable<any> {
    this.isLoading$$.next(true);
    return this.coursesService.editCourse(id, course).pipe(
      tap((response) => {
        if (response.successful) {
          const currentCourses = this.courses$$.value;
          const updatedCourses = currentCourses.map((c) =>
            c.id === id ? response.result : c
          );
          this.courses$$.next(updatedCourses);
        }
      }),
      finalize(() => this.isLoading$$.next(false))
    );
  }

  deleteCourse(id: string): Observable<any> {
    this.isLoading$$.next(true);
    return this.coursesService.deleteCourse(id).pipe(
      tap((response) => {
        if (response.successful) {
          const currentCourses = this.courses$$.value;
          const filteredCourses = currentCourses.filter((c) => c.id !== id);
          this.courses$$.next(filteredCourses);
        }
      }),
      finalize(() => this.isLoading$$.next(false))
    );
  }

  filterCourses(title: string): Observable<any> {
    this.isLoading$$.next(true);
    return this.coursesService.filterCourses(title).pipe(
      tap((response) => {
        if (response.successful) {
          this.courses$$.next(response.result);
        }
      }),
      finalize(() => this.isLoading$$.next(false))
    );
  }

  getAllAuthors(): Observable<any> {
    return this.coursesService.getAllAuthors().pipe(
      tap((response) => {
        if (response.successful) {
          this.authors$$.next(response.result);
        }
      })
    );
  }

  createAuthor(name: string): Observable<any> {
    return this.coursesService.createAuthor(name).pipe(
      tap((response) => {
        if (response.successful) {
          const currentAuthors = this.authors$$.value;
          this.authors$$.next([...currentAuthors, response.result]);
        }
      })
    );
  }

  getAuthorById(id: string): Observable<any> {
    return this.coursesService.getAuthorById(id);
  }
}
