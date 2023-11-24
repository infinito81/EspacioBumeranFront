import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AlertService } from '../../providers/alert.service';
//import { AccountService } from '../../providers/account.service';
import { SigningUpService } from 'src/app/providers/signing-up.service';

@Component({
  selector: 'app-evento-inscription',
  templateUrl: './evento-inscription.component.html',
  styleUrls: ['./evento-inscription.component.css']
})
export class EventoInscriptionComponent {
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
          pack: ['', Validators.required]
      });

      
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

}
