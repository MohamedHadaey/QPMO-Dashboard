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

  getFavProjects_map():Observable<any> {
    return this.http.get( `${this._AuthService.baseUrl}/api/Dashboard/v${this._AuthService.version}/FavProjects/GetFavoriteProjects_Map?culture=${this._AuthService.currentLanguage}` )
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

  filterProjects_table(data:any):Observable<any> {
    return this.http.post( `${this._AuthService.baseUrl}/api/Dashboard/v${this._AuthService.version}/Projects/FilterProjects_Table?culture=${this._AuthService.currentLanguage}`, data)
  }

  filterProjects_map(data:any):Observable<any> {
    return this.http.post( `${this._AuthService.baseUrl}/api/Dashboard/v${this._AuthService.version}/Projects/FilterProjects_Map?culture=${this._AuthService.currentLanguage}`, data)
  }

  filterProjects_cards(data:any):Observable<any> {
    return this.http.post( `${this._AuthService.baseUrl}/api/Dashboard/v${this._AuthService.version}/Projects/FilterProjects_Cards?culture=${this._AuthService.currentLanguage}`, data)
  }


  GetAppliedFilterData():Observable<any> {
    return this.http.get( `${this._AuthService.baseUrl}/api/Dashboard/v${this._AuthService.version}/Projects/GetAppliedFilterData?culture=${this._AuthService.currentLanguage}`);
  }



  GetStatistics_ProjectArchived():Observable<any> {
    return this.http.get( `${this._AuthService.baseUrl}/api/Dashboard/v${this._AuthService.version}/Statistics/GetStatistics_ProjectArchived?culture=${this._AuthService.currentLanguage}` )
  }

  GetStatistics_ArchivedCorrectly():Observable<any> {
    return this.http.get( `${this._AuthService.baseUrl}/api/Dashboard/v${this._AuthService.version}/Statistics/GetStatistics_ProjectArchivedCorrectly?culture=${this._AuthService.currentLanguage}` )
  }

  GetStatistics_ArchivedInCorrectly():Observable<any> {
    return this.http.get( `${this._AuthService.baseUrl}/api/Dashboard/v${this._AuthService.version}/Statistics/GetStatistics_ProjectArchivedInCorrectly?culture=${this._AuthService.currentLanguage}` )
  }

  GetStatistics_ProjectNotLaunched():Observable<any> {
    return this.http.get( `${this._AuthService.baseUrl}/api/Dashboard/v${this._AuthService.version}/Statistics/GetStatistics_ProjectNotLaunched?culture=${this._AuthService.currentLanguage}` )
  }

  GetStatistics_ProjectByStatus():Observable<any> {
    return this.http.get( `${this._AuthService.baseUrl}/api/Dashboard/v${this._AuthService.version}/Statistics/GetStatistics_ProjectByStatus?culture=${this._AuthService.currentLanguage}` )
  }

  GetStatistics_ProjectByCategory():Observable<any> {
    return this.http.get( `${this._AuthService.baseUrl}/api/Dashboard/v${this._AuthService.version}/Statistics/GetStatistics_ProjectByCategory?culture=${this._AuthService.currentLanguage}` )
  }

  GetStatistics_ProjectByCategory_form(from:any, to:any):Observable<any> {
    return this.http.get( `${this._AuthService.baseUrl}/api/Dashboard/v${this._AuthService.version}/Statistics/GetStatistics_ProjectByCategory?from=${from}&to=${to}&culture=${this._AuthService.currentLanguage}` )
  }

  GetStatistics_ProjectTracking():Observable<any> {
    return this.http.get( `${this._AuthService.baseUrl}/api/Dashboard/v${this._AuthService.version}/Statistics/GetStatistics_ProjectTracking?culture=${this._AuthService.currentLanguage}` )
  }
}
