import { Component, OnInit } from '@angular/core';
declare const $: any;


@Component({
  selector: 'app-toggler',
  templateUrl: './toggler.component.html',
  styleUrls: ['./toggler.component.scss']
})
export class TogglerComponent implements OnInit {

  currentLanguage: any = localStorage.getItem("currentLanguage");
    // for responsive toggle sidebar
    toggle() {
      const currentLanguage = localStorage.getItem("currentLanguage");
      if(currentLanguage == "ar"){
        if ($('.sidebar').css('width') == '220px') {
          $('.sidebar').css('width', '55px');
          $('.sidebar li span').fadeOut(0);
          $('.content-body').css('padding-right', '55px');
        } else {
          $('.sidebar').css('width', '220px');
          $('.content-body').css('padding-right', '220px');
          $('.sidebar li span').fadeIn(1500);
        }
      }else{
        if ($('.sidebar').css('width') == '220px') {
          $('.sidebar').css('width', '55px');
          $('.sidebar li span').fadeOut(0);
          $('.content-body').css('padding-left', '55px');
          $('.content-body').css('padding-right', '0');
        } else {
          $('.sidebar').css('width', '220px');
          $('.content-body').css('padding-left', '220px');
          $('.content-body').css('padding-right', '0');
          $('.sidebar li span').fadeIn(1500);
        }
      }

    }

    click() {
      $("body").css("overflow","auto");
      $("body").css("padding-right","0px");
    }

    ngOnInit(): void {
      // for check directions after any refresh
      if(this.currentLanguage == "ar"){
        $(".content-body").removeClass("content-body-ltr")
        $(".content-body").addClass("content-body-rtl");
        $(".dropdown-menu").css("left","0")
      }else{
        $(".content-body").removeClass("content-body-rtl")
        $(".content-body").addClass("content-body-ltr");
        $(".dropdown-menu").css("left","-120px")

      }
    }
}
