import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
declare const $: any;

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
  visible: boolean = true;
  changeType: boolean = true;
  C_Code:any = localStorage.getItem("C_Code");
  Phone:any = localStorage.getItem("userPhone");
  varifyCode:any = localStorage.getItem("varifyCode")
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  changePassForm: FormGroup = new FormGroup({
    newPassword: new FormControl(null, [
      Validators.required,
    ]),
    rePassword: new FormControl(null, [
      Validators.required,
    ]),
  });

  submitChangedPasswordForm(changePassForm: FormGroup) {
    if (changePassForm.invalid) {
      return;
    } else {
      if (changePassForm.get('newPassword')?.value == changePassForm.get('rePassword')?.value) {
        this._AuthService.makeNewPassword(this.C_Code,this.Phone ,this.varifyCode , changePassForm.get('newPassword')?.value)
        //this._Router.navigate(['/login']);
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
