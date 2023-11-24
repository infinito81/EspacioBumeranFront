import { Component, OnInit } from '@angular/core';
import { SigningUpService } from 'src/app/providers/signing-up.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { SigninWorkshop } from 'src/app/models/signin-courses.model';

@Component({
  selector: 'app-inscriptions-list',
  templateUrl: './inscriptions-list.component.html',
  styleUrls: ['./inscriptions-list.component.css']
})
export class InscriptionsListComponent implements OnInit{

  inscriptions? : SigninWorkshop[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private siningUpService: SigningUpService
) { }

  ngOnInit(): void {
    this.siningUpService.getAllInscriptions().subscribe( (resp:any) => {

      this.inscriptions = resp;
      console.log(this.inscriptions);
    } ,(err) =>{

      console.error(err);
    }); 
  }
}
