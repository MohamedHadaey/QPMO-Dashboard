import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Data } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventColor } from 'calendar-utils';
import { ToastrService } from 'ngx-toastr';
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
import Swal from 'sweetalert2';
import { MenuService } from 'src/app/menu/services/menu.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectComponent implements OnInit {

  // @Input() data:any = {};
  @Input() data:Data = {};

  minimize: boolean = true;
  fav: boolean = false;
  currentLanguage: any = localStorage.getItem('currentLanguage');

    constructor(private _SharedService:SharedService, private toastr: ToastrService,private _MenuService: MenuService, private spinner: NgxSpinnerService) {

    console.log(" data on constructor  " , this.data)
  }

  ngOnInit(): void {
    this.data ={
      ID:0,
      Project_Category:{},
      Project_EndDate:0,
      Project_Images:[],
      Project_Location:"",
      Project_ManPower:0,
      Project_Maqawl: {
        Maqawl_Name:""
      },
      Project_Maqawl_Percentage: 0,
      Project_Name: "",
      Project_ProjectPeriod: 0,
      Project_Status: {},
      Project_User:{},
      Project_User_Percentage:0
    };
    console.log(" followed projects in on ngOnInit  " , this.data);
    this.getProjectProcesses();

  }

  // this function to close day projects panel
  closeDayProjects() {
    $('.day-project').slideToggle();
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
  };

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



  requestDeliveryAlert!:string;
  processDetail = {
    ProjectAction_CheckMaqawlDefault:false,
    ProjectAction_CheckUserDefault: false,
    ProjectAction_Desc: "0",
    ProjectAction_DescEn: "0",
    ProjectAction_Enabled: true,
    ProjectAction_IconPath: "0",
    ProjectAction_Id: 2,
    ProjectAction_IsMainFunction: false,
    ProjectAction_Name: "اشعار بالعمالة اللازمة للمشروع",
    ProjectAction_ProgDesc: "0"
  }
  showProcessFormAlert(val:any) {
    console.log(val);
    this.processDetail=val;
    // this.spinner.show();
    $('#dynamicModal').modal('show');
  }

  excuteProjectAction() {


  }

  project_id:number = 3
  sendProjectId(id:number) {
    this.project_id = id
  }


     // alert form validation
     alertForm: FormGroup = new FormGroup({
      alert_mqawl: new FormControl(false, []),
    });


    submitAlertForm(alertForm: FormGroup) {
      this.spinner.show();
      if (alertForm.invalid) {
        this.spinner.hide();
        return;
      } else {
        console.log(alertForm.value.alert_mqawl);
        console.log("excute");
        $('#dynamicModal').modal('hide');
        this.spinner.hide();


        this._SharedService.excuteProjectActions(this.processDetail.ProjectAction_Id, this.project_id, alertForm.value.alert_mqawl ).subscribe((response) => {
          console.log("meqawel alert respnse", response);
          if(response.Code == 200) {
            if (this.currentLanguage == 'ar-sa') {
              Swal.fire({
                title: 'نجاح !!',
                text: 'تم ارسال الإشعار بنجاح',
                icon: 'success',
                confirmButtonText: 'موافق',
              })
            } else {
              Swal.fire({
                title: 'Success !!',
                text: 'Notification sent successfully',
                icon: 'success',
                confirmButtonText: 'OK',
              })
            }

            this.alertForm.reset();
          }
        }, (error) => {
          console.log(error)
        })
      }
    }
    //********         add to fav       ************/
    addProjectToFav(id: any) {
      this._MenuService.addToFav(id).subscribe(
        (response) => {
          if (response.Code == 200) {
            $(".unfav-icon-project-details").addClass("d-none");
            $(".unfav-icon-project-details").removeClass("d-inline-block");
            $(".fav-icon-project-details").addClass("d-inline-block");
            $(".fav-icon-project-details").removeClass("d-none");

            if (this.currentLanguage == 'ar-sa') {
              Swal.fire({
                title: 'نجاح !!',
                text: 'تم إضافة المشروع بنجاح',
                icon: 'success',
                confirmButtonText: 'موافق',
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
            } else {
              Swal.fire({
                title: 'Success !!',
                text: 'The project has been successfully added',
                icon: 'success',
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
            }

            // this.getListsProjects();
            // this.getMapProjects();
            // this.getCardsProjects();
            // this.getFavProjects_lists();
            // this.getFavProjects_cards();
          } else {
            if (this.currentLanguage == 'ar-sa') {
              Swal.fire({
                title: 'خطأ !!',
                text: response.Error_Resp,
                icon: 'error',
                confirmButtonText: 'موافق',
              });
            } else {
              Swal.fire({
                title: 'Error !!',
                text: response.Error_Resp,
                icon: 'error',
                confirmButtonText: 'OK',
              });
            }
          }
        },
        (errorr) => {
          if (this.currentLanguage == 'ar-sa') {
            Swal.fire({
              title: 'خطأ !!',
              text: 'خطأ غير معروف من الخادم !!',
              icon: 'error',
              confirmButtonText: 'موافق',
            });
          } else {
            Swal.fire({
              title: 'Error !!',
              text: 'Unknown error From Server!!',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
        }
      );
    }

    //********         remove from fav         ************/

    removeProjectFromFav(id: any) {
      this._MenuService.removeFromFav(id).subscribe(
        (response) => {
          if (response.Code == 200) {
            $(".fav-icon-project-details").addClass("d-none");
            $(".fav-icon-project-details").removeClass("d-inline-block");
            $(".unfav-icon-project-details").addClass("d-inline-block");
            $(".unfav-icon-project-details").removeClass("d-none");
            if (this.currentLanguage == 'ar-sa') {
              Swal.fire({
                title: 'نجاح !!',
                text: 'تم حذف المشروع بنجاح',
                icon: 'success',
                confirmButtonText: 'موافق',
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
            } else {
              Swal.fire({
                title: 'Success !!',
                text: 'The project has been successfully deleted',
                icon: 'success',
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
            }


            // this.getListsProjects();
            // this.getMapProjects();
            // this.getCardsProjects();
            // this.getFavProjects_lists();
            // this.getFavProjects_cards();
          } else {
            if (this.currentLanguage == 'ar-sa') {
              Swal.fire({
                title: 'خطأ !!',
                text: response.Error_Resp,
                icon: 'error',
                confirmButtonText: 'موافق',
              });
            } else {
              Swal.fire({
                title: 'Error !!',
                text: response.Error_Resp,
                icon: 'error',
                confirmButtonText: 'OK',
              });
            }
          }
        },
        (errorr) => {
          if (this.currentLanguage == 'ar-sa') {
            Swal.fire({
              title: 'خطأ !!',
              text: 'خطأ غير معروف من الخادم !!',
              icon: 'error',
              confirmButtonText: 'موافق',
            });
          } else {
            Swal.fire({
              title: 'Error !!',
              text: 'Unknown error From Server!!',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
        }
      );
    }

}
