import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signing-confirm',
  templateUrl: './signing-confirm.component.html',
  styleUrls: ['./signing-confirm.component.css']
})
export class SigningConfirmComponent  implements OnInit {
    inscriptionId? : any;
    inscriptionEmail? : any;
    precio? : any;
    pack? : any;
    mostrarVirago = false;
    mostrarTalleres = false;

    ngOnInit(): void {
      this.inscriptionEmail = sessionStorage.getItem('inscriptionEmail');
      this.inscriptionId = sessionStorage.getItem('inscriptionId');

      this.pack = sessionStorage.getItem('pack');
      console.log("PACK --> " + this.pack);
      if (this.pack=="1"){
        this.precio = "25 euros";
        this.mostrarTalleres = true;
      } else if (this.pack=="2"){
        this.precio = "30 euros";
        this.mostrarTalleres = true;
      } else if (this.pack=="3"){
        this.precio = "50 euros";
        this.mostrarTalleres = true;
      } else if (this.pack=="11"){
        this.precio = "249 euros";
        this.mostrarVirago = true;
      } else if (this.pack=="12"){
        this.mostrarVirago = true;
        this.precio = "450 euros";                
      }

      console.log("INSCRIPTION ID --> " + this.inscriptionId);


    }


}
