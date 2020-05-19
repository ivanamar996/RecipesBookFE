import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData{
  token : string,
  expiration : string,
  //refreshToken : string,
  //expiresIn : string,
  //localId : string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  tokenExpirationTimer: any;
  
  constructor(private http:HttpClient, private router: Router) { }

  signIn(email:string, password:string){
    return this.http.post<AuthResponseData>('https://localhost:44355/api/Auth/register' ,
    {
      email: email,
      password:password
    }).pipe(catchError(this.handleError), tap( resdata => {
      this.handleAuthentication(email,resdata.token, resdata.expiration);
    }));
  }

  login(email:string, password:string){
    return this.http.post<AuthResponseData>('https://localhost:44355/api/Auth/login',
    {
      email: email,
      password:password
    }).pipe(catchError(this.handleError), tap( resdata => {
      this.handleAuthentication(email,resdata.token, resdata.expiration);
     }));;
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin(){
    const userData = JSON.parse(localStorage.getItem('auth'));
    if(!userData){
      return;
    }

    const loadedUser = new User(userData.email, userData._token, new Date(userData._tokenExpirationDate));
    if(loadedUser.token){
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(()=>{
      this.logout();
    }, expirationDuration / 1000);
  }

  private handleAuthentication(email: string,token: string, expiration: string){
    console.log("Handle auth");
    const exparationDate = new Date(expiration);
    const user = new User(email,token, exparationDate);
    //this.autoLogout(exparationDate.getMilliseconds());
    localStorage.setItem('userData', JSON.stringify(user));
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = "An error occurred!";
    if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage);
    }
    
    // switch(errorRes.error.error.message){
    //   case "EMAIL_EXISTS":
    //     errorMessage = "This email exists already!";
    //     break;
    //   case "EMAIL_NOT_FOUND":
    //     errorMessage = "This email is not correct!";
    //     break;
    //   case "INVALID_PASSWORD":
    //     errorMessage = "This password is not correct!";
    //     break;
    // }
    return throwError(errorMessage);
  }
}
