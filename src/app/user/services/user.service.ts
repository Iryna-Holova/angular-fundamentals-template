import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  email: string;
  name: string;
  role: string;
}

interface ApiResponse<T> {
  successful: boolean;
  result: T;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  getUser(): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/users/me`);
  }
}
