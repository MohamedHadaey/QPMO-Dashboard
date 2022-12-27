import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
declare const $: any;

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  messageDate:any;
  show:boolean= false;
  constructor(private _AuthService:AuthService) { }

  ngOnInit(): void {


  }

  // this function to log out
  logOut() {
    this._AuthService.logout();
  }

  // show details of any message
  showDetails() {
    $("#message-details").fadeIn()
    $("#message-details").css("display" , "flex");
    // $(".list ul li").css("background-color" , "#F3F5FD")
  }

  // show full message
  showFullMsg() {
    if($(".message-height").css("height") == "94px"){
      $(".message-height").css({"height": "auto"});
    }else{
      $(".message-height").css({"height": "94px"});
    }

  }
}
