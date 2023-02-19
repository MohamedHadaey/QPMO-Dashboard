import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import disableDevtool from 'disable-devtool';
import { TranslationService } from './sevices/translation.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'qdpm-dashboard';
  currentLanguage: any = 'ar-sa';
  constructor(
    public translate: TranslateService,
    private _TranslationService: TranslationService,
    
  ) {
    this.currentLanguage = localStorage.getItem('currentLanguage') || 'ar-sa';
    this.translate.use(this.currentLanguage);
    this._TranslationService.currentLang(this.currentLanguage);
    const body = document.getElementsByTagName('body');
    this._TranslationService.currentlang.subscribe((lang) => {
      // this if condition to check direction of all project according to current language
      if (lang == 'ar-sa') {
        body[0].setAttribute('dir', 'rtl');
      } else {
        body[0].setAttribute('dir', 'ltr');
      }
    });

    // to disable inspect element, f12 button and developer tools
    disableDevtool();
  }
}
