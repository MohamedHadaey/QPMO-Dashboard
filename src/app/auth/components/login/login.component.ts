import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
declare const $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  visible: boolean = true;
  changeType: boolean = true;
  currentLanguage: any = localStorage.getItem('currentLanguage');
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {}

  // login form validation
  loginForm: FormGroup = new FormGroup({
    Username: new FormControl(null, [Validators.required]),
    pass: new FormControl(null, [Validators.required]),
    checker: new FormControl(null, []),
  });

  submitLoginForm(loginForm: FormGroup) {
    this.spinner.show();
    if (loginForm.invalid) {
      this.spinner.hide();
      return;
    } else {
      this._AuthService
        .signIn(this.loginForm.value.Username, this.loginForm.value.pass)
        .subscribe(
          (response) => {
            if (response.Code == 200) {
              this.spinner.hide();
              this._Router.navigate(['/varify-pass']);
              localStorage.setItem('C_Code', response.data.token);
              localStorage.setItem('UserID', response.data.UserID);
            } else if (response.Code == 204) {
              this.spinner.hide();
              if (this.currentLanguage == 'ar-sa') {
                this.toastr.error('اسم المستخدم / كلمة المرور غير صحيحة !!');
              } else {
                this.toastr.error('Your Username/ Password is incorrect !!');
              }
            } else if (response.Code == 404) {
              this.spinner.hide();
              if (this.currentLanguage == 'ar-sa') {
                this.toastr.error(
                  'خطأ في الخادم يمكنك المحاولة مرة أخرى لاحقًا !! !!'
                );
              } else {
                this.toastr.error('Server Error you can try again later !! !!');
              }
            } else {
              this.spinner.hide();
              $('#validate-msg').slideDown();
              setTimeout(this.deleteMsg, 4000);
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
    this.loginForm.reset();
  }

  //  to delete message of wrong inputs value
  deleteMsg() {
    $('#validate-msg').slideUp();
  }

  // this function to show and hide password
  viewPassword() {
    this.visible = !this.visible;
    this.changeType = !this.changeType;
  }
}
