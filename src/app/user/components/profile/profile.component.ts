import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare const $: any;
import { UserService } from '../../services/user.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { user } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  visiblePass: boolean = true;
  changeTypePass: boolean = true;
  visibleNewPass: boolean = true;
  changeTypeNewPass: boolean = true;
  visibleRePass: boolean = true;
  changeTypeRePass: boolean = true;

  User_Data: user = new user();
  currentLanguage: any = localStorage.getItem('currentLanguage');

  constructor(
    private _UserService: UserService,
    private _Router: Router,
    private _AuthService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this._UserService.GetInfo().subscribe(
      (res) => {
        if (res.Code == 200) {
          this.User_Data = res.data as user;
        }else {
          if (this.currentLanguage == 'ar-sa') {
            Swal.fire({
              title: 'خطأ !!',
              text: res.Error_Resp,
              icon: 'error',
              confirmButtonText: 'موافق',
            })
          } else {
            Swal.fire({
              title: 'Error !!',
              text: res.Error_Resp,
              icon: 'error',
              confirmButtonText: 'OK',
            })
          }
        }
      }, (error) => {
        // if (this.currentLanguage == "ar-sa") {
        //   this.toastr.error("خطأ غير معروف من الخادم !!")
        // }else {
        //   this.toastr.error("Unknown error From Server!!")
        // }

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
      }
    );
  }
  passwordForm: FormGroup = new FormGroup({
    password: new FormControl(null, [
      Validators.required
    ]),
    newPassword: new FormControl(null, [
      Validators.required
    ]),
    rePassword: new FormControl(null, [
      Validators.required
    ]),
  });

  submitPasswordForm(passwordForm: FormGroup) {
    if (passwordForm.invalid )  {
      return;
    } else if (passwordForm.get('newPassword')?.value != passwordForm.get('rePassword')?.value) {



      if (this.currentLanguage == 'ar-sa') {
        Swal.fire({
          title: 'خطأ !!',
          text: "كلمة المرور الجديدة وإعادة كلمة المرور الجديدة غير متطابقة",
          icon: 'error',
          confirmButtonText: 'موافق',
        })
      } else {
        Swal.fire({
          title: 'Error !!',
          text: "New password and re new password not identical",
          icon: 'error',
          confirmButtonText: 'OK',
        })
      }
      // if (this.currentLanguage == "ar-sa") {
      //   this.toastr.error("كلمة المرور الجديدة وإعادة كلمة المرور الجديدة غير متطابقة")
      // } else {
      //   this.toastr.error("New password and re new password not identical")
      // }
      this.passwordForm.reset();
    }
    else {
      if (
        passwordForm.get('newPassword')?.value ==
        passwordForm.get('rePassword')?.value
      )
        this._UserService
          .ChangePass(
            passwordForm.get('password')?.value,
            passwordForm.get('newPassword')?.value
          )
          .subscribe(
            (res) => {
              console.log(res)
              if (res.Code == 200) {
                this.passwordForm.reset();
                this._Router.navigate(['/profile']);



                if (this.currentLanguage == 'ar-sa') {
                  Swal.fire({
                    title: 'نجاح !!',
                    text: "تم تغيير كلمة السر بنجاح",
                    icon: 'success',
                    confirmButtonText: 'موافق',
                  })
                } else {
                  Swal.fire({
                    title: 'Success !!',
                    text: "Password changed successfully",
                    icon: 'success',
                    confirmButtonText: 'OK',
                  })
                }
                // if (this.currentLanguage == "ar-sa") {
                //   this.toastr.success("تم تغيير كلمة السر بنجاح")
                // } else {
                //   this.toastr.success("Password changed successfully")
                // }
              } else if (res.Code == 204) {
                if (this.currentLanguage == 'ar-sa') {
                  Swal.fire({
                    title: 'خطأ !!',
                    text: "كلمة المرور القديمة خطأ !!",
                    icon: 'error',
                    confirmButtonText: 'موافق',
                  })
                } else {
                  Swal.fire({
                    title: 'Error !!',
                    text: "The old password is wrong !!",
                    icon: 'error',
                    confirmButtonText: 'OK',
                  })
                }
              }
              else {
                if (this.currentLanguage == 'ar-sa') {
                  Swal.fire({
                    title: 'خطأ !!',
                    text: res.Error_Resp,
                    icon: 'error',
                    confirmButtonText: 'موافق',
                  })
                } else {
                  Swal.fire({
                    title: 'Error !!',
                    text: res.Error_Resp,
                    icon: 'error',
                    confirmButtonText: 'OK',
                  })
                }
              }
            }, (error) => {
              // if (this.currentLanguage == "ar-sa") {
              //   this.toastr.error("خطأ غير معروف من الخادم !!")
              // }else {
              //   this.toastr.error("Unknown error From Server!!")
              // }
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
            }
          );
    }
  }

  // this function to show and hide password
  viewPassword() {
    this.visiblePass = !this.visiblePass;
    this.changeTypePass = !this.changeTypePass;
  }
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

  // this function to log out
  logOut() {
    this._AuthService.logout();
  }
}
