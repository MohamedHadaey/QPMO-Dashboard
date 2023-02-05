import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from '../../services/user.service';
declare const $: any;

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  messageDate: any;
  show: boolean = false;
  currentLanguage: any = localStorage.getItem('currentLanguage');
  messages: any[] = [];
  messageDetails: any = {};
  constructor(
    private _AuthService: AuthService,
    private _UserService: UserService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getMyInbox();
  }

  // this function to log out
  logOut() {
    this._AuthService.logout();
  }

  // show details of any message
  showDetails() {
    $('#message-details').fadeIn();
    $('#message-details').css('display', 'flex');
  }

  getMyInbox() {
    this.spinner.show();
    this._UserService.getInbox().subscribe(
      (response) => {
        if (response.Code == 200) {
          this.messages = response.data;
          this.spinner.hide();
        } else {
          this.spinner.hide();
          this.toastr.error(response.Error_Resp);
        }
      },
      (error) => {
        this.spinner.hide();
        if (this.currentLanguage == 'ar-sa') {
          this.toastr.error('خطأ غير معروف من الخادم !!');
        } else {
          this.toastr.error('Unknown error From Server!!');
        }
      }
    );
  }

  getMessageDetails(id: any) {
    // this.spinner.show();
    this._UserService.getMessage(id).subscribe(
      (response) => {
        if (response.Code == 200) {
          this.messageDetails = response.data[0];
          // this.spinner.hide();
        } else {
         // this.spinner.hide();
          this.toastr.error(response.Error_Resp);
        }
      },
      (error) => {
        // this.spinner.hide();
        if (this.currentLanguage == 'ar-sa') {
          this.toastr.error('خطأ غير معروف من الخادم !!');
        } else {
          this.toastr.error('Unknown error From Server!!');
        }
      }
    );
  }

  sendMessage() {
    var message = document.getElementById('message') as HTMLInputElement;
    if (message.value == '' || message.value == null || message.value == ' ') {
      if (this.currentLanguage == 'en-sa') {
        this.toastr.warning('Please type any thing !!');
      } else {
        this.toastr.warning('الرجاء إدخال الرسالة اولا !!');
      }
    } else {
      this.spinner.show();
      this._UserService
        .replyMesaage(
          this.messageDetails.ProjectId,
          this.messageDetails.ID,
          message?.value,
          this.messageDetails.Title
        )
        .subscribe(
          (response) => {
            if (response.Code == 200) {
              message.value = '';
              this.getMyInbox();
              this.spinner.hide();
              if (this.currentLanguage == 'en-sa') {
                this.toastr.success('Message sent successfully');
              } else {
                this.toastr.success('تم ارسال الرسالة بنجاح');
              }
            } else {
              this.spinner.hide();
              this.toastr.error(response.Error_Resp);
            }
          },
          (error) => {
            this.spinner.hide();
            if (this.currentLanguage == 'ar-sa') {
              this.toastr.error('خطأ غير معروف من الخادم !!');
            } else {
              this.toastr.error('Unknown error From Server!!');
            }
          }
        );
    }
  }
}
