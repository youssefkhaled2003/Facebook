import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UsersService } from './login-page/users.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UsersService);
  const router = inject(Router);

  if (userService.isAdmin()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
