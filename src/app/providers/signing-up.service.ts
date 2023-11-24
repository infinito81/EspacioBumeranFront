import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { SigninCoursesForm } from '../models/signin-courses-form.model';


@Injectable({ providedIn: 'root' })
export class SigningUpService {
    private formSubject: BehaviorSubject<SigninCoursesForm | null>;
    public form: Observable<SigninCoursesForm | null>;

    resp : any;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.formSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.form = this.formSubject.asObservable();
    }

    public get userValue() {
        return this.formSubject.value;
    }


    signinOnlineCourses(form: SigninCoursesForm) {

        const headerOptions = {
          headers: new HttpHeaders({
            'Content-Type' : 'application/json'
          })
        };
    
        //return this.http.post(`${this.url}/postSaveStaffUser`, user, headerOptions);

        return this.http.post(`${environment.url_general}/users/signinOnlineCourses`, form, headerOptions);
    }

    visitRegistration(modo : string){   
        const headerOptions = {
          headers: new HttpHeaders({
            'Content-Type' : 'application/json'
          })
        };
    
        return this.http.get(`${environment.url_general}/users/visitRegistration?modo=${modo}`, headerOptions);
    }    

    getAllInscriptions(){
      const headerOptions = {
        headers: new HttpHeaders({
          'Content-Type' : 'application/json'      
        })
      };

      return this.http.get(`${environment.url_general}/users/getInscriptions`, headerOptions);      
    }


    /*signinEventPack(form: SigninCoursesForm) {

        const headerOptions = {
          headers: new HttpHeaders({
            'Content-Type' : 'application/json'
          })
        };
    
        //return this.http.post(`${this.url}/postSaveStaffUser`, user, headerOptions);

        return this.http.post(`${environment.url_general}/users/signinOnlineCourses`, form, headerOptions);
    }*/

}