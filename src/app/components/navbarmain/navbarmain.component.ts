import { Component } from '@angular/core';
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
  //userName;
  //userRole;
  constructor(private authService: AuthService, private tokenService : TokenStorageService, private router: Router) {
    /*this.userName = authService.getUserName();
    this.userRole = authService.getUserRole();
    console.log('Role: ' + this.userRole);
    console.log('User: ' + this.userName);*/
    this.routerObj = router;
   }

   signOut() {
     console.log('Llamado SignOut()');
     this.tokenService.signOut();
   }



  ngOnInit(): void {
    console.log('On init navbar');
  }



}