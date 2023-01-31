import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class MyIntercetor implements HttpInterceptor {
 intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

   let newReq = req.clone({
    headers : new HttpHeaders({
      "culture" : `${localStorage.getItem("currentLanguage")}`,
      "Authorization" : `Bearer ${localStorage.getItem("C_Code")}`

    })
   })
   return next.handle(newReq);

 }
}
