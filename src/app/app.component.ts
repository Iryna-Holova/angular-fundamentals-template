import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';

import { UserStoreService } from '@app/user/services/user-store.service';
import { AuthService } from '@app/auth/services/auth.service';
import { ROUTES, TEXT } from '@shared/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly userStore = inject(UserStoreService);
  private readonly authService = inject(AuthService);

  readonly title = 'courses-app';
  readonly TEXT = TEXT;

  readonly userName$ = this.userStore.currentUser.pipe(
    map((user) => user?.name ?? '')
  );
  readonly isAuthorized$ = this.authService.isAuthorized;

  ngOnInit(): void {
    if (this.authService.isUserAuthorized) {
      this.userStore.loadCurrentUser().subscribe();
    }
  }

  onLogout(): void {
    this.authService.logout().subscribe({
      complete: () => {
        this.userStore.clearUser();
        this.router.navigate([ROUTES.LOGIN]);
      },
    });
  }
}
