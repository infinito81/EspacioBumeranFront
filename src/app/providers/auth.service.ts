import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

const AUTH_API = environment.url_token;
const TOKEN_KEY = 'auth-token';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';
const USER_KEY = 'auth-user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userToken: string | null;

  constructor(private http: HttpClient, private tokenS : TokenStorageService, private  router : Router) { 
    this.userToken = "";
  }

  login(username: string, password: string): Observable<any> {
    let authorizationData = 'Basic ' + btoa('ESPACIO_BUMERAN' + ':' + 'ESPACIO_BUMERAN_FRONT');

    console.log(username + ":" + password);

    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/x-www-form-urlencoded',
        //'Access-Control-Allow-Origin' : '*',
        'Authorization': authorizationData
      })
    };



    const body = new HttpParams()
     .set('username', username)
     .set('password', password)
     .set('grant_type', 'password');

    const url = environment.url_token;
  
    return this.http.post(AUTH_API, body, headerOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password
    }, httpOptions);
  }

  refreshToken(token: string) {
    return this.http.post(AUTH_API + 'refreshtoken', {
      refreshToken: token
    }, httpOptions);
  }

  isAuthenticated(){
    return this.tokenS.isAuthenticated();
  }


  readToken() {

    if ( window.sessionStorage.getItem(TOKEN_KEY) ) {
      this.userToken = sessionStorage.getItem(TOKEN_KEY);
      console.log('Token: ' + this.userToken);
      if (!this.tokenS.isAuthenticated()){
        this.userToken = '';
        this.router.navigateByUrl('/login');

      }
    } else {
      this.userToken = '';
      this.router.navigateByUrl('/login');
    }

    
    return this.userToken;

  }

  getUserName(){
    this.readToken();

    if (this.userToken!=null && this.userToken.length > 2){
      let infoToken = this.userToken.split('.');
      let infoUserStr = atob(infoToken[1]);
      let infoUser = JSON.parse(infoUserStr);

      console.log("User Name:");
      console.log(infoUser);

      return infoUser.user_name;
    }else{
      return '';
    }

  }

  getUserRole(){
    console.log("Getting user role. Token before: " + this.userToken);
    this.readToken();
    console.log("Token after reading " + this.userToken);

    if (this.userToken!=null && this.userToken.length > 2){
      let infoToken = this.userToken.split('.');
      let infoUserStr = atob(infoToken[1]);
      let infoUser = JSON.parse(infoUserStr);

      console.log("User Name:");
      console.log(infoUser);
      
      if (infoUser.authorities.length > 0){
        return infoUser.authorities[0];
      }else{
        return '';
      }
      
    }else{
      return '';
    }
  }

  logout(){
    this.tokenS.signOut();
  }
}