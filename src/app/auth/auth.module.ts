import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { VarifyPassComponent } from './components/varify-pass/varify-pass.component';
import { ForgetPassComponent } from './components/forget-pass/forget-pass.component';
import { RouterModule } from '@angular/router';
import {  ReactiveFormsModule } from '@angular/forms';
import { VarifyChangedPassComponent } from './components/varify-changed-pass/varify-changed-pass.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    LoginComponent,
    VarifyPassComponent,
    ForgetPassComponent,
    VarifyChangedPassComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  exports: [
    LoginComponent,
    VarifyPassComponent,
    ForgetPassComponent
  ]
})
export class AuthModule { }
