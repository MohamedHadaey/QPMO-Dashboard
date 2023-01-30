import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
declare const $: any;
import { HttpUrlEncodingCodec } from '@angular/common/http';


@Component({
  selector: 'app-varify-pass',
  templateUrl: './varify-pass.component.html',
  styleUrls: ['./varify-pass.component.scss'],
})
export class VarifyPassComponent implements OnInit {
  numbers = new Array(4);
  code!: any;
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  ngOnInit(): void {}
  codec = new HttpUrlEncodingCodec;
  UserID:any = Number(localStorage.getItem("UserID"));
  C_Code:any = localStorage.getItem("C_Code")
  // varify form validation
  varifyForm: FormGroup = new FormGroup({
    code1: new FormControl(null, [Validators.required]),
    code2: new FormControl(null, [Validators.required]),
    code3: new FormControl(null, [Validators.required]),
    code4: new FormControl(null, [Validators.required]),
  });

  submitVarifyForm(varifyForm: FormGroup) {
    var finalToken = this.codec.encodeValue(this.C_Code);
    this.code = Number(
      `${varifyForm.value.code1}${varifyForm.value.code2}${varifyForm.value.code3}${varifyForm.value.code4}`
    );

    if (varifyForm.invalid) {
      return;
    } else {
      this._AuthService.varifyPass(this.UserID, this.code ,finalToken).subscribe((response) => {
        if(response.Code == 200 ) {
          localStorage.setItem("isLogin", "true")
          this._Router.navigate(['/home']);
          localStorage.setItem('C_Code', response.data);
        }
        else {
          $('#validate-msg').slideDown();
          setTimeout(this.deleteMsg, 4000);
        }
      })
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
