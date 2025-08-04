import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, finalize, catchError } from 'rxjs/operators';
import { CoursesService } from './courses.service';
import {
  Author,
  Course,
  CreateCourseRequest,
} from '@shared/types/courses.types';

@Injectable({
  providedIn: 'root',
})
export class CoursesStoreService {
  private readonly coursesService = inject(CoursesService);

  private isLoading$$ = new BehaviorSubject<boolean>(false);
  private courses$$ = new BehaviorSubject<Course[]>([]);
  private authors$$ = new BehaviorSubject<Author[]>([]);

  public isLoading$ = this.isLoading$$.asObservable();
  public courses$ = this.courses$$.asObservable();
  public authors$ = this.authors$$.asObservable();

  getAll(): Observable<Course[]> {
    this.isLoading$$.next(true);

    return this.coursesService.getAll().pipe(
      tap((result) => this.courses$$.next(result)),
      catchError((error) => of([])),
      finalize(() => this.isLoading$$.next(false))
    );
  }

  createCourse(course: Omit<Course, 'id'>): Observable<any> {
    this.isLoading$$.next(true);

    return this.coursesService.createCourse(course).pipe(
      tap((result) => {
        const currentCourses = this.courses$$.value;
        this.courses$$.next([...currentCourses, result]);
      }),
      catchError((error) => {
        throw error;
      }),
      finalize(() => this.isLoading$$.next(false))
    );
  }

  getCourse(id: string): Observable<Course> {
    this.isLoading$$.next(true);
    return this.coursesService.getCourse(id).pipe(
      tap((result) => result),
      catchError(() => of({} as Course)),
      finalize(() => this.isLoading$$.next(false))
    );
  }

  editCourse(id: string, course: CreateCourseRequest): Observable<Course> {
    this.isLoading$$.next(true);

    return this.coursesService.editCourse(id, course).pipe(
      tap((result) => {
        const currentCourses = this.courses$$.value;
        const updatedCourses = currentCourses.map((course) =>
          course.id === id ? result : course
        );
        this.courses$$.next(updatedCourses);
      }),
      catchError((error) => {
        throw error;
      }),
      finalize(() => this.isLoading$$.next(false))
    );
  }

  deleteCourse(id: string): Observable<void> {
    this.isLoading$$.next(true);

    return this.coursesService.deleteCourse(id).pipe(
      tap((response) => {
        const currentCourses = this.courses$$.value;
        const filteredCourses = currentCourses.filter(
          (course) => course.id !== id
        );
        this.courses$$.next(filteredCourses);
      }),
      catchError((error) => {
        throw error;
      }),
      finalize(() => this.isLoading$$.next(false))
    );
  }

  filterCourses(title: string): Observable<any> {
    this.isLoading$$.next(true);
    return this.coursesService.filterCourses(title).pipe(
      tap((result) => {
        this.courses$$.next(result);
      }),
      catchError(() => of([])),
      finalize(() => this.isLoading$$.next(false))
    );
  }

  getAllAuthors(): Observable<Author[]> {
    if (this.authors$$.value.length > 0) {
      return of(this.authors$$.value);
    }

    return this.coursesService.getAllAuthors().pipe(
      tap((result) => {
        this.authors$$.next(result);
      }),
      catchError(() => of([]))
    );
  }

  createAuthor(name: string): Observable<any> {
    return this.coursesService.createAuthor(name).pipe(
      tap((result) => {
        const currentAuthors = this.authors$$.value;
        this.authors$$.next([...currentAuthors, result]);
      }),
      catchError((error) => {
        throw error;
      })
    );
  }

  getAuthorById(id: string): Observable<Author> {
    return this.coursesService.getAuthorById(id);
  }
}
