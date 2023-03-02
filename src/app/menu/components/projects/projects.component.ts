import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Options } from '@angular-slider/ngx-slider';
import { ToastrService } from 'ngx-toastr';
import { MenuService } from '../../services/menu.service';
declare const $: any;
import Swal from 'sweetalert2';
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
    ProjectType: new FormControl(1 , [Validators.required]),
    ProjectStatus: new FormControl(1,[Validators.required]),
    // now_check: new FormControl('checked', [Validators.required]),
    // complete_check: new FormControl(false, [Validators.required]),

    // late_check: new FormControl(false, [Validators.required]),

    // end_check: new FormControl('checked', [Validators.required]),

    // not_check: new FormControl(false, [Validators.required]),
    StartDate: new FormControl(null),
    EndDate: new FormControl(null),
    UserPer: new FormControl(null),
    MaqawlPer: new FormControl(null),
  });

  submitFilterForm(filterForm: FormGroup) {
    // filterForm.value.UserPer = (filterForm.value.UserPer[1]-filterForm.value.UserPer[0]) ;
    // filterForm.value.MaqawlPer = (filterForm.value.MaqawlPer[1]-filterForm.value.MaqawlPer[0]) ;
    // console.log(filterForm.value.UserPer);
    // console.log(filterForm.value.MaqawlPer);

     filterForm.value.UserPer =  null ;
    filterForm.value.MaqawlPer = null ;
    filterForm.value.StartDate = null ;
    filterForm.value.EndDate = null ;
    filterForm.value.ProjectStatus =[];
    console.log(filterForm.value);
    // this._MenuService.filterProjects_table(filterForm.value).subscribe((response) => {
    //   console.log(response.data);
    //   this.followedProjects = response.data;
    //   console.log("12123132", response.data)
    // } , (error) => {
    //   console.log(error);
    // })
  }

  ngOnInit(): void {
    this.getProjectsFollowed();
    this.getProjectsTypes();
    this.getProjectsStates();
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
        console.log("followedProjectst", this.followedProjects);
        localStorage.setItem("followedProjects", JSON.stringify(this.followedProjects));
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
    })
  }


  // get projcts types
  projectsTypes:any[] = [];
  getProjectsTypes() {
    this._MenuService.getAllCategoties().subscribe((response => {
      if(response.Code == 200) {
        this.projectsTypes = response.data;
        console.log(this.projectsTypes)
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
      // if (this.currentLanguage == "ar-sa") {
      //   this.toastr.error("خطأ غير معروف من الخادم !!")
      // }else {
      //   this.toastr.error("Unknown error From Server!!")
      // }
    })
  }


    // get projcts states
    projectsStates:any[] = [];
    getProjectsStates() {
      this._MenuService.getAllStates().subscribe((response => {
        if(response.Code == 200) {
          this.projectsStates = response.data;
          console.log(this.projectsStates)
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
        // if (this.currentLanguage == "ar-sa") {
        //   this.toastr.error("خطأ غير معروف من الخادم !!")
        // }else {
        //   this.toastr.error("Unknown error From Server!!")
        // }
      })
    }

showProjectCardDetails(projectId:any) {
  this.getProjectDetails(projectId)
  $('.project-card-details').slideToggle();
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

closeDropdown() {
  $(".form-dropdown-menu").removeClass("show");
}

// function of search
search(x:any) {
  if (x.target.value == null || x.target.value == "" || x.target.value == " " ){
    this.followedProjects = JSON.parse(localStorage.getItem("followedProjects") || '{}');
  }else {
    this.followedProjects = JSON.parse(localStorage.getItem("followedProjects") || '{}');
    this.followedProjects = this.followedProjects.filter(project => project.ProjectDTO.Project_Name.toLowerCase().includes(x.target.value.toLowerCase()));
  }
}
}
