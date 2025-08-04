import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import {
  ApiResponse,
  Author,
  Course,
  CreateCourseRequest,
} from '@shared/types/courses.types';
import { API } from '@shared/constants';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = API.BASE_URL;

  getAll(): Observable<Course[]> {
    return this.http
      .get<ApiResponse<Course[]>>(`${this.apiUrl}${API.ENDPOINTS.COURSES}/all`)
      .pipe(map(this.handleResponse), catchError(this.handleError));
  }

  createCourse(course: CreateCourseRequest): Observable<Course> {
    return this.http
      .post<ApiResponse<Course>>(
        `${this.apiUrl}${API.ENDPOINTS.COURSES_ADD}`,
        course
      )
      .pipe(map(this.handleResponse), catchError(this.handleError));
  }

  editCourse(id: string, course: CreateCourseRequest): Observable<Course> {
    return this.http
      .put<ApiResponse<Course>>(
        `${this.apiUrl}${API.ENDPOINTS.COURSES}/${id}`,
        course
      )
      .pipe(map(this.handleResponse), catchError(this.handleError));
  }

  getCourse(id: string): Observable<Course> {
    return this.http
      .get<ApiResponse<Course>>(`${this.apiUrl}${API.ENDPOINTS.COURSES}/${id}`)
      .pipe(map(this.handleResponse), catchError(this.handleError));
  }

  deleteCourse(id: string): Observable<void> {
    return this.http
      .delete<ApiResponse<any>>(`${this.apiUrl}${API.ENDPOINTS.COURSES}/${id}`)
      .pipe(
        map(() => void 0),
        catchError(this.handleError)
      );
  }

  filterCourses(value: string): Observable<Course[]> {
    const params = new HttpParams().set('title', value);
    return this.http
      .get<ApiResponse<Course[]>>(
        `${this.apiUrl}${API.ENDPOINTS.COURSES_FILTER}`,
        { params }
      )
      .pipe(map(this.handleResponse), catchError(this.handleError));
  }

  getAllAuthors(): Observable<Author[]> {
    return this.http
      .get<ApiResponse<Author[]>>(`${this.apiUrl}/authors/all`)
      .pipe(map(this.handleResponse), catchError(this.handleError));
  }

  createAuthor(name: string): Observable<Author> {
    return this.http
      .post<ApiResponse<Author>>(`${this.apiUrl}/authors/add`, { name })
      .pipe(map(this.handleResponse), catchError(this.handleError));
  }

  getAuthorById(id: string): Observable<Author> {
    return this.http
      .get<ApiResponse<Author>>(`${this.apiUrl}/authors/${id}`)
      .pipe(map(this.handleResponse), catchError(this.handleError));
  }

  private handleResponse<T>(response: ApiResponse<T>): T {
    if (!response.successful) {
      throw new Error(response.error || 'Request failed');
    }
    return response.result;
  }

  private handleError = (error: any): Observable<never> => {
    alert('API Error:' + error.message);
    return throwError(() => new Error(error.message || 'Something went wrong'));
  };
}
