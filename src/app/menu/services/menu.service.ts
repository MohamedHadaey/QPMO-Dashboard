import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private _AuthService : AuthService, private http: HttpClient) { }


  getFavProjects():Observable<any> {
    return this.http.get( `${this._AuthService.baseUrl}/api/Dashboard/v${this._AuthService.version}/FavProjects/GetFavoriteProjects_Table?culture=${this._AuthService.currentLanguage}` )
  }

}
