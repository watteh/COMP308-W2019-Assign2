// auth.guard.ts -- Ryan Watson -- 300920674 -- 03/25/19

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // Declare variables
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  // Constructor for imported modules
  constructor(private authService: AuthService, private router: Router) {}

  // method to activate routes if user is logged in and authorized
  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
