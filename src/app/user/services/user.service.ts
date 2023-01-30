import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalReceivier, user } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: any = 'https://exastfs.alqemam.com:8443';
  version: any = 1;
  currentLanguage: any = localStorage.getItem('currentLanguage');
  constructor(private http: HttpClient) {}

  GetInfo(): Observable<GlobalReceivier> {
    let httpOp = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('tok'),
      }),
    };
    return this.http.post<GlobalReceivier>(
      `${this.baseUrl}/api/Dashboard/v${this.version}/Auth/GetMyInfo?culture=${this.currentLanguage}`,
      null,
      httpOp
    );
  }
}
