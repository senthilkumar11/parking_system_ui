import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService,private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): any {
    console.log('interceptor...')
    const authToken:string=this.authService.getToken();
    let authReq ;
    if(authToken)
    authReq= request.clone({ headers: request.headers.set("Authorization", "Bearer " +authToken)});
    else
    authReq=request;
    return next.handle(authReq)
    .pipe(
        catchError((error: any) => {
            
            console.log("Interceptor error ... "+ JSON.stringify(error));
            if (error.status === 401) {
                console.log("Interceptor code 401 ... ");
                //logout users, redirect to login page
                this.authService.logout();
                //redirect to the signin page or show login modal here
                this.router.navigate(['account/login']); 
                return error;
            }
            console.log(error);    
            return throwError(error);
                
        }))
      }
}
