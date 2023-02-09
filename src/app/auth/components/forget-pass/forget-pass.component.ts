import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
declare const $: any;
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.scss'],
})
export class ForgetPassComponent implements OnInit {
  visible: boolean = true;
  changeType: boolean = true;
  currentLanguage: any = localStorage.getItem('currentLanguage');
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  phoneForm: FormGroup = new FormGroup({
    Phone: new FormControl('', [Validators.required]),
  });

  // function of enter user phone
  submitPhoneForm(phoneForm: FormGroup) {
    this.spinner.show();
    let userPhone = phoneForm.value.Phone;
    if (phoneForm.invalid) {
      this.spinner.hide();
      return;
    } else {
      this._AuthService.forgetPassword(phoneForm.get('Phone')?.value).subscribe(
        (response) => {
          if (response.Code == 200) {
            this.spinner.hide();
            localStorage.setItem('Phone', userPhone);
            localStorage.setItem('C_Code', response.data.token);
            localStorage.setItem('UserID', response.data.UserID);
            this._Router.navigate(['/varify-forget-pass']);
          } else if (response.Code == 204) {
            this.spinner.hide();
            if (this.currentLanguage == 'ar-sa') {
              Swal.fire({
                title: 'خطأ !!',
                text:'هذا الرقم غير موجود',
                icon: 'error',
                confirmButtonText: 'موافق',
              })
            } else {
              Swal.fire({
                title: 'Error !!',
                text: 'This number does not exist',
                icon: 'error',
                confirmButtonText: 'OK',
              })
            }
            // if (this.currentLanguage == 'ar-sa') {
            //   this.toastr.error('هذا الرقم غير موجود');
            // } else {
            //   this.toastr.error('This number does not exist');
            // }
          } else {
            this.spinner.hide();
            // this.toastr.error(response.Error_Resp);
            if (this.currentLanguage == 'ar-sa') {
              Swal.fire({
                title: 'خطأ !!',
                text: response.Error_Resp,
                icon: 'error',
                confirmButtonText: 'موافق',
              })
            } else {
              Swal.fire({
                title: 'Error !!',
                text: response.Error_Resp,
                icon: 'error',
                confirmButtonText: 'OK',
              })
            }

          }
        },
        (error) => {
          this.spinner.hide();
          if (this.currentLanguage == 'ar-sa') {
            Swal.fire({
              title: 'خطأ !!',
              text: 'خطأ غير معروف من الخادم !!',
              icon: 'error',
              confirmButtonText: 'موافق',
            })
          } else {
            Swal.fire({
              title: 'Error !!',
              text: 'Unknown error From Server!!',
              icon: 'error',
              confirmButtonText: 'OK',
            })
          }

          // if (this.currentLanguage == 'ar-sa') {
          //   this.toastr.error('خطأ غير معروف من الخادم !!');
          // } else {
          //   this.toastr.error('Unknown error From Server!!');
          // }
        }
      );
    }
    this.phoneForm.reset();
  }

  //  to delete message of wrong inputs value
  deleteMsg() {
    $('#validate-msg').slideUp();
  }

  ngOnInit(): void {}

  // this function to show and hide password
  viewPassword() {
    this.visible = !this.visible;
    this.changeType = !this.changeType;
  }
}
