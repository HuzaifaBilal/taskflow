import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Auth } from '@angular/fire/auth'; // Import from modular Firebase SDK
import { SnackService } from '../services/snack.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: Auth, // Use the new Auth service
    private snack: SnackService
  ) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const user = this.auth.currentUser;

      const isLoggedIn = !!user;
      if (!isLoggedIn) {
        this.snack.authError();
      }
      resolve(isLoggedIn);
    });
  }
}
