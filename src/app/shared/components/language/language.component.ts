import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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
    public _TranslationService: TranslationService
  ) {}

  ngOnInit(): void {}

  // get english language
  getEnglish() {
    this._TranslationService.currentLang('en');
    this.currentLanguage = 'en';
    if ($('.sidebar').css('width') == '220px') {
      $('.content-body').css('padding-right', '0');
      $('.content-body').css('padding-left', '220px');
    } else {
      $('.content-body').css('padding-right', '0');
      $('.content-body').css('padding-left', '55px');
    }
    $('.dropdown-menu').css('left', '-120px');
  }

  // get arabic language
  getArabic() {
    this._TranslationService.currentLang('ar');
    this.currentLanguage = 'ar';
    if ($('.sidebar').css('width') == '220px') {
      $('.content-body').css('padding-left', '0');
      $('.content-body').css('padding-right', '220px');
    } else {
      $('.content-body').css('padding-left', '0');
      $('.content-body').css('padding-right', '55px');
    }
    $('.dropdown-menu').css('left', '0');
  }
}
