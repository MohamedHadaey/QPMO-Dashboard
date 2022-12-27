import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
declare const $: any;

@Component({
  selector: 'app-varify-changed-pass',
  templateUrl: './varify-changed-pass.component.html',
  styleUrls: ['./varify-changed-pass.component.scss']
})
export class VarifyChangedPassComponent implements OnInit {

  // visible: boolean = true;
  // changeType: boolean = true;
  numbers = new Array(4);
  code: any = '';
  // data: any = { phone: this._AuthService.phoneChangePass, code: 2 };
  constructor( private _AuthService: AuthService,
    private _Router: Router) {

    }

  ngOnInit(): void {
  }


  varifyForm: FormGroup = new FormGroup({
    code1: new FormControl(null, [Validators.required]),
    code2: new FormControl(null, [Validators.required]),
    code3: new FormControl(null, [Validators.required]),
    code4: new FormControl(null, [Validators.required]),
  });

  submitVarifyForm(varifyForm: FormGroup) {
    this.code = Number(
      `${varifyForm.value.code1}${varifyForm.value.code2}${varifyForm.value.code3}${varifyForm.value.code4}`
    );


    if (varifyForm.invalid) {
      return;
    } else {
      if(this.code == 1111) {
        this._Router.navigate(['/change-pass']);
      }else{
        $("#validate-msg").slideDown();
        setTimeout( this.deleteMsg , 4000)
      }
    }


    console.log(this.code)

    this.varifyForm.reset();
  }


    //  to delete message of wrong inputs value
    deleteMsg() {
      $("#validate-msg").slideUp()
    }


  // varify(code: any) {
  //   this.data.code = code;
  // }

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
