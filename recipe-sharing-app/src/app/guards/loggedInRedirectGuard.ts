import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/user/auth.service';

@Injectable({ providedIn: 'root' })
export class LoggedInRedirectGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    // If the user is logged in, redirect them to 'Error Page'
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/error-404']);
      return false;
    } else {
      return true; // Allow access to the route for non-logged-in users
    }
  }
}
