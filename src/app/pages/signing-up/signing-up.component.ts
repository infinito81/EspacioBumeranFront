import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AlertService } from '../../providers/alert.service';
//import { AccountService } from '../../providers/account.service';
import { SigningUpService } from 'src/app/providers/signing-up.service';

@Component({
  selector: 'app-signing-up',
  templateUrl: './signing-up.component.html',
  styleUrls: ['./signing-up.component.css']
})
export class SigningUpComponent {
  form!: FormGroup;
  loading = false;
  submitted = false;
  optionPack = null;
  coursesForm! : FormGroup;
  tempId?:any;
  inscriptionId? : any;

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
          pack: ['', Validators.required],
          cuentos: false,
          vinculos: false,
          influencers: false,
          zapatos: false,
          limites: false

      });

      this.disabledAllOptions();
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

        if (counter < Number(this.optionPack)){
            console.log();
            Swal.fire({
              icon: "error",
              title: "Verifique los datos",
              text: "Elija al menos " + this.optionPack + " curso/s"              
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
                  this.tempId = setTimeout( () => {
                    Swal.close();
                    const dataForm : NavigationExtras = {relativeTo: this.route};
                    this.inscriptionId = resp;
                    sessionStorage.setItem('inscriptionId', this.inscriptionId + "");
                    sessionStorage.setItem('inscriptionEmail', this.form.controls.emailAddress + "");
                    sessionStorage.setItem('pack', this.form.controls.pack.value + "");
                    this.router.navigate(['../signing-confirm'], dataForm);

                  }, 2000);

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

  coursesControl(){
    
    console.log("coursesControl");
    let counter = this.getOptionsMarkedCounter();
  
    if (counter >= Number(this.optionPack)){
        this.disabledUnmarkedOptions();
    } else {
        this.enabledAllOptions();
    }       
  }

  private getOptionsMarkedCounter(){
    let counter = 0;
    if (this.form.controls.cuentos.value){
        counter++;
    }  
    if (this.form.controls.vinculos.value){
        counter++;
    }  
    if (this.form.controls.influencers.value){
        counter++;
    }  
    if (this.form.controls.zapatos.value){
        counter++;
    }  
    if (this.form.controls.limites.value){
        counter++;
    }     
    return counter;
  }

  private disabledUnmarkedOptions(){

    if (!this.form.controls.cuentos.value){
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
    }     
  }

  enabledAllOptions(){ 
    this.form.get('cuentos')?.enable();        
    this.form.get('vinculos')?.enable();        
    this.form.get('influencers')?.enable();        
    this.form.get('zapatos')?.enable();        
    this.form.get('limites')?.enable();        
  }

  disabledAllOptions(){ 
    this.form.get('cuentos')?.disable();        
    this.form.get('vinculos')?.disable();        
    this.form.get('influencers')?.disable();        
    this.form.get('zapatos')?.disable();        
    this.form.get('limites')?.disable();        
  }  

  unmarksAllOptions(){ 
    
    this.form.controls.cuentos.setValue(false);        
    this.form.controls.vinculos.setValue(false);        
    this.form.controls.influencers.setValue(false);        
    this.form.controls.zapatos.setValue(false);        
    this.form.controls.limites.setValue(false);   
    console.log('unmarks all ' + this.optionPack);    
  }  

}