import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  lang = new BehaviorSubject<string>('ar');
  currentlang = this.lang.asObservable();
  constructor(public translate: TranslateService) {}
  // this service has been specially created for making website with more than one language
  currentLang(langService: any) {
    this.lang.next(langService);
    this.translate.use(langService);
    localStorage.setItem('currentLanguage', langService);
  }
}
