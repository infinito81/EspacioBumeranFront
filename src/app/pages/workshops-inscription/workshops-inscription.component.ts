import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AlertService } from '../../providers/alert.service';
//import { AccountService } from '../../providers/account.service';
import { SigningUpService } from 'src/app/providers/signing-up.service';

@Component({
  selector: 'app-workshops-inscription',
  templateUrl: './workshops-inscription.component.html',
  styleUrls: ['./workshops-inscription.component.css']
})
export class WorkshopsInscriptionComponent {
  form!: FormGroup;
  loading = false;
  submitted = false;
  optionPack = null;
  coursesForm! : FormGroup;
  tempId?:any;
  inscriptionId? : any;
  precio : string = "";

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private siningUpService: SigningUpService,
      private alertService: AlertService
  ) { }

  ngOnInit() {
      this.form = this.formBuilder.group({
          emailAddress: ['', Validators.required],
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          phone: ['', Validators.required],
          pack: ['20'],
          socioeugenio: false,
          sociotorre: false,
          nosocio: false
      });

      this.disabledAllOptions();

      this.visitRegistration();
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();

      // stop here if form is invalid
      if (this.form.invalid) {
          console.log("Invalid");
          return;
      } else {
        console.log("Valid");
        let counter = this.getOptionsMarkedCounter();

        if (counter != 1){
            console.log();
            Swal.fire({
              icon: "error",
              title: "Verifique los datos",
              text: "Elija al menos 1 opción (no socio, socio Torre Cervatos o socio San Eugenio"              
            });
           return;
        }
      }
      Swal.fire('Espere por favor...');
      Swal.showLoading();
      this.loading = true;
      this.siningUpService.signinOnlineCourses(this.form.value)
          .pipe(first())
          .subscribe({
              next: (resp:any) => {
                  this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                  
                    Swal.close();
                    const dataForm : NavigationExtras = {relativeTo: this.route};
                    this.inscriptionId = resp;
                    sessionStorage.setItem('inscriptionId', this.inscriptionId + "");
                    sessionStorage.setItem('inscriptionEmail', this.form.controls.emailAddress + "");
                    sessionStorage.setItem('pack', "20");
                    sessionStorage.setItem('precio', this.precio + "");
                    this.router.navigate(['../signing-confirm'], dataForm);

                  

              },
              error: error => {
                  this.alertService.error(error);
                  this.loading = false;
                  Swal.close();
                  Swal.fire({
                    icon: "error",
                    title: "Ha habido un error",
                    text: "Inténtelo de nuevo o póngase en contacto con info@espaciobumeran.com"              
                  });
                  return;
              }
          });
  }

  coursesControl(opcion : string){
   /* if (this.form.controls.nosocio.value){
      this.form.get('sociotorre')?.disable;        
      this.form.get('socioeugenio')?.disable; 
      return;

    }  
    if (this.form.controls.sociotorre.value){
      this.form.get('nosocio')?.disable;        
      this.form.get('socioeugenio')?.disable();
      return;   
    }  
    if (this.form.controls.socioeugenio.value){
      this.form.get('nosocio')?.disable();      
      this.form.get('sociotorre')?.disable();
      return;         
    }  */

    // Si sociotorre se selecciona, establecer socioeugenio y nosocio a false
    if (opcion == 'sociotorre') {
      this.form.patchValue({
        socioeugenio: false,
        nosocio: false,
        //sociotorre : true        
      });
      return;
    }

    // Si socioeugenio se selecciona, establecer sociotorre y nosocio a false
    if (opcion == 'socioeugenio') {
      this.form.patchValue({
        //socioeugenio: true,
        nosocio: false,
        sociotorre : false        
      });
      return;
    }

    // Si nosocio se selecciona, establecer sociotorre y socioeugenio a false
    if (opcion == 'nosocio') {
      this.form.patchValue({
        socioeugenio: false,
        //nosocio: !this.form.patchValue.noos,
        sociotorre : false        
      });
      return;
    }    
  }

  private getOptionsMarkedCounter(){
    let counter = 0;
    if (this.form.controls.nosocio.value){
        counter++;
        this.precio = "18 euros";
    }  
    if (this.form.controls.sociotorre.value){
        counter++;
        this.precio = "15 euros";
    }  
    if (this.form.controls.socioeugenio.value){
        counter++;
        this.precio = "15 euros";
    }  
   
    return counter;
  }

  private disabledUnmarkedOptions(){

   /* if (!this.form.controls.cuentos.value){
        this.form.get('cuentos')?.disable();        
    }  
    if (!this.form.controls.vinculos.value){
        this.form.get('vinculos')?.disable();        
    }  
    if (!this.form.controls.influencers.value){
        this.form.get('influencers')?.disable();        
    }  
    if (!this.form.controls.zapatos.value){
        this.form.get('zapatos')?.disable();        
    }  
    if (!this.form.controls.limites.value){
        this.form.get('limites')?.disable();        
    }  */   
  }

  enabledAllOptions(){ 
    /*this.form.get('cuentos')?.enable();        
    this.form.get('vinculos')?.enable();        
    this.form.get('influencers')?.enable();        
    this.form.get('zapatos')?.enable();        
    this.form.get('limites')?.enable();  */      
  }

  disabledAllOptions(){ 
    /*this.form.get('cuentos')?.disable();        
    this.form.get('vinculos')?.disable();        
    this.form.get('influencers')?.disable();        
    this.form.get('zapatos')?.disable();        
    this.form.get('limites')?.disable(); */       
  }  

  unmarksAllOptions(){ 
    
    /*this.form.controls.cuentos.setValue(false);        
    this.form.controls.vinculos.setValue(false);        
    this.form.controls.influencers.setValue(false);        
    this.form.controls.zapatos.setValue(false);        
    this.form.controls.limites.setValue(false);   
    console.log('unmarks all ' + this.optionPack);*/    
  }  

  visitRegistration(){
    this.siningUpService.visitRegistration('tallerampa').subscribe(()  => {
      console.log("visit register ok");
    } ,(err:any) =>{
      console.error(err);
    }); 
  }
}