import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

   // 1- signup function
  //  signUp(registerData: any): Observable<any> {
  //   return this.http.post();
  // }


  // logOut function
  logout() {
    localStorage.removeItem("isLogin");
  }
}
