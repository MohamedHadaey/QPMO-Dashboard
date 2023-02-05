import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { VarifyPassComponent } from './components/varify-pass/varify-pass.component';
import { ForgetPassComponent } from './components/forget-pass/forget-pass.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VarifyForgetPassComponent } from './components/varify-forget-pass/varify-forget-pass.component';

@NgModule({
  declarations: [
    LoginComponent,
    VarifyPassComponent,
    ForgetPassComponent,
    ChangePasswordComponent,
    VarifyForgetPassComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true,
      closeButton: true,
    }),
  ],
  exports: [LoginComponent, VarifyPassComponent, ForgetPassComponent],
})
export class AuthModule {}
