import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import disableDevtool from 'disable-devtool';
import { TranslationService } from './sevices/translation.service';
declare var $: any;
declare var google: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'qdpm-dashboard';
  currentLanguage: any = 'ar-sa';
  constructor(
    public translate: TranslateService,
    private _TranslationService: TranslationService
  ) {

    if (localStorage.getItem('currentLanguage') != "ar-sa" && localStorage.getItem('currentLanguage') != "en-sa"){
      this.currentLanguage = "ar-sa"
    }else {
      this.currentLanguage = localStorage.getItem('currentLanguage') || 'ar-sa';
    }
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

    // localStorage.setItem('isLogin', 'true');
    // to disable inspect element, f12 button and developer tools
    // disableDevtool();
  }


  // async loadScript() {
  //   var oldScript = document.getElementById("agmGoogleMapsApiScript");
  //     if (oldScript !== null) {
  //       oldScript.parentNode?.removeChild(oldScript);
  //       delete google.maps;
  //     }

  //   var KEY = "AIzaSyAIcQUxj9rT_a3_5GhMp-i6xVqMrtasqws"
  //   var script = document.createElement('script');
  //   script.type = 'text/javascript';
  //   script.async = true;
  //   script.src = `https://maps.google.com/maps/api/js?key=${KEY}&language=en&callback=initMap&v=weekly`;
  //   script.id = "oldScript";
  //   document.body.appendChild(script);
  //   await new Promise(resolve => setTimeout(resolve, 1000));
  //   }

  ngOnInit():void {
    //this.loadScript();
  }
}
