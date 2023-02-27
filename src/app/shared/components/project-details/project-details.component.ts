import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Data } from '@angular/router';
import { EventColor } from 'calendar-utils';
import { MenuService } from 'src/app/menu/services/menu.service';
import Swal from 'sweetalert2';

// import swiper components
// import Swiper core and required modules
import SwiperCore, {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from 'swiper';
import { SharedService } from '../../services/shared.service';

// install Swiper modules
SwiperCore.use([Autoplay, Navigation, Pagination, Scrollbar]);
declare const $: any;
import { Options , ChangeContext} from '@angular-slider/ngx-slider';
@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectDetailsComponent implements OnInit {
  minimize: boolean = true;
  fav: boolean = false;
  @Input() data:Data = {};
  currentLanguage: any = localStorage.getItem('currentLanguage');
  constructor(private _MenuService:MenuService, private _SharedService:SharedService) {

  }

  ngOnInit(): void {

    this.getProjectDetails(3);
    this.getProjectProcesses();
  }

  // this function to close day projects panel
  closeDayProjects() {
    $('.day-projects').slideUp();
  }

  // this function to open project card details panel
  showProjectCardDetails() {
    $('.project-card-details').slideToggle();
  }

  // this function to close project card details panel
  closeProjectCardDetails() {
    $('.project-card-details').slideToggle();
  }

  // this function to show project process panel
  showProjectProcess() {
    $('.project-process').slideToggle();
    this.minimize = !this.minimize;
  }

  favProject() {
    this.fav = !this.fav;
  }

  // request to update images
  updateImages() {
    $('.update-popups').show();
  }

  // close update images popup
  closeUpdateImagesPopup() {
    $('.update-popups').hide();
  }



  projectDetails = {
    ID: 1,
    RemainingDays: 1,
    Project_Name: "",
    Project_ContractCode: '',
    Project_Location: '',
    Project_ProjectPeriod: 1,
    Project_ManPower: 1,
    Project_EndDate: 1,
    Project_User: {},
    Project_Maqawl: {
      Maqawl_Id: 1,
      Maqawl_Name: '',
      Maqawl_TaxRecord: '',
      Maqawl_Phone: '',
      Maqawl_UserName: '',
      Maqawl_PasswordChanged: true,
      Maqawl_CompanyId: 1,
      Maqawl_Enabled: true,
    },
    Project_Category: {
      ProjectCat_Id: 1,
      ProjectCat_Name: '',
      ProjectCat_Enabled: true,
    },
    Project_Status: {
      Status_Id: 1,
      Status_Name: '',
      Status_ColorImagePath: '',
      Status_Enabled: true,
      Status_Desc: '',
    },
    Project_User_Percentage: 1,
    Project_Maqawl_Percentage: 1,
    StartDate: "",
    AddedDate: "",
    LaunchedDate: "",
    IsFav: true,
    Project_Images: [],
  }
  // function of get specific project
  getProjectDetails(id:any) {
    this._MenuService.getProjectDetails(id).subscribe((response => {
      if(response.Code == 200) {
        this.projectDetails = response.data;
        console.log("projectDetails:" ,this.projectDetails)
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

  projectProcesses:any[] = [];
  // get project actions or project processes
  getProjectProcesses() {
    this._SharedService.getProjectActions().subscribe((response) => {
      if (response.Code == 200) {
        this.projectProcesses = response.data;
        console.log("projectProcesses: " , this.projectProcesses)
      }else {
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
    }, (error) => {
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

    // change completion rate of project
    completionRateOptions: Options = {
      floor: 0,
      ceil: 100,
      showSelectionBar: true,
      getSelectionBarColor: (value: number): string => {

        if (value <= 30) {
            return 'red';
        }
        if (value <= 60) {
            return 'orange';
        }
        if (value <= 90) {
            return 'yellow';
        }
        return '#2AE02A';
      }
    };

    finalRangeValue:any;
    onUserChange(changeContext: ChangeContext): void {
     this.finalRangeValue = changeContext.value
    }

    changeCompletionRange(project_id:any) {
      this._SharedService.updateProjectPercentage(project_id, this.finalRangeValue).subscribe((response) => {
        if(response.Code == 200) {
          if (this.currentLanguage == 'ar-sa') {
            Swal.fire({
              title: 'نجاح !!',
              text: "تم تحديث نسبة انجاز المشروع",
              icon: 'success',
              confirmButtonText: 'موافق',
            })
          } else {
            Swal.fire({
              title: 'Success !!',
              text: "The percentage of completion of the project has been updated",
              icon: 'success',
              confirmButtonText: 'OK',
            })
          };
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

      }, (error) => {
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
