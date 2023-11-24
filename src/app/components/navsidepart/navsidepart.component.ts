import {ChangeDetectorRef, Component} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { AuthService } from 'src/app/providers/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navsidepart',
  templateUrl: './navsidepart.component.html',
  styleUrls: ['./navsidepart.component.css']
})
export class NavsidepartComponent {

  routerObj : Router;
  

  constructor(private router: Router, private authService: AuthService) {
    this.routerObj = router;
  }  

  logout(){
    console.log("Vamos a cerrar la sesión de " + this.authService.getUserName());
    this.authService.logout();
    
    this.router.navigateByUrl('home');
  }
}
