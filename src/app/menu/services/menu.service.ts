import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private _AuthService : AuthService, private http: HttpClient) { }

  getAllListsProjects():Observable<any> {
    return this.http.get(`${this._AuthService.baseUrl}/api/Dashboard/v${this._AuthService.version}/Projects/GetProjects_Table?culture=${this._AuthService.currentLanguage}`)
  }

  getAllMapProjects():Observable<any> {
    return this.http.get(`${this._AuthService.baseUrl}/api/Dashboard/v${this._AuthService.version}/Projects/GetProjects_Map?culture=${this._AuthService.currentLanguage}`)
  }

  getAllCardsProjects():Observable<any> {
    return this.http.get(`${this._AuthService.baseUrl}/api/Dashboard/v${this._AuthService.version}/Projects/GetProjects_Cards?culture=${this._AuthService.currentLanguage}`)
  }

  getFavProjects():Observable<any> {
    return this.http.get( `${this._AuthService.baseUrl}/api/Dashboard/v${this._AuthService.version}/FavProjects/GetFavoriteProjects_Table?culture=${this._AuthService.currentLanguage}` )
  }

}
