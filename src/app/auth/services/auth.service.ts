import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl:any = "https://exastfs.alqemam.com:8443";
  version:any= 1;
  currentLanguage: any = localStorage.getItem('currentLanguage');
  constructor(private http: HttpClient) { }


   // 1- sign in function
   signIn(Username:any, pass:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Dashboard/v${this.version}/Auth/SignIn?Username=${Username}&pass=${pass}&culture=${this.currentLanguage}`, pass);
  }


  // logOut function
  logout() {
    localStorage.removeItem("isLogin");
  }
}
