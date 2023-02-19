import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private _AuthService : AuthService, private http: HttpClient) { }

  // function to get project details
  getProjectDetails(id:any):Observable<any> {
    return this.http.get( `${this._AuthService.baseUrl}/api/Dashboard/v${this._AuthService.version}/Projects/GetProjectDetails?ProjectID=${id}&culture=${this._AuthService.currentLanguage}`)
  }

  // function to update project percentage
  updateProjectPercentage(project_id:any, percentage_value:any):Observable<any> {
    return this.http.get( `${this._AuthService.baseUrl}/api/Dashboard/v${this._AuthService.version}/Projects/UpdateProjectPercentage?ProjectID=${project_id}&Percentage=${percentage_value}&culture=${this._AuthService.currentLanguage}`)
  }

  // function to get project actions or project processes
  getProjectActions():Observable<any> {
    return this.http.get(`${this._AuthService.baseUrl}/api/Dashboard/v${this._AuthService.version}/ProjectAction/GetProjectAction?culture=${this._AuthService.currentLanguage}`)
  }
}
