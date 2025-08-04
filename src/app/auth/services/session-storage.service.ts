import { Injectable, inject, InjectionToken } from '@angular/core';

const WINDOW = new InjectionToken<Window>('Global window object', {
  factory: () => window,
});

const TOKEN_KEY = 'SESSION_TOKEN';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  private readonly window = inject(WINDOW);

  setToken(token: string): void {
    this.window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string | null {
    return this.window.sessionStorage.getItem(TOKEN_KEY);
  }

  deleteToken(): void {
    this.window.sessionStorage.removeItem(TOKEN_KEY);
  }

  hasToken(): boolean {
    return !!this.getToken();
  }
}
