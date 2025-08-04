import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User, AuthResponse } from '@app/shared/types/auth.types';
import { API } from '@app/shared/constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = API.BASE_URL;

  getCurrentUser(): Observable<AuthResponse<User>> {
    return this.http.get<AuthResponse<User>>(
      `${this.apiUrl}${API.ENDPOINTS.CURRENT}`
    );
  }
}
