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
  ngOnInit(): void {
  }

  // login form validation
  loginForm: FormGroup = new FormGroup({
    Username: new FormControl(null, [
      Validators.required,
    ]),
    pass: new FormControl(null, [
      Validators.required,
    ]),
    checker: new FormControl(null, [

    ]),
  });



  submitLoginForm(loginForm: FormGroup) {
    if (loginForm.invalid) {
      return;
    } else {
      this._AuthService.signIn(this.loginForm.value.Username, this.loginForm.value.pass ).subscribe((response) => {
        if(response.Code == 200 ) {
          this._Router.navigate(['/varify-pass']);
          localStorage.setItem('C_Code', response.data.token);
          localStorage.setItem('UserID', response.data.UserID);
        }
        else {
          $('#validate-msg').slideDown();
          setTimeout(this.deleteMsg, 4000);
        }
      })
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
