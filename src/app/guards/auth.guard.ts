import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';
import { TokenStorageService } from '../providers/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor( private auth: AuthService, private tokenS:TokenStorageService,
               private router: Router) {}

  canActivate(): boolean  {

    if ( this.tokenS.isAuthenticated() ) {
      console.log('Usuario autenticado');
      return true;
    } else {
      console.log('Usuario NO autenticado');
      this.router.navigateByUrl('/login');
      return false;
    }

  }

}
