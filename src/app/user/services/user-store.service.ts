import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private name$$ = new BehaviorSubject<string>('');
  private isAdmin$$ = new BehaviorSubject<boolean>(false);

  public name$ = this.name$$.asObservable();
  public isAdmin$ = this.isAdmin$$.asObservable();

  constructor(private userService: UserService) {}

  getUser(): Observable<any> {
    return this.userService.getUser().pipe(
      tap((response) => {
        if (response.successful) {
          const user = response.result;
          this.name$$.next(user.name);
          this.isAdmin$$.next(user.role === 'admin');
        }
      })
    );
  }

  get isAdmin(): boolean {
    return this.isAdmin$$.value;
  }

  set isAdmin(value: boolean) {
    this.isAdmin$$.next(value);
  }
}
