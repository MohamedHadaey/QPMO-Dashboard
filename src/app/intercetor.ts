import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class MyIntercetor implements HttpInterceptor {
 intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

   let newReq = req.clone({
    headers : new HttpHeaders({
      "Accept" : "application/json",
      "lang" : `${localStorage.getItem("currentLanguage")}`,
      "access-key" : "accessKey9A3q9p6V0eKVizqYt9Su9KAMfORbccWrvoJVUCGPKqHBvEgvtJq",
      "Authorization" : `Bearer ${localStorage.getItem("token_api")}`

    })
   })
   return next.handle(newReq);

 }
}
