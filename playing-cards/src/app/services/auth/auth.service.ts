import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LocalStorageDatabaseNameKeys } from '../../constants/local.storage.database.name.keys';
import { AppConstants } from '../../constants/app.constants';
export interface ICredentials {
  username: string;
  password: string;
}
export interface ILoginResult {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  user = signal<User | null | undefined>(undefined);

  login(credentials: ICredentials): Observable<User | null | undefined> {
    console.log('authService > login > credentials', credentials);

    return this.http
      .post<ILoginResult>(
        `${AppConstants.API_BASE_URL}/sessions/login/`,
        credentials,
      )
      .pipe(
        tap((result: ILoginResult) => {
          console.log('authService > login > tap > result', result);
          localStorage.setItem(
            LocalStorageDatabaseNameKeys.SESSION_TOKEN_DB,
            result.token,
          );
          const user = Object.assign(new User(), result.user);
          this.user.set(user);
        }),
        map(() => this.user()),
      );
  }

  getUser(): Observable<User | null | undefined> {
    return this.http
      .get<User>(`${AppConstants.API_BASE_URL}/sessions/me/`)
      .pipe(
        tap((result: User) => {
          const user = Object.assign(new User(), result);
          this.user.set(user);
        }),
        map(() => {
          return this.user();
        }),
      );
  }

  logout() {
    return this.http.get(`${AppConstants.API_BASE_URL}/sessions/logout/`).pipe(
      tap(() => {
        localStorage.removeItem(LocalStorageDatabaseNameKeys.SESSION_TOKEN_DB);
        this.user.set(null);
      }),
    );
  }
}
