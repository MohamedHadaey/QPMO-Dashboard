import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Options } from '@angular-slider/ngx-slider';
import { MenuService } from '../../services/menu.service';
import { ToastrService } from 'ngx-toastr';
declare const $: any;
import Swal from 'sweetalert2';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent implements OnInit {
  currentLanguage: any = localStorage.getItem('currentLanguage');
  favouriteProjects:any[] = [];
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
  constructor(private _AuthService: AuthService, private _MenuService:MenuService, private toastr: ToastrService) {}


  ngOnInit(): void {
    this.getFavProjects();
  }

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

  // this function to log out
  logOut() {
    this._AuthService.logout();
  }


  showProjectCardDetails(projectId:any) {
    this.getProjectDetails(projectId)
    $('.project-card-details').slideToggle();
  }

  // this function to open day projects panel
  showDayProjects() {
    $('.day-projects').slideToggle();
    $('.project-card-details').slideUp();
  }


  // fav Projects
  getFavProjects(){
    this._MenuService.getFavProjects_list().subscribe((response => {
      if(response.Code == 200) {
        this.favouriteProjects = response.data;
        console.log(this.favouriteProjects)
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



  projectDetails!:any;
  // function of get specific project
  getProjectDetails(id:any) {
    this._MenuService.getProjectDetails(id).subscribe((response => {
      if(response.Code == 200) {
        this.projectDetails = response.data;
        console.log(this.projectDetails)
      } else {
        if (this.currentLanguage == 'ar-sa') {
          Swal.fire({
            title: 'خطأ !!',
            text: response.Error_Resp,
            icon: 'error',
            confirmButtonText: 'موافق',
          })
        } else {
          Swal.fire({
            title: 'Error !!',
            text: response.Error_Resp,
            icon: 'error',
            confirmButtonText: 'OK',
          })
        }
      }
    }) ,(error) => {
      if (this.currentLanguage == 'ar-sa') {
        Swal.fire({
          title: 'خطأ !!',
          text: 'خطأ غير معروف من الخادم !!',
          icon: 'error',
          confirmButtonText: 'موافق',
        })
      } else {
        Swal.fire({
          title: 'Error !!',
          text: 'Unknown error From Server!!',
          icon: 'error',
          confirmButtonText: 'OK',
        })
      }
      // if (this.currentLanguage == "ar-sa") {
      //   this.toastr.error("خطأ غير معروف من الخادم !!")
      // }else {
      //   this.toastr.error("Unknown error From Server!!")
      // }
    })
  }

  removeProjectFromFav(id:any) {
    this._MenuService.removeFromFav(id).subscribe((response) => {
      if(response.Code == 200) {
        if (this.currentLanguage == 'ar-sa') {
          Swal.fire({
            title: 'نجاح !!',
            text: "تم حذف المشروع بنجاح",
            icon: 'success',
            confirmButtonText: 'موافق',
          })
        } else {
          Swal.fire({
            title: 'Success !!',
            text: "The project has been successfully deleted",
            icon: 'success',
            confirmButtonText: 'OK',
          })
        }
        this.getFavProjects();
        $('.project-card-details').slideUp();
      } else {
        if (this.currentLanguage == 'ar-sa') {
          Swal.fire({
            title: 'خطأ !!',
            text: response.Error_Resp,
            icon: 'error',
            confirmButtonText: 'موافق',
          })
        } else {
          Swal.fire({
            title: 'Error !!',
            text: response.Error_Resp,
            icon: 'error',
            confirmButtonText: 'OK',
          })
        }
      }
    }, (errorr) => {
      if (this.currentLanguage == 'ar-sa') {
        Swal.fire({
          title: 'خطأ !!',
          text: 'خطأ غير معروف من الخادم !!',
          icon: 'error',
          confirmButtonText: 'موافق',
        })
      } else {
        Swal.fire({
          title: 'Error !!',
          text: 'Unknown error From Server!!',
          icon: 'error',
          confirmButtonText: 'OK',
        })
      }
    })
  }
}
