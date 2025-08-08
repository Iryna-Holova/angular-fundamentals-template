import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { UserStoreService } from '../services/user-store.service';
import { ROUTES } from '@app/shared/constants';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  private readonly userStore = inject(UserStoreService);
  private readonly router = inject(Router);

  canActivate(): boolean | UrlTree {
    return this.userStore.isAdmin
      ? true
      : this.router.createUrlTree([ROUTES.COURSES]);
  }
}
