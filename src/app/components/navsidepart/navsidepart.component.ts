import {ChangeDetectorRef, Component} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { AuthService } from 'src/app/providers/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Vamos a cerrar la sesión de " + this.authService.getUserName());
        this.authService.logout();    
        this.router.navigateByUrl('home');
      }
    });

  }
}
