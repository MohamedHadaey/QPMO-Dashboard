import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
declare const $: any;

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.scss'],
})
export class ForgetPassComponent implements OnInit {
  visible: boolean = true;
  changeType: boolean = true;
  currentLanguage: any = localStorage.getItem('currentLanguage');
  constructor(private _AuthService: AuthService, private _Router: Router, private toastr: ToastrService) {}
  forgetPassForm: FormGroup = new FormGroup({
    Phone: new FormControl(null, [
      Validators.required,
    ]),
  });

  submitForgetPassForm(forgetPassForm: FormGroup) {
    console.log(forgetPassForm.value);
    // if user delete [disabled]="registerForm.invalid" from html inspect
    if (forgetPassForm.invalid) {
      return;
    } else {

      this._AuthService.forgetPassword(forgetPassForm.get('Phone')?.value).subscribe((response) => {
        if (response.Code == 200) {
          localStorage.setItem("userPhone" , forgetPassForm.get('Phone')?.value)
            this._Router.navigate(['/varify-changed-pass']);
        } else if(response.Code == 204) {
          if (this.currentLanguage == "ar-sa") {
            this.toastr.error("هذا الرقم غير موجود")
          } else {
            this.toastr.error("This number does not exist")
          }
        }
         else {
          this.toastr.error(response.Error_Resp)
         }
      }, (error) => {
        if (this.currentLanguage == "ar-sa") {
          this.toastr.error("هناك مشكلة ما فى السيرفر")
        }else {
          this.toastr.error("There is a problem with the server")
        }
      })


    }
    this.forgetPassForm.reset();
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
