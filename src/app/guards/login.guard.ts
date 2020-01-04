import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  
  constructor(private router: Router, private token: TokenService) {

  }

  canActivate(): boolean {
    if (!this.token.hasToken()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
