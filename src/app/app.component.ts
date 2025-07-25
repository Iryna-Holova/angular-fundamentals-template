import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserStoreService } from '@app/user/services/user-store.service';
import { AuthService } from '@app/auth/services/auth.service';
import { TEXT } from '@shared/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'courses-app';
  readonly TEXT = TEXT;

  userName$ = this.userStore.name$;
  isAuthorized$ = this.authService.isAuthorized$;

  constructor(
    private router: Router,
    private userStore: UserStoreService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userStore.getUser().subscribe();
  }

  onLogout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
