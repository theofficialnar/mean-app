import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { AuthService } from "./auth.service";

@Injectable()

export class AuthGuard implements CanActivate {
  
  constructor (private authService: AuthService, private router: Router) {};

  canActivate (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    //redirect logged in user to auth/logout when clicking Authentication
    if (this.authService.isLoggedIn()) {

      //set where user will be redirected
      this.router.navigate(['/auth', 'logout']);

      //return false to prevent access
      return false;
    }
    
    //else always allow
    return true;

  }
}