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

  getFavProjects_list():Observable<any> {
    return this.http.get( `${this._AuthService.baseUrl}/api/Dashboard/v${this._AuthService.version}/FavProjects/GetFavoriteProjects_Table?culture=${this._AuthService.currentLanguage}` )
  }

  getFavProjects_card():Observable<any> {
    return this.http.get( `${this._AuthService.baseUrl}/api/Dashboard/v${this._AuthService.version}/FavProjects/GetFavoriteProjects_Card?culture=${this._AuthService.currentLanguage}` )
  }

  getFollowProjects():Observable<any> {
    return this.http.get( `${this._AuthService.baseUrl}/api/Dashboard/v${this._AuthService.version}/ProjectHistory/GetProjectsLog?culture=${this._AuthService.currentLanguage}` )
  }

  getProjectDetails(id:any):Observable<any> {
    return this.http.get( `${this._AuthService.baseUrl}/api/Dashboard/v${this._AuthService.version}/Projects/GetProjectDetails?ProjectID=${id}&culture=${this._AuthService.currentLanguage}`)
  }

  addToFav(projectId:any):Observable<any> {
    return this.http.post( `${this._AuthService.baseUrl}/api/Dashboard/v${this._AuthService.version}/FavProjects/AddToFavorite?projectId=${projectId}&culture=${this._AuthService.currentLanguage}`, null )
  }

  removeFromFav(projectId:any):Observable<any> {
    return this.http.post( `${this._AuthService.baseUrl}/api/Dashboard/v${this._AuthService.version}/FavProjects/RemoveFromFavorite?projectId=${projectId}&culture=${this._AuthService.currentLanguage}`, null )
  }

  getAllCategoties():Observable<any> {
    return this.http.get( `${this._AuthService.baseUrl}/api/Dashboard/v${this._AuthService.version}/ProjectCategory/GetAll?culture=${this._AuthService.currentLanguage}` )
  }

  getAllStates():Observable<any> {
    return this.http.get( `${this._AuthService.baseUrl}/api/Dashboard/v${this._AuthService.version}/ProjectStatus/GetAll?culture=${this._AuthService.currentLanguage}` )
  }

  filterProjects(data:any):Observable<any> {
    return this.http.post( `${this._AuthService.baseUrl}/api/Dashboard/v${this._AuthService.version}/Projects/FilterProjects_Table?culture=${this._AuthService.currentLanguage}`, data)
  }
}
