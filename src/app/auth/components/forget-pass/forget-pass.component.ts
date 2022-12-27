import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
declare const $: any;

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.scss']
})
export class ForgetPassComponent implements OnInit {

  visible: boolean = true;
  changeType: boolean = true;
  constructor( private _AuthService: AuthService,
    private _Router: Router) {

    }
    forgetPassForm: FormGroup = new FormGroup({
      phone: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
    ])
  });



  submitForgetPassForm(forgetPassForm: FormGroup) {
    console.log(forgetPassForm.value)
    // if user delete [disabled]="registerForm.invalid" from html inspect
    if (forgetPassForm.invalid) {
      return;
    } else {
      this._Router.navigate(['/varify-changed-pass']);
    }
    this.forgetPassForm.reset();
  }

    //  to delete message of wrong inputs value
    deleteMsg() {
      $("#validate-msg").slideUp()
    }



  ngOnInit(): void {
  }


   // this function to show and hide password
   viewPassword() {
    this.visible = !this.visible;
    this.changeType = !this.changeType;
  }
}
