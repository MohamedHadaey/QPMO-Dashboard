import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from 'src/app/models/user';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: any = 'https://exastfs.alqemam.com:8443';
  version: any = 1;
  currentLanguage: any = localStorage.getItem('currentLanguage');
  constructor(private http: HttpClient) {

  }

   // 1- sign in function
   signIn(Username:any, pass:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Dashboard/v${this.version}/Auth/SignIn?Username=${Username}&pass=${pass}&culture=${this.currentLanguage}`, null);
  }

  // 2- varify pass
  varifyPass(UserID:number, code:number, C_Code:string): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Dashboard/v${this.version}/Auth/Complete_SignIn?UserID=${UserID}&code=${code}&C_Code=${C_Code}&culture=${this.currentLanguage}`, null);
  }


  forgetPassword(Phone:any ): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Dashboard/v${this.version}/Auth/ForgetPass?Phone=${Phone}&culture=${this.currentLanguage}`, null);
  }

  makeNewPassword(C_Code:string , Phone: string, code:number, NewPass:string): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Dashboard/v${this.version}/Auth/ForgetPass_Confirm?C_Code=${C_Code}&Phone=${Phone}&code=${code}&NewPass=${NewPass}&culture=${this.currentLanguage}`, null);
  }

  // logOut function
  logout() {
    localStorage.removeItem("isLogin");
  }
}
