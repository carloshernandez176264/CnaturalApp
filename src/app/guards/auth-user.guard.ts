import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionStorageService } from '../services/session-storage.service';

export const authUserGuard: CanActivateFn = (route, state) => {
  const sessionStorage = inject(SessionStorageService);
  const router = inject(Router);

  if (sessionStorage.isLoggedIn()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
