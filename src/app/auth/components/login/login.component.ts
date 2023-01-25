import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(private _AuthService: AuthService, private _Router: Router,private toastr: ToastrService) {}

  // login form validation
  loginForm: FormGroup = new FormGroup({
    Username: new FormControl(null, [
      Validators.required,
      Validators.min(5),
      Validators.max(20),
    ]),
    pass: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
    ]),
    checker: new FormControl(null, [
      Validators.required
    ]),
  });

  submitLoginForm(loginForm: FormGroup) {
    console.log(loginForm.value);
    // if user delete [disabled]="registerForm.invalid" from html inspect
    if (loginForm.invalid) {
      return;
    } else {
      if (
        loginForm.value.Username == 'admin' &&
        loginForm.value.pass == '12345'
      ) {
        this.toastr.success("Success");
        this._Router.navigate(['/varify-pass']);
      } else {
        this.toastr.error("Failed");
        $('#validate-msg').slideDown();
        setTimeout(this.deleteMsg, 4000);
      }
    }
    this.loginForm.reset();
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
