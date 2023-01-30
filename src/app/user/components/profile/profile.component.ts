import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare const $: any;
import { UserService } from '../../services/user.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { user } from 'src/app/models/user';

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

  constructor(
    private _UserService: UserService,
    private _Router: Router,
    private _AuthService: AuthService
  ) {}

  ngOnInit() {
    this._UserService.GetInfo().subscribe(
      (res) => {
        if (res.Code == 200) {
          this.User_Data = res.data as user;
          // console.log(this.User_Data);
        }
      },
      (err) => {}
    );
  }
  passwordForm: FormGroup = new FormGroup({
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
    ]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
    ]),
    rePassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
    ]),
  });

  submitPasswordForm(passwordForm: FormGroup) {
    // console.log(passwordForm.value)
    // if user delete [disabled]="registerForm.invalid" from html inspect
    if (passwordForm.invalid) {
      return;
    } else {
      this._Router.navigate(['/profile']);
    }
    this.passwordForm.reset();
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
