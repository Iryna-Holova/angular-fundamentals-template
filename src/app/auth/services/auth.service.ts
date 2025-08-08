import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, EMPTY } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { SessionStorageService } from './session-storage.service';
import {
  LoginRequest,
  RegisterRequest,
  LoginResponse,
  AuthResponse,
} from '@app/shared/types/auth.types';
import { API } from '@shared/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly sessionStorage = inject(SessionStorageService);

  private readonly apiUrl = API.BASE_URL;
  private readonly isAuthorized$ = new BehaviorSubject<boolean>(
    this.sessionStorage.hasToken()
  );

  readonly isAuthorized = this.isAuthorized$.asObservable();

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}${API.ENDPOINTS.LOGIN}`, credentials)
      .pipe(
        tap(this.handleLoginSuccess.bind(this)),
        catchError(this.handleError.bind(this))
      );
  }

  register(credentials: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        `${this.apiUrl}${API.ENDPOINTS.REGISTER}`,
        credentials
      )
      .pipe(catchError(this.handleError.bind(this)));
  }

  logout(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${API.ENDPOINTS.LOGOUT}`).pipe(
      tap(this.handleLogoutSuccess.bind(this)),
      catchError((error: HttpErrorResponse) => {
        this.handleLogoutSuccess();
        return EMPTY;
      })
    );
  }

  get isUserAuthorized(): boolean {
    return this.isAuthorized$.value;
  }

  private handleLoginSuccess(response: LoginResponse): void {
    if (response.successful && response.result) {
      this.sessionStorage.setToken(response.result);
      this.isAuthorized$.next(true);
    }
  }

  private handleLogoutSuccess(): void {
    this.sessionStorage.deleteToken();
    this.isAuthorized$.next(false);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Auth service error:', error);
    return throwError(() => error);
  }
}
