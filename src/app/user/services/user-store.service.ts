import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { User, AuthResponse } from '@app/shared/types/auth.types';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private readonly userService = inject(UserService);

  private readonly user$ = new BehaviorSubject<User | null>(null);
  private readonly isAdmin$ = new BehaviorSubject<boolean>(false);

  readonly currentUser = this.user$.asObservable();
  readonly userIsAdmin = this.isAdmin$.asObservable();

  loadCurrentUser(): Observable<AuthResponse<User>> {
    return this.userService
      .getCurrentUser()
      .pipe(
        tap(this.handleUserLoadSuccess.bind(this)),
        catchError(this.handleUserLoadError.bind(this))
      );
  }

  clearUser(): void {
    this.user$.next(null);
    this.isAdmin$.next(false);
  }

  get isAdmin(): boolean {
    return this.isAdmin$.value;
  }

  get userName(): string {
    return this.user$.value?.name ?? '';
  }

  private handleUserLoadSuccess(response: AuthResponse<User>): void {
    if (response.successful && response.result) {
      const user = response.result;
      this.user$.next(user);
      this.isAdmin$.next(user.role === 'admin');
    }
  }

  private handleUserLoadError(error: any): Observable<never> {
    console.error('Failed to load user:', error);
    this.clearUser();
    return EMPTY;
  }
}
