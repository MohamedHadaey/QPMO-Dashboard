import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { HttpUrlEncodingCodec } from '@angular/common/http';
declare const $: any;
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  visiblePass: boolean = true;
  changeTypePass: boolean = true;
  visibleNewPass: boolean = true;
  changeTypeNewPass: boolean = true;
  visibleRePass: boolean = true;
  changeTypeRePass: boolean = true;
  codec = new HttpUrlEncodingCodec();
  C_Code: any = localStorage.getItem('C_Code');
  Phone: any = localStorage.getItem('Phone');
  code: number = Number(localStorage.getItem('varifyChangedPassCode'));
  currentLanguage: any = localStorage.getItem('currentLanguage');
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  changePassForm: FormGroup = new FormGroup({
    NewPass: new FormControl('', [Validators.required]),
    RePass: new FormControl('', [Validators.required]),
  });

  // change password function
  submitChangedPasswordForm(changePassForm: FormGroup) {
    var finalToken = this.codec.encodeValue(this.C_Code);
    this.spinner.show();
    if (changePassForm.invalid) {
      this.spinner.hide();
      return;
    } else if (
      changePassForm.get('NewPass')?.value !=
      changePassForm.get('RePass')?.value
    ) {
      this.spinner.hide();


      if (this.currentLanguage == 'ar-sa') {
        Swal.fire({
          title: 'خطأ !!',
          text: 'كلمة المرور الجديدة وإعادة كلمة المرور الجديدة غير متطابقة',
          icon: 'error',
          confirmButtonText: 'موافق',
        })
      } else {
        Swal.fire({
          title: 'Error !!',
          text: 'New password and re new password not identical',
          icon: 'error',
          confirmButtonText: 'OK',
        })
      }
      // if (this.currentLanguage == 'ar-sa') {
      //   this.toastr.error('كلمة المرور الجديدة وإعادة كلمة المرور الجديدة غير متطابقة');
      // } else {
      //   this.toastr.error('New password and re new password not identical');
      // }
      this.changePassForm.reset();
    } else {
      if (
        changePassForm.get('NewPass')?.value ==
        changePassForm.get('RePass')?.value
      ) {
        let NewPass = changePassForm.get('NewPass')?.value;
        this._AuthService
          .makeNewPassword(finalToken, this.Phone, this.code, NewPass)
          .subscribe(
            (response) => {
              if (response.Code == 200) {
                this.spinner.hide();

                const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
                })
              if (this.currentLanguage == 'ar-sa') {
                Toast.fire({
                  icon: 'success',
                  title: 'تم تغيير كلمة المرور '
                })

              } else {
                Toast.fire({
                  icon: 'success',
                  title: 'Password has been changed'
                })

              }
                // if (this.currentLanguage == 'ar-sa') {
                //   this.toastr.success('تم تغيير كلمة المرور ');
                // } else {
                //   this.toastr.success('Password has been changed');
                // }
                this._Router.navigate(['/login']);
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
    }
    this.changePassForm.reset();
  }

  //  to delete message of wrong inputs value
  deleteMsg() {
    $('#validate-msg').slideUp();
  }

  ngOnInit(): void {}

  // this function to show and hide new password
  viewNewPassword() {
    this.visibleNewPass = !this.visibleNewPass;
    this.changeTypeNewPass = !this.changeTypeNewPass;
  }
  // this function to show and hide re password
  viewRePassword() {
    this.visibleRePass = !this.visibleRePass;
    this.changeTypeRePass = !this.changeTypeRePass;
  }
}
