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
        Authorization: 'Bearer ' + localStorage.getItem('C_Code'),
      }),
    };
    return this.http.post<GlobalReceivier>(
      `${this.baseUrl}/api/Dashboard/v${this.version}/Auth/GetMyInfo?culture=${this.currentLanguage}`,
      null,
      httpOp
    );
  }
  ChangePass(
    currentpass: string,
    newpass: string
  ): Observable<GlobalReceivier> {
    let httpOp = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('tok'),
      }),
    };
    return this.http.post<GlobalReceivier>(
      `${this.baseUrl}/api/Dashboard/v${this.version}/Auth/ChangePassword?OldPass=${currentpass}&NewPass=${newpass}&culture=${this.currentLanguage}`,
      null,
      httpOp
    );
  }

  getInbox():Observable<any> {
    return this.http.get(`${this.baseUrl}/api/Dashboard/v${this.version}/Messages/MyInbox?culture=${this.currentLanguage}`)
  }

  getMessage(id:any):Observable<any> {
    return this.http.get(`${this.baseUrl}/api/Dashboard/v${this.version}/Messages/GetMessageAndReplays?MessageId=${id}&culture=${this.currentLanguage}`)
  }

  replyMesaage(projectID:any,Messageid:any,Message:any,Title:any):Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Dashboard/v${this.version}/Messages/ReplyToMessage?projectID=${projectID}&Messageid=${Messageid}&Message=${Message}&Title=${Title}&culture=${this.currentLanguage}` , null)
  }


  
}
