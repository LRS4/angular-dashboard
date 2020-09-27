import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private service: UserService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (localStorage.getItem('token') != null) {
        let roles = next.data['permittedRoles'] as Array<string>;
        if (roles) {
          if (this.service.roleMatch(roles)) return true;
          else {
            this.router.navigate(['forbidden']);
            return false;
          }
        }
        return true;
      } else {
        this.router.navigate(['user/login']);
        return false;
      }
  }
}
