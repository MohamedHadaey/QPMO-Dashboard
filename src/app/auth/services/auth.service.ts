import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: any = 'https://exastfs.alqemam.com:8443';
  version: any = 1;
  currentLanguage: any = localStorage.getItem('currentLanguage');
  constructor(private http: HttpClient) {}

  // 1- sign in function
  signIn(Username:any, pass:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Dashboard/v${this.version}/Auth/SignIn?Username=${Username}&pass=${pass}&culture=${this.currentLanguage}`, null);
  }

  // 2- Verify password after sign in eth opt sended
  varifyPass(UserID:number, code:number, C_Code:string): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Dashboard/v${this.version}/Auth/Complete_SignIn?UserID=${UserID}&code=${code}&C_Code=${C_Code}&culture=${this.currentLanguage}`, null);
  }

  // 3- forget password function to enter your phone
  forgetPassword(Phone:any ): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Dashboard/v${this.version}/Auth/ForgetPass?Phone=${Phone}&culture=${this.currentLanguage}`, null);
  }

  // 4- verify the verification code after enter your phone to make new password instead of forgotten password
  varifyForgetPassword(code:number, C_Code:string): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Dashboard/v${this.version}/Auth/ForgetPass_ConfirmOTP?code=${code}&C_Code=${C_Code}&culture=${this.currentLanguage}`, null);
  }

  // 5- api of make a new password instead of forgotten password
  makeNewPassword(C_Code:any , Phone: any, code:number, NewPass:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Dashboard/v${this.version}/Auth/ForgetPass_Confirm?C_Code=${C_Code}&Phone=${Phone}&code=${code}&NewPass=${NewPass}&culture=${this.currentLanguage}`, null);
  }

  // 6- logOut function
  logout() {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("C_Code");
  }
}
