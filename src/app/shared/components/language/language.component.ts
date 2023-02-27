import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslationService } from 'src/app/sevices/translation.service';
declare const $: any;

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent implements OnInit {
  currentLanguage: any = localStorage.getItem('currentLanguage');
  constructor(
    public translate: TranslateService,
    public _TranslationService: TranslationService,
    private spinner: NgxSpinnerService

  ) {}

  ngOnInit(): void {
  }

  // get english language
  getEnglish() {
    this._TranslationService.currentLang('en-sa');
    this.currentLanguage = 'en-sa';
    if ($('.sidebar').css('width') == '220px') {
      $('.content-body').css('padding-right', '0');
      $('.content-body').css('padding-left', '220px');
    } else {
      $('.content-body').css('padding-right', '0');
      $('.content-body').css('padding-left', '55px');
    }
    $('.dropdown-menu').css('left', '-120px');
    window.location.reload();
  }

  // get arabic language
  getArabic() {
    this._TranslationService.currentLang('ar-sa');
    this.currentLanguage = 'ar-sa';
    if ($('.sidebar').css('width') == '220px') {
      $('.content-body').css('padding-left', '0');
      $('.content-body').css('padding-right', '220px');
    } else {
      $('.content-body').css('padding-left', '0');
      $('.content-body').css('padding-right', '55px');
    }
    $('.dropdown-menu').css('left', '0');
    window.location.reload();
  }

  // change map language
  changeMapLang() {
    setTimeout(() => {
      console.log("changeMapLang()");
    }, 2000);

  }
}
