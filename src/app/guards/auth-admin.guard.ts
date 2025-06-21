import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionStorageService } from '../services/session-storage.service';

export const authAdminGuard: CanActivateFn = (route, state) => {
  const sessionStorage = inject(SessionStorageService);
  const router = inject(Router);

  const token = sessionStorage.getItem('token');
  const role = sessionStorage.getRole();

  if (token && role === 'ROLE_ADMIN') {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
