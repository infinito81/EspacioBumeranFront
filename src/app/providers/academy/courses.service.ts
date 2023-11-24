import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth.service';


@Injectable({ providedIn: 'root' })
export class CoursesService {
    url = environment.url_academy;

    constructor(
        private http: HttpClient,
        private auth : AuthService
    ) {


    }

    getUserCourses(){

        const token = this.auth.readToken();
    
        let authorizationData = 'Bearer ' + token;
    
        const criteria = new HttpParams().set('userName', this.auth.getUserName());
      
        const headerOptions = {
          headers: new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization': authorizationData
          }),
          params: criteria
        };

        return this.http.get(`${this.url}/getUserCourses`, headerOptions);
    }
}