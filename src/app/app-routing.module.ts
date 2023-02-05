import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './auth/components/change-password/change-password.component';
import { ForgetPassComponent } from './auth/components/forget-pass/forget-pass.component';
import { LoginComponent } from './auth/components/login/login.component';
import { VarifyForgetPassComponent } from './auth/components/varify-forget-pass/varify-forget-pass.component';
import { VarifyPassComponent } from './auth/components/varify-pass/varify-pass.component';
import { AuthGuard } from './auth/services/auth.guard';
import { CalenderComponent } from './menu/components/calender/calender.component';
import { FavouritesComponent } from './menu/components/favourites/favourites.component';
import { MainComponent } from './menu/components/main/main.component';
import { ProjectsComponent } from './menu/components/projects/projects.component';
import { ReportsComponent } from './menu/components/reports/reports.component';
import { LanguageComponent } from './shared/components/language/language.component';
import { ProjectDetailsComponent } from './shared/components/project-details/project-details.component';
import { MessagesComponent } from './user/components/messages/messages.component';
import { ProfileComponent } from './user/components/profile/profile.component';

const routes: Routes = [
  {path: "", redirectTo: "login", pathMatch: "full"},
  {path:"home", component: MainComponent , canActivate:[AuthGuard]},
  {path:"projects", component: ProjectsComponent , canActivate:[AuthGuard]},
  {path:"calender", component: CalenderComponent , canActivate:[AuthGuard]},
  {path:"favourites", component: FavouritesComponent, canActivate:[AuthGuard]},
  {path:"reports", component: ReportsComponent, canActivate:[AuthGuard]},
  {path:"login", component: LoginComponent},
  {path:"varify-pass", component: VarifyPassComponent},
  {path:"varify-forget-pass", component: VarifyForgetPassComponent},
  {path:"change-pass", component: ChangePasswordComponent},
  {path:"forget-pass", component: ForgetPassComponent},
  {path:"profile", component: ProfileComponent, canActivate:[AuthGuard]},
  {path:"messages", component: MessagesComponent, canActivate:[AuthGuard]},
  {path:"language", component: LanguageComponent},
  {path:"project-details", component: ProjectDetailsComponent},
  {path:"project", component: ProjectsComponent},
  {path:"**" , redirectTo: "home", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
