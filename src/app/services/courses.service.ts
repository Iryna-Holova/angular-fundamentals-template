import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Author } from '@app/models/author.model';
import { Course } from '@app/models/course.model';

interface ApiResponse<T> {
  successful: boolean;
  result: T;
}

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly apiUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<Course[]>> {
    return this.http.get<ApiResponse<Course[]>>(`${this.apiUrl}/courses/all`);
  }

  createCourse(course: Omit<Course, 'id'>): Observable<ApiResponse<Course>> {
    return this.http.post<ApiResponse<Course>>(
      `${this.apiUrl}/courses/add`,
      course
    );
  }

  editCourse(
    id: string,
    course: Omit<Course, 'id'>
  ): Observable<ApiResponse<Course>> {
    return this.http.put<ApiResponse<Course>>(
      `${this.apiUrl}/courses/${id}`,
      course
    );
  }

  getCourse(id: string): Observable<ApiResponse<Course>> {
    return this.http.get<ApiResponse<Course>>(`${this.apiUrl}/courses/${id}`);
  }

  deleteCourse(id: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/courses/${id}`);
  }

  filterCourses(title: string): Observable<ApiResponse<Course[]>> {
    const params = new HttpParams().set('title', title);
    return this.http.get<ApiResponse<Course[]>>(
      `${this.apiUrl}/courses/filter`,
      { params }
    );
  }

  getAllAuthors(): Observable<ApiResponse<Author[]>> {
    return this.http.get<ApiResponse<Author[]>>(`${this.apiUrl}/authors/all`);
  }

  createAuthor(name: string): Observable<ApiResponse<Author>> {
    return this.http.post<ApiResponse<Author>>(`${this.apiUrl}/authors/add`, {
      name,
    });
  }

  getAuthorById(id: string): Observable<ApiResponse<Author>> {
    return this.http.get<ApiResponse<Author>>(`${this.apiUrl}/authors/${id}`);
  }
}
