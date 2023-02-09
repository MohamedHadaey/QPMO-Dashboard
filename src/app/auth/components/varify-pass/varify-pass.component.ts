import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
declare const $: any;
import { HttpUrlEncodingCodec } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-varify-pass',
  templateUrl: './varify-pass.component.html',
  styleUrls: ['./varify-pass.component.scss'],
})
export class VarifyPassComponent implements OnInit {
  numbers = new Array(4);
  code!: any;
  currentLanguage: any = localStorage.getItem('currentLanguage');
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}
  codec = new HttpUrlEncodingCodec();
  UserID: any = Number(localStorage.getItem('UserID'));
  C_Code: any = localStorage.getItem('C_Code');
  // varify form validation
  varifyForm: FormGroup = new FormGroup({
    code1: new FormControl(null, [Validators.required]),
    code2: new FormControl(null, [Validators.required]),
    code3: new FormControl(null, [Validators.required]),
    code4: new FormControl(null, [Validators.required]),
  });

  // function of varify password after login
  submitVarifyForm(varifyForm: FormGroup) {
    this.spinner.show();
    var finalToken = this.codec.encodeValue(this.C_Code);
    this.code = Number(
      `${varifyForm.value.code1}${varifyForm.value.code2}${varifyForm.value.code3}${varifyForm.value.code4}`
    );

    if (varifyForm.invalid) {
      this.spinner.hide();
      return;
    } else {
      this._AuthService
        .varifyPass(this.UserID, this.code, finalToken)
        .subscribe(
          (response) => {
            if (response.Code == 200) {
              this.spinner.hide();
              localStorage.setItem('isLogin', 'true');
              this._Router.navigate(['/home']);
              localStorage.setItem('C_Code', response.data);
            } else if (response.Code == 401) {
              this.spinner.hide();
              if (this.currentLanguage == 'ar-sa') {
                Swal.fire({
                  title: 'خطأ !!',
                  text: 'انتهت صلاحية الرمز المميز !!',
                  icon: 'error',
                  confirmButtonText: 'موافق',
                })
              } else {
                Swal.fire({
                  title: 'Error !!',
                  text: 'Token is Expire !!',
                  icon: 'error',
                  confirmButtonText: 'OK',
                })
              }
              // if (this.currentLanguage == 'ar-sa') {
              //   this.toastr.error('انتهت صلاحية الرمز المميز !!');
              // } else {
              //   this.toastr.error('Token is Expire !!');
              // }
            } else if (response.Code == 403) {
              this.spinner.hide();
              if (this.currentLanguage == 'ar-sa') {
                Swal.fire({
                  title: 'خطأ !!',
                  text: 'الرجاء كتابة الرمز بشكل صحيح والمحاولة مرة أخرى أو إرساله مرة أخرى !!',
                  icon: 'error',
                  confirmButtonText: 'موافق',
                })
              } else {
                Swal.fire({
                  title: 'Error !!',
                  text: 'please write the code correct and try again or send it again !!',
                  icon: 'error',
                  confirmButtonText: 'OK',
                })
              }
              // if (this.currentLanguage == 'ar-sa') {
              //   this.toastr.error('الرجاء كتابة الرمز بشكل صحيح والمحاولة مرة أخرى أو إرساله مرة أخرى !!');
              // } else {
              //   this.toastr.error(
              //     'please write the code correct and try again or send it again !!'
              //   );
              // }
            } else {
              this.spinner.hide();
              $('#validate-msg').slideDown();
              setTimeout(this.deleteMsg, 4000);
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
    this.varifyForm.reset();
  }

  //  to delete message of wrong inputs value
  deleteMsg() {
    $('#validate-msg').slideUp();
  }

  // this is the best method to handle the code inputs in angular
  move(e: any, p: any, c: any, n: any) {
    var length = c.value.length;
    var maxlength = c.getAttribute('maxlength');
    if (length == maxlength) {
      if (n != '') {
        n.focus();
      }
    }
    if (e.key == 'Backspace') {
      if (p != '') {
        p.focus();
      }
    }
  }
}
