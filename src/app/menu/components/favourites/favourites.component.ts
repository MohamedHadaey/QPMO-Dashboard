import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Options } from '@angular-slider/ngx-slider';
declare const $: any;

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {
    // price range inputs
  // section input
  sectionMinValue:any = 25;
  sectionMaxValue:any = 75;
  sectionOptions: Options = {
    floor: 0,
    ceil: 100,
  };
  // constructor input
  constructorMinValue:any = 30;
  constructorMaxValue:any = 60;
  constructorOptions: Options = {
    floor: 0,
    ceil: 100
  }
  /**************************/
  constructor(private _AuthService:AuthService) { }

  ngOnInit(): void {

  }


  filterForm: FormGroup = new FormGroup({
    project_type: new FormControl('1', [
      Validators.required,
      Validators.min(1),
      Validators.max(200),
     ]),
     now_check: new FormControl("checked", [
      Validators.required,
     ]),
     complete_check: new FormControl(false, [
      Validators.required,
     ]),

     late_check: new FormControl(false, [
      Validators.required,
     ]),

     end_check: new FormControl("checked", [
      Validators.required,
     ]),

     not_check: new FormControl(false, [
      Validators.required,
     ]),
     project_start: new FormControl(null, [
      Validators.required,
     ]),
     project_end: new FormControl(null, [
      Validators.required,
     ]),
     task_range: new FormControl(null, [
      Validators.required,
     ]),
     constructor_range: new FormControl(null, [
      Validators.required,
     ])


  });


  submitFilterForm(filterForm: FormGroup) {
   // console.log(filterForm.value)
  }

  // this function to log out
  logOut() {
    this._AuthService.logout();
  }

  showProjectCardDetails() {
    $(".project-card-details").slideToggle();
  }

    // this function to open day projects panel
    showDayProjects() {
      $(".day-projects").slideToggle();
      $(".project-card-details").slideUp();
    }
}
