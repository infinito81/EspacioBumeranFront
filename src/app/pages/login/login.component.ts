import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { AuthService } from '../../providers/auth.service';
import { TokenStorageService } from 'src/app/providers/token-storage.service';
import { AlertService } from 'src/app/providers/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserModel = new UserModel();
  recordarme = false;
  form!: FormGroup;
  loading = false;
  submitted = false;


  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private auth: AuthService, 
              private tokenService:TokenStorageService, 
              private alertService:AlertService) { 
              
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });    
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    console.log('Login llamado');


    Swal.fire('Espere por favor...');
    Swal.showLoading();

    console.log(this.f.username.value);
    console.log(this.f.password.value);


    this.auth.login( this.f.username.value, this.f.password.value ).subscribe(
      data =>{
        console.log(data);
        this.tokenService.saveToken(data.access_token);
        this.tokenService.saveExpired(data.expires_in);
        this.tokenService.saveRefreshToken(data.refresh_token);
        this.tokenService.saveUser(data);
        this.auth.setLogin(true);
        Swal.close();
        console.log("respuesta login. Vamos a home");
        this.router.navigateByUrl('/summary');
      },
      err => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al autenticar: ' + err.error.error_description
        });
      }
    );
}
    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

/*
  login(form : NgForm){
    console.log('Login llamado');
    if (  form.invalid ) { 
      console.error('Form invalid');
      return; 
    }

    Swal.fire('Espere por favor...');
    Swal.showLoading();


    this.auth.login( this.user.username, this.user.password ).subscribe(
      data =>{
        console.log(data);
        this.tokenService.saveToken(data.access_token);
        this.tokenService.saveExpired(data.expires_in);
        this.tokenService.saveRefreshToken(data.refresh_token);
        this.tokenService.saveUser(data);
        Swal.close();
        console.log("respuesta login. Vamos a home");
        this.router.navigateByUrl('/home');
      },
      err => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al autenticar: ' + err.error.error_description
        });
      }
    );
  }
*/
  aRegistro(){
    this.router.navigateByUrl('/register');    
  }  

}


