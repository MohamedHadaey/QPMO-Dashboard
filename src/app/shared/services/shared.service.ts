import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private _AuthService : AuthService, private http: HttpClient) { }




  getProjectDetails(id:any):Observable<any> {
    return this.http.get( `${this._AuthService.baseUrl}/api/Dashboard/v${this._AuthService.version}/Projects/GetProjectDetails?ProjectID=${id}&culture=${this._AuthService.currentLanguage}`)
  }
}
