import { Component, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { TokenStorageService } from 'src/app/providers/token-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbarmain',
  templateUrl: './navbarmain.component.html',
  styleUrls: ['./navbarmain.component.css']
})
export class NavbarmainComponent {
  routerObj : Router;
  loggedIn : boolean = false;  

  constructor(private authService: AuthService, private tokenService : TokenStorageService, private router: Router) {

    this.routerObj = router;
   }

   signOut() {
     console.log('Llamado SignOut()');
     this.tokenService.signOut();
   }



  ngOnInit(): void {
    console.log('On init navbar');
    this.loggedIn = this.authService.isAuthenticated();
    console.log('authenticated from NavBar --> ' + this.loggedIn);    
  }



}