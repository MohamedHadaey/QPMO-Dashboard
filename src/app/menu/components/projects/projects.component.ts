import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Options } from '@angular-slider/ngx-slider';
import { ToastrService } from 'ngx-toastr';
import { MenuService } from '../../services/menu.service';
declare const $: any;

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  currentLanguage: any = localStorage.getItem('currentLanguage');
  // price range inputs
  // section input
  sectionMinValue: any = 25;
  sectionMaxValue: any = 75;
  sectionOptions: Options = {
    floor: 0,
    ceil: 100,
  };
  // constructor input
  constructorMinValue: any = 30;
  constructorMaxValue: any = 60;
  constructorOptions: Options = {
    floor: 0,
    ceil: 100,
  };
  /**************************/
  map: boolean = true;
  list: boolean = true;
  card: boolean = true;
  showen: string = 'maps';

  constructor(private _AuthService: AuthService, private _MenuService:MenuService, private toastr: ToastrService) {}

  filterForm: FormGroup = new FormGroup({
    project_type: new FormControl('1', [
      Validators.required,
      Validators.min(1),
      Validators.max(200),
    ]),
    now_check: new FormControl('checked', [Validators.required]),
    complete_check: new FormControl(false, [Validators.required]),

    late_check: new FormControl(false, [Validators.required]),

    end_check: new FormControl('checked', [Validators.required]),

    not_check: new FormControl(false, [Validators.required]),
    project_start: new FormControl(null, [Validators.required]),
    project_end: new FormControl(null, [Validators.required]),
    task_range: new FormControl(null, [Validators.required]),
    constructor_range: new FormControl(null, [Validators.required]),
  });

  submitFilterForm(filterForm: FormGroup) {
    // console.log(filterForm.value)
  }

  ngOnInit(): void {
    this.getProjectsFollowed()
  }

  // this function to log out
  logOut() {
    this._AuthService.logout();
  }

  followedProjects:any[] = []
   // Projects that follow
   getProjectsFollowed(){
    this._MenuService.getFollowProjects().subscribe((response => {
      if(response.Code == 200) {
        this.followedProjects = response.data;
        console.log(this.followedProjects);
      } else {
        this.toastr.error(response.Error_Resp)
      }
    }) ,(error) => {
      if (this.currentLanguage == "ar-sa") {
        this.toastr.error("خطأ غير معروف من الخادم !!")
      }else {
        this.toastr.error("Unknown error From Server!!")
      }
    })
  }



}
