import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { catchError, map } from 'rxjs';

export const isLoggedInGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  // TODO > make sure to use `()` on signals, ALWAYS !!!
  if (authService.user() === undefined) {
    return authService.getUser().pipe(
      map(() => true),
      catchError(() => router.navigate(['login'])),
    );
  }

  if (authService.user() === null) {
    router.navigate(['login']);
  }

  return true;
};
