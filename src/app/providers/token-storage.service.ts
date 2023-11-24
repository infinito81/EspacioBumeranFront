import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveExpired (expired:string){
    
    let today = new Date();
    today.setSeconds( Number(expired) );

    sessionStorage.setItem('expired', today.getTime().toString() );
  }

  public saveToken(token: string): void {
    console.log("We are going to save token " + token);
    window.sessionStorage.removeItem(TOKEN_KEY);
    
    window.sessionStorage.setItem(TOKEN_KEY, token);
    console.log("token got from session " + this.getToken());



    const user = this.getUser();
    if (user.id) {
      this.saveUser({ ...user, accessToken: token });
    }
  }

  public getToken(): string | null {
    console.log("GetToken function: " + window.sessionStorage.getItem(TOKEN_KEY));
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveRefreshToken(token: string): void {
    window.sessionStorage.removeItem(REFRESHTOKEN_KEY);
    window.sessionStorage.setItem(REFRESHTOKEN_KEY, token);
  }

  public getRefreshToken(): string | null {
    return window.sessionStorage.getItem(REFRESHTOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  isAuthenticated(): boolean {

    console.log("authenticated verification");
    console.log("isAuthenticated: " +  window.sessionStorage.getItem(TOKEN_KEY));
    if ( window.sessionStorage.getItem(TOKEN_KEY) == null|| window.sessionStorage.getItem(TOKEN_KEY) == '') {
      console.log("TOKEN EMPTY");
      return false;
    }

    const expired = Number(sessionStorage.getItem('expired'));
    const expriredDate = new Date();
    expriredDate.setTime(expired);
    console.log('Expired date: ' + expriredDate);
    console.log('Actual date: ' + new Date());
    if ( expriredDate > new Date() ) {      
      return true;
    } else {
      return false;
    }


  }
}

