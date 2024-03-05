import { Component, OnInit } from '@angular/core';
import { SigningUpService} from 'src/app/providers/signing-up.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

    constructor(private visitService: SigningUpService){

    }

  ngOnInit(): void {
     this.visitService.visitRegistration("home").subscribe( (resp:any) => {      
      console.log("Mandado registro de visita");
    } ,(err) =>{
      console.error(err);
    }); 
  
  }

}
