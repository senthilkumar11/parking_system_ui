import { Injectable } from '@angular/core';
import { observable, Observable, Subject } from 'rxjs';
import { login } from 'src/app/model/login';
import { map, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpService } from './http.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  errorName!: string
  authenticated=new Subject<boolean>();
  public authenticated$ = this.authenticated.asObservable();

  constructor(private httpService: HttpService,private jwtService:JwtHelperService) {
  };
  login(login: login): Observable<boolean> {

    return this.httpService.post('api/auth/login', login)
      .pipe(
        map((response: any) => {
          // login successful if there's a jwt token in the response
          let token = response.token;

          if (token) {
            // store username and jwt token in local storage to keep user logged in between page refreshes
            this.extractLoginInfo(response);
            // return true to indicate successful login
            return true;
          } else {
            // return false to indicate failed login
            return false;
          }
        }),
      );
  }

  extractLoginInfo(result: any) {
    console.log(result);
    if (result.id) {
      this.setUserId(result.id);
    }
    if (result.username) {
      this.setUserName(result.username);
    }
    if (result.email) {
      this.setEmail(result.email);
    }
    if (result.token) {
      this.setToken(result.token);
    }
  }
  setUserId(id: string) {
    localStorage.setItem("id", id);
  }
  getUserId():any {
    return localStorage.getItem("id");
  }
  setUserName(userName: string) {
    localStorage.setItem("userName", userName);
  }
  getUserName(): any {
    return localStorage.getItem("userName");
  }
  setEmail(email: string) {
    localStorage.setItem("email", email);
  }
  getEmail():any {
    return localStorage.getItem("email");
  }
  setToken(token: string) {
    localStorage.setItem("token", token);
  }
  getToken():any {
    return localStorage.getItem("token");
  }
  logout() {
   localStorage.clear(); 
   this.authenticated.next(false);
  }
  validateToken(){
    let token=this.getToken();
    return token != "" ? !this.jwtService.isTokenExpired(token) : false;
  }
  isAuthenticated(){
    console.log("authentication")
    if(this.validateToken())
    {
      this.authenticated.next(true);
      return true;
    }else{
      this.authenticated.next(false);
      return false;
    }
  }
}





