import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SessionStorageService } from './session-storage.service';
import { UserStoreService } from '@app/user/services/user-store.service';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface LoginResponse {
  successful: boolean;
  result: string;
  user?: {
    email: string;
    name: string;
    role: string;
  };
}

interface RegisterResponse {
  successful: boolean;
  result?: string;
  errors?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:4000';
  private isAuthorized$$ = new BehaviorSubject<boolean>(false);
  public isAuthorized$: Observable<boolean> =
    this.isAuthorized$$.asObservable();

  constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService,
    private userService: UserStoreService
  ) {
    const token = this.sessionStorage.getToken();
    this.isAuthorised = !!token;
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((response) => {
          if (response.successful) {
            this.sessionStorage.setToken(response.result);
            this.userService.getUser().subscribe();
            this.isAuthorised = true;
          }
        })
      );
  }

  logout(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/logout`).pipe(
      tap(() => {
        this.sessionStorage.deleteToken();
        this.isAuthorised = false;
      })
    );
  }

  register(credentials: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${this.apiUrl}/register`,
      credentials
    );
  }

  get isAuthorised(): boolean {
    return this.isAuthorized$$.getValue();
  }

  set isAuthorised(value: boolean) {
    this.isAuthorized$$.next(value);
  }

  getLoginUrl(): string {
    return `${this.apiUrl}/login`;
  }
}
