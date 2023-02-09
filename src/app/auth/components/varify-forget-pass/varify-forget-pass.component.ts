import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpUrlEncodingCodec } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
declare const $: any;
import Swal from 'sweetalert2';

@Component({
  selector: 'app-varify-forget-pass',
  templateUrl: './varify-forget-pass.component.html',
  styleUrls: ['./varify-forget-pass.component.scss'],
})
export class VarifyForgetPassComponent implements OnInit {
  numbers = new Array(4);
  code: any = '';
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

  varifyForgetPassForm: FormGroup = new FormGroup({
    code1: new FormControl(null, [Validators.required]),
    code2: new FormControl(null, [Validators.required]),
    code3: new FormControl(null, [Validators.required]),
    code4: new FormControl(null, [Validators.required]),
  });

  // function of varify forget pass form
  submitVarifyForgetPassForm(varifyForgetPassForm: FormGroup) {
    this.spinner.show();
    var finalToken = this.codec.encodeValue(this.C_Code);
    this.code = Number(
      `${varifyForgetPassForm.value.code1}${varifyForgetPassForm.value.code2}${varifyForgetPassForm.value.code3}${varifyForgetPassForm.value.code4}`
    );
    localStorage.setItem('varifyChangedPassCode', this.code);

    if (varifyForgetPassForm.invalid) {
      this.spinner.hide();
      return;
    } else {
      this._AuthService.varifyForgetPassword(this.code, finalToken).subscribe(
        (response) => {
          if (response.Code == 200) {
            this.spinner.hide();
            // if (this.currentLanguage == 'ar-sa') {
            //   this.toastr.success('كود التحقق صحيح.');
            // } else {
            //   this.toastr.success('The verification code is correct');
            // }
            this._Router.navigate(['/change-pass']);
          } else if (response.Code == 401) {
            this.spinner.hide();
            if (this.currentLanguage == 'ar-sa') {
              Swal.fire({
                title: 'خطأ !!',
                text: 'الرجاء كتابة الرمز بشكل صحيح والمحاولة مرة أخرى !!',
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
            //   this.toastr.error(
            //     'الرجاء كتابة الرمز بشكل صحيح والمحاولة مرة أخرى !!'
            //   );
            // } else {
            //   this.toastr.error(
            //     'please write the code correct and try again or send it again !!'
            //   );
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
            //   this.toastr.error(
            //     'الرجاء كتابة الرمز بشكل صحيح والمحاولة مرة أخرى أو إرساله مرة أخرى !!'
            //   );
            // } else {
            //   this.toastr.error(
            //     'please write the code correct and try again !!'
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
    this.varifyForgetPassForm.reset();
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
