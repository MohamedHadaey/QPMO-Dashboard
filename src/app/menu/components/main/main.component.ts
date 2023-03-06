import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MenuService } from '../../services/menu.service';
import { Options } from '@angular-slider/ngx-slider';
import { ToastrService } from 'ngx-toastr';
declare const $: any;
declare var google: any;
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { emptyFilter } from 'src/app/models/project';
import { filter } from 'rxjs';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;

  labels: string[];
  fill: ApexFill;
  stroke: ApexStroke;
};

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public chartOptions: Partial<ChartOptions> | any;
  value: number = 40;
  highValue: number = 60;
  options: Options = {
    floor: 0,
    ceil: 100,
  };
  // price range inputs
  // section input
  sectionMinValue: any = 25;
  sectionMaxValue: any = 75;
  sectionOptions: Options = {
    floor: 0,
    ceil: 100,
  };
  MarkerClick(ll: googleMaps_ApiReturn) {
    console.log(ll);
  }
  // constructor input
  constructorMinValue: any = 25;
  constructorMaxValue: any = 50;
  constructorOptions: Options = {
    floor: 0,
    ceil: 100,
  };
  /**************************/
  map: boolean = true;
  list: boolean = true;
  card: boolean = true;
  showen: string = 'maps';
  currentLanguage: any = localStorage.getItem('currentLanguage');
  display: any;

  constructor(
    private _AuthService: AuthService,
    private _MenuService: MenuService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    // $(".dropdown-toggle").dropdown('toggle');
    // for check directions after any refresh
    if (this.currentLanguage == 'ar-sa') {
      $('.content-body').removeClass('content-body-ltr');
      $('.content-body').addClass('content-body-rtl');
    } else {
      $('.content-body').removeClass('content-body-rtl');
      $('.content-body').addClass('content-body-ltr');
    }

    // this.GetAppliedFilterData()

    this.getFavProjects_lists();
    this.getFavProjects_cards();
    this.getFavProjects_map();
    this.getListsProjects();
    this.getMapProjects();
    this.getCardsProjects();
    this.getProjectsTypes();
    this.getProjectsStates();

    this.initForm();
  }




  /////////////////////Maps////////////////////
  center: google.maps.LatLngLiteral = {
    lat: 24.742007867478183,
    lng: 46.65728366258421,
  };
  mapsop: google.maps.MapOptions = {
    styles: [
      { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#263c3f' }],
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#6b9a76' }],
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#202124' }],
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#202124' }],
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#202124' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#202124' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#202124' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#202124' }],
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#2f3948' }],
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#17263c' }],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#515c6d' }],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#17263c' }],
      },
    ],
  };
  zoom = 12;

  projectslocations: googleMaps_ApiReturn[] = [];
  // map_center: googleMaps_ApiCenter[] = [];

  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
  };

  openProjectDetails(markerPosition: any) {
    this.showProjectCardDetails(markerPosition.ID);
  }
  // showProjectCardDetails() {
  //   $('.project-card-details').slideToggle();
  // }

  showProjectCardDetails(projectId: any) {
    this.getProjectDetails(projectId);
    $('.project-card-details').slideToggle();
  }

  // this function to open day projects panel
  // showDayProjects() {
  //   $('.day-projects').slideToggle();
  //   $('.project-card-details').slideUp();
  // }
  ////////////////////////////////////////////

  /*********** all  **********************/
  isFav: boolean = false;
  allListsProjects: any[] = [];
  allMapProjects: any[] = [];
  allCardsProjects: any[] = [];

  // function of get all list projects
  getListsProjects() {
    this._MenuService.getAllListsProjects().subscribe(
      (response) => {
        if (response.Code == 200) {
          this.allListsProjects = response.data;
         // console.log('list view', this.allListsProjects);
          localStorage.setItem(
            'allListsProjects',
            JSON.stringify(this.allListsProjects)
          );
        } else {
          // this.toastr.error(response.Error_Resp)
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
      (error) => {
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
        // if (this.currentLanguage == "ar-sa") {
        //   this.toastr.error("خطأ غير معروف من الخادم !!")
        // }else {
        //   this.toastr.error("Unknown error From Server!!")
        // }
      }
    );
  }


  // let firstLat = this.allMapProjects[0].Project_Location.substring(0,this.allMapProjects[0].Project_Location.indexOf(','));
  // let firstLng = this.allMapProjects[0].Project_Location.split(',')[1].trim();
  // this.center.lat = firstLat;
  // this.center.lng = firstLng;
  // console.log("lat::::",this.center.lat,"lng::::", this.center.lng);
  // this.center = {
  //   lat: parseFloat(firstLat),
  //   lng: parseFloat(firstLng),
  // }




  // function of get all Map projects
  getMapProjects() {
    this._MenuService.getAllMapProjects().subscribe(
      (response) => {
        if (response.Code == 200) {
          this.allMapProjects = response.data;
          // this.loadScript();
          localStorage.setItem(
            'allMapProjects',
            JSON.stringify(this.allMapProjects)
          );
          let ImagesUrl = [
            '../../../../assets/maps_images/yellow.png',
            '../../../../assets/maps_images/green.png',
            '../../../../assets/maps_images/red.png',
          ];
          // debugger;
          this.projectslocations = [];
          this.allMapProjects.forEach((i) => {
            let lat = i.Project_Location.substring(
              0,
              this.allMapProjects[0].Project_Location.indexOf(',')
            );
            let lng = i.Project_Location.split(',')[1].trim();
            this.projectslocations.push({
              ID: i.ID,
              position: {
                lat: parseFloat(lat),
                lng: parseFloat(lng),
              },
              status: {
                scaledSize: {
                  height: 40,
                  width: 40,
                  equals(other) {
                    return true;
                  },
                },
                url: ImagesUrl[i.ID % 2],
              },
            });
            // console.log('lat: ', parseFloat(lat), 'lng: ', parseFloat(lng));
            this.center = {
              lat: parseFloat(lat),
              lng: parseFloat(lng),
            };
          });
          //console.log("projectslocations" ,this.projectslocations);
        } else {
          // this.toastr.error(response.Error_Resp)
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
      (error) => {
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
        // if (this.currentLanguage == "ar-sa") {
        //   this.toastr.error("خطأ غير معروف من الخادم !!")
        // }else {
        //   this.toastr.error("Unknown error From Server!!")
        // }
      }
    );
  }

  // function of get all cards projects
  getCardsProjects() {
    this._MenuService.getAllCardsProjects().subscribe(
      (response) => {
        if (response.Code == 200) {
          this.allCardsProjects = response.data;
          // console.log("allCardsProjects:::" , this.allCardsProjects);

          localStorage.setItem(
            'allCardsProjects',
            JSON.stringify(this.allCardsProjects)
          );
          console.log('card view', this.allCardsProjects);
        } else {
          // this.toastr.error(response.Error_Resp)
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
      (error) => {
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
        // if (this.currentLanguage == "ar-sa") {
        //   this.toastr.error("خطأ غير معروف من الخادم !!")
        // }else {
        //   this.toastr.error("Unknown error From Server!!")
        // }
      }
    );
  }
  /*************   fav ********************/
  favProjects_list: any[] = [];
  favProjects_map: any[] = [];
  favProjects_card: any[] = [];

  // fav Projects_list
  getFavProjects_lists() {
    this._MenuService.getFavProjects_list().subscribe(
      (response) => {
        if (response.Code == 200) {
          this.favProjects_list = response.data;
          console.log("fav projects list theme", this.favProjects_list)
          localStorage.setItem(
            'favProjects_list',
            JSON.stringify(this.favProjects_list)
          );
          // console.log('fav_lists', this.favProjects_list);
        } else {
          // this.toastr.error(response.Error_Resp)
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
      (error) => {
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
        // if (this.currentLanguage == "ar-sa") {
        //   this.toastr.error("خطأ غير معروف من الخادم !!")
        // }else {
        //   this.toastr.error("Unknown error From Server!!")
        // }
      }
    );
  };

   // fav Projects_list
   getFavProjects_map() {
    this._MenuService.getFavProjects_map().subscribe(
      (response) => {
        if (response.Code == 200) {
          this.favProjects_map = response.data;
          console.log("fav projects-map theme", this.favProjects_map);

          localStorage.setItem('favProjects_map',JSON.stringify(this.favProjects_map));
          let ImagesUrl = [
            '../../../../assets/maps_images/yellow.png',
            '../../../../assets/maps_images/green.png',
            '../../../../assets/maps_images/red.png',
          ];
          this.projectslocations = [];
          this.favProjects_map.forEach((i) => {
            let lat = i.Project_Location.substring(0,this.favProjects_map[0].Project_Location.indexOf(','));
            let lng = i.Project_Location.split(',')[1].trim();
            this.projectslocations.push({
              ID: i.ID,
              position: {
                lat: parseFloat(lat),
                lng: parseFloat(lng),
              },
              status: {
                scaledSize: {
                  height: 40,
                  width: 40,
                  equals(other) {
                    return true;
                  },
                },
                url: ImagesUrl[i.ID % 2],
              },
            });
            // console.log('lat: ', parseFloat(lat),'lng: ', parseFloat(lng));
            this.center = {
              lat: parseFloat(lat),
              lng: parseFloat(lng),
            };
          });
        } else {
          // this.toastr.error(response.Error_Resp)
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
      (error) => {
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
        // if (this.currentLanguage == "ar-sa") {
        //   this.toastr.error("خطأ غير معروف من الخادم !!")
        // }else {
        //   this.toastr.error("Unknown error From Server!!")
        // }
      }
    );
  }

  // fav Projects_card
  getFavProjects_cards() {
    this._MenuService.getFavProjects_card().subscribe(
      (response) => {
        if (response.Code == 200) {
          this.favProjects_card = response.data;
          localStorage.setItem(
            'favProjects_card',
            JSON.stringify(this.favProjects_card)
          );
          console.log('fav_cards', this.favProjects_card);
        } else {
          // this.toastr.error(response.Error_Resp)
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
      (error) => {
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

  projectDetails!: any;
  // function of get specific project
  getProjectDetails(id: any) {
    this._MenuService.getProjectDetails(id).subscribe(
      (response) => {
        if (response.Code == 200) {
          this.projectDetails = response.data;
          // console.log(this.projectDetails, ' and ', response);
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
      (error) => {
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
        // if (this.currentLanguage == "ar-sa") {
        //   this.toastr.error("خطأ غير معروف من الخادم !!")
        // }else {
        //   this.toastr.error("Unknown error From Server!!")
        // }
      }
    );
  }

  //********         add to fav       ************/
  addProjectToFav(id: any) {
    this._MenuService.addToFav(id).subscribe(
      (response) => {
        if (response.Code == 200) {
          if (this.currentLanguage == 'ar-sa') {
            Swal.fire({
              title: 'نجاح !!',
              text: 'تم إضافة المشروع بنجاح',
              icon: 'success',
              confirmButtonText: 'موافق',
            });
          } else {
            Swal.fire({
              title: 'Success !!',
              text: 'The project has been successfully added',
              icon: 'success',
              confirmButtonText: 'OK',
            });
          }
          this.getListsProjects();
          this.getMapProjects();
          this.getCardsProjects();
          this.getFavProjects_lists();
          this.getFavProjects_cards();
          this.getFavProjects_map()
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
          if (this.currentLanguage == 'ar-sa') {
            Swal.fire({
              title: 'نجاح !!',
              text: 'تم حذف المشروع بنجاح',
              icon: 'success',
              confirmButtonText: 'موافق',
            });
          } else {
            Swal.fire({
              title: 'Success !!',
              text: 'The project has been successfully deleted',
              icon: 'success',
              confirmButtonText: 'OK',
            });
          }


          this.getListsProjects();
          this.getMapProjects();
          this.getCardsProjects();
          this.getFavProjects_lists();
          this.getFavProjects_cards();
          this.getFavProjects_map();
          if (this.isFav == false) {
            this.isFav = true;
            this.showFav()
          } else {
            this.isFav = false;
            this.showUnFav()
          }
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

  // get projcts types
  projectsTypes: any[] = [];
  getProjectsTypes() {
    this._MenuService.getAllCategoties().subscribe(
      (response) => {
        if (response.Code == 200) {
          this.projectsTypes = response.data;
          // console.log(this.projectsTypes);
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
      (error) => {
        // if (this.currentLanguage == 'ar-sa') {
        //   this.toastr.error('خطأ غير معروف من الخادم !!');
        // } else {
        //   this.toastr.error('Unknown error From Server!!');
        // }
      }
    );
  }

  // get projcts states
  projectsStates: any[] = [];
  getProjectsStates() {
    this._MenuService.getAllStates().subscribe(
      (response) => {
        if (response.Code == 200) {
          this.projectsStates = response.data;
          // console.log(this.projectsStates);
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
      (error) => {
        // if (this.currentLanguage == 'ar-sa') {
        //   this.toastr.error('خطأ غير معروف من الخادم !!');
        // } else {
        //   this.toastr.error('Unknown error From Server!!');
        // }
      }
    );
  }
  /***************************************/


  filterForm!: FormGroup;
  private initForm(): void {
    this.filterForm = new FormGroup({
      ProjectType: new FormControl(null, [Validators.required]),
      ProjectStatus: new FormControl(null),
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
}

  // filter form inputs
  // filterForm: FormGroup = new FormGroup({
  //   ProjectType: new FormControl(null),
  //   ProjectStatus: new FormControl(null),
  //   // now_check: new FormControl('checked', [Validators.required]),
  //   // complete_check: new FormControl(false, [Validators.required]),

  //   // late_check: new FormControl(false, [Validators.required]),

  //   // end_check: new FormControl('checked', [Validators.required]),

  //   // not_check: new FormControl(false, [Validators.required]),
  //   StartDate: new FormControl(null),
  //   EndDate: new FormControl(null),
  //   UserPer: new FormControl(null),
  //   MaqawlPer: new FormControl(null),
  // });



  submitFilterForm(filterForm: FormGroup) {
    if(filterForm.invalid) {
      return
    }else {
      this.closeDropdown();
      this.spinner.show();
      // console.log("hello")
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
      this._MenuService.filterProjects_table(filterForm.value).subscribe((response) => {
        this.allListsProjects = response.data;
        this.spinner.hide();
      } , (error) => {
        console.log(error);
      });

      this._MenuService.filterProjects_map(filterForm.value).subscribe((response) => {
        this.allMapProjects = response.data;
        let ImagesUrl = [
          '../../../../assets/maps_images/yellow.png',
          '../../../../assets/maps_images/green.png',
          '../../../../assets/maps_images/red.png',
        ];
        this.projectslocations = [];
        this.allMapProjects.forEach((i) => {
          let lat = i.Project_Location.substring(0,this.allMapProjects[0].Project_Location.indexOf(','));
          let lng = i.Project_Location.split(',')[1].trim();
          this.projectslocations.push({
            ID: i.ID,
            position: {
              lat: parseFloat(lat),
              lng: parseFloat(lng),
            },
            status: {
              scaledSize: {
                height: 40,
                width: 40,
                equals(other) {
                  return true;
                },
              },
              url: ImagesUrl[i.ID % 2],
            },
          });
          // console.log('lat: ', parseFloat(lat),'lng: ', parseFloat(lng));
          this.center = {
            lat: parseFloat(lat),
            lng: parseFloat(lng),
          };
        });
        console.log(this.allMapProjects)
        this.spinner.hide();
      } , (error) => {
        console.log(error);
      });

      this._MenuService.filterProjects_cards(filterForm.value).subscribe((response) => {
        this.allCardsProjects = response.data;
        console.log(this.allCardsProjects);
        this.spinner.hide();
      } , (error) => {
        console.log(error);
      });
    }
  }


  // clear form data
  emptyFilter!:emptyFilter;

  clearFilteredData() {
    this.spinner.show();
    this.closeDropdown();
    // console.log("hello");
    this.emptyFilter = {
      ProjectType: null,
      ProjectStatus: [],
      StartDate: null,
      EndDate: null,
      MaqawlPer: null,
      UserPer: null,

    }

    this.getMapProjects();
    this.getCardsProjects();
    this.getListsProjects();
    this.spinner.hide();


    // tell ramy about that

    // this._MenuService.filterProjects_table(this.emptyFilter).subscribe((response) => {
    //   this.allListsProjects = response.data;
    //   this.spinner.hide();
    // } , (error) => {
    //   console.log(error);
    // });

    // this._MenuService.filterProjects_map(this.emptyFilter).subscribe((response) => {
    //   this.allMapProjects = response.data;
    //   console.log("clearmap", this.allMapProjects)
    //   let ImagesUrl = [
    //     '../../../../assets/maps_images/yellow.png',
    //     '../../../../assets/maps_images/green.png',
    //     '../../../../assets/maps_images/red.png',
    //   ];
    //   this.projectslocations = [];
    //   this.allMapProjects.forEach((i) => {
    //     let lat = i.Project_Location.substring(0,this.allMapProjects[0].Project_Location.indexOf(','));
    //     let lng = i.Project_Location.split(',')[1].trim();
    //     this.projectslocations.push({
    //       ID: i.ID,
    //       position: {
    //         lat: parseFloat(lat),
    //         lng: parseFloat(lng),
    //       },
    //       status: {
    //         scaledSize: {
    //           height: 40,
    //           width: 40,
    //           equals(other) {
    //             return true;
    //           },
    //         },
    //         url: ImagesUrl[i.ID % 2],
    //       },
    //     });
    //     console.log('lat: ', parseFloat(lat),'lng: ', parseFloat(lng));
    //     this.center = {
    //       lat: parseFloat(lat),
    //       lng: parseFloat(lng),
    //     };
    //   });
    //   console.log(this.allMapProjects)
    //   this.spinner.hide();
    // } , (error) => {
    //   console.log(error);
    // });

    // this._MenuService.filterProjects_cards(this.emptyFilter).subscribe((response) => {
    //   console.log(" clear filter ",response);
    //   this.allCardsProjects = response.data;
    //   console.log(this.allCardsProjects);
    //   this.spinner.hide();
    // } , (error) => {
    //   this.spinner.hide()
    //   console.log(error);
    // });
  }


    ///****************** */
  // GetAppliedFilterData api

  filteredData:any = {
    ProjectType: null,
    MaqawlPer: null,
    UserPer: null,
    ProjectTypes: null,
    ProjectStatus: [],
    StartDate: null,
    EndDate: null
}

ProjectType!:any;
  GetAppliedFilterData() {
    this._MenuService.GetAppliedFilterData().subscribe((response) => {
      this.filteredData = response.data;
      this.ProjectType = this.filteredData.ProjectType;
      // console.log(this.filteredData)
      // this.filterForm.get('ProjectType').setValue(this.filteredData);
      // this.filterForm.get('ProjectType')?.setValue(this.filteredData.value.ProjectType);
      // console.log(this.filteredData.ProjectType);

      this.filterForm.value.ProjectType = this.filteredData.ProjectType;

      this.setformValue(this.filteredData)
      if(this.filteredData == null) {
      } else {
        this._MenuService.filterProjects_cards(this.filteredData).subscribe((response) => {
          this.allCardsProjects = response.data;
        } , (error) => {
          console.log(error);
        });
        this._MenuService.filterProjects_table(this.filteredData).subscribe((response) => {
          this.allListsProjects = response.data;
        } , (error) => {
          console.log(error);
        });
        this._MenuService.filterProjects_map(this.filteredData).subscribe((response) => {
          this.allMapProjects = response.data;

          this.projectslocations = [];
          this.allMapProjects.forEach((i) => {
            let lat = i.Project_Location.substring(0,this.allMapProjects[0].Project_Location.indexOf(','));
            let lng = i.Project_Location.split(',')[1].trim();
            this.projectslocations.push({
              ID: i.ID,
              position: {
                lat: parseFloat(lat),
                lng: parseFloat(lng),
              },
              status: {
                scaledSize: {
                  height: 40,
                  width: 40,
                  equals(other) {
                    return true;
                  },
                },
                url: '../../../../assets/maps_images/yellow.png',
              },
            });
           // console.log('lat: ', parseFloat(lat),'lng: ', parseFloat(lng));

          });
          console.log(this.allMapProjects)
        } , (error) => {
          console.log(error);
        });
      }

    });


  }

  setformValue(response: any) {
    this.filterForm.get('ProjectType')?.setValue(response.ProjectType);

}
  //****************** */

  // show favourites projects in all themes
  showFav() {
    this.isFav = true;
    this.getFavProjects_map();
    this.getFavProjects_cards();
    this.allListsProjects = this.favProjects_list;
    this.allMapProjects = this.favProjects_map;
    this.allCardsProjects = this.favProjects_card;
    console.log("mohamed hadaey",this.allCardsProjects)

  }

  // show favourites projects in all themes
  showUnFav() {
    this.isFav = false;
    this.getListsProjects();
    this.getCardsProjects();
    this.getMapProjects();
  }

  // show list theme
  showList() {
    $('#list').addClass('active-theme');
    $('#map').removeClass('active-theme');
    $('#card').removeClass('active-theme');
    this.showen = 'lists';
  }

  // show map theme
  showMap() {
    $('#map').addClass('active-theme');
    $('#list').removeClass('active-theme');
    $('#card').removeClass('active-theme');
    this.showen = 'maps';
  }

  // show card theme
  showCard() {
    $('#card').addClass('active-theme');
    $('#map').removeClass('active-theme');
    $('#list').removeClass('active-theme');
    this.showen = 'cards';
  }

  // this function to log out
  logOut() {
    this._AuthService.logout();
  }

  closeDropdown() {
    $('.form-dropdown-menu').removeClass('show');

  }


  // returnData() {
  //   this.filterForm.reset();
  //   this.filteredData = {
  //     ProjectType: null,
  //     MaqawlPer: null,
  //     UserPer: null,
  //     ProjectTypes: null,
  //     ProjectStatus: [],
  //     StartDate: null,
  //     EndDate: null
  // }

  //   this.GetAppliedFilterData();

  // }
  // function of search
  search(x: any) {
    if (
      x.target.value == null ||
      x.target.value == '' ||
      x.target.value == ' '
    ) {
      if (this.isFav == false) {
        this.allListsProjects = JSON.parse(localStorage.getItem('allListsProjects') || '{}');
        this.allMapProjects = JSON.parse(localStorage.getItem('allMapProjects') || '{}');
        this.allCardsProjects = JSON.parse(localStorage.getItem('allCardsProjects') || '{}');

        let ImagesUrl = [
          '../../../../assets/maps_images/yellow.png',
          '../../../../assets/maps_images/green.png',
          '../../../../assets/maps_images/red.png',
        ];
        this.projectslocations = [];
        this.allMapProjects.forEach((i) => {
          let lat = i.Project_Location.substring(0,this.allMapProjects[0].Project_Location.indexOf(','));
          let lng = i.Project_Location.split(',')[1].trim();
          this.projectslocations.push({
            ID: i.ID,
            position: {
              lat: parseFloat(lat),
              lng: parseFloat(lng),
            },
            status: {
              scaledSize: {
                height: 40,
                width: 40,
                equals(other) {
                  return true;
                },
              },
              url: ImagesUrl[i.ID % 2],
            },
          });
         // console.log('lat: ', parseFloat(lat),'lng: ', parseFloat(lng));

        });
      } else {
        this.favProjects_list = JSON.parse(localStorage.getItem('favProjects_list') || '{}');
        this.favProjects_map = JSON.parse(localStorage.getItem('favProjects_map') || '{}');
        this.favProjects_card = JSON.parse(localStorage.getItem('favProjects_card') || '{}');

        let ImagesUrl = [
          '../../../../assets/maps_images/yellow.png',
          '../../../../assets/maps_images/green.png',
          '../../../../assets/maps_images/red.png',
        ];
        this.projectslocations = [];
          this.favProjects_map.forEach((i) => {
            let lat = i.Project_Location.substring(0,this.favProjects_map[0].Project_Location.indexOf(','));
            let lng = i.Project_Location.split(',')[1].trim();
            this.projectslocations.push({
              ID: i.ID,
              position: {
                lat: parseFloat(lat),
                lng: parseFloat(lng),
              },
              status: {
                scaledSize: {
                  height: 40,
                  width: 40,
                  equals(other) {
                    return true;
                  },
                },
                url: ImagesUrl[i.ID % 2],
              },
            });
            // console.log('lat: ', parseFloat(lat),'lng: ', parseFloat(lng));
            this.center = {
              lat: parseFloat(lat),
              lng: parseFloat(lng),
            };
          });
      }
    } else {
      if (this.isFav == false) {
        this.allListsProjects = JSON.parse(localStorage.getItem('allListsProjects') || '{}');
        this.allMapProjects = JSON.parse(localStorage.getItem('allMapProjects') || '{}');
        this.allCardsProjects = JSON.parse(localStorage.getItem('allCardsProjects') || '{}');

        this.allListsProjects = this.allListsProjects.filter((project) => project.Project_Name.toLowerCase().includes(x.target.value.toLowerCase()));
        this.allMapProjects = this.allMapProjects.filter((project) => project.Project_Name.toLowerCase().includes(x.target.value.toLowerCase()));
        this.allCardsProjects = this.allCardsProjects.filter((project) => project.Project_Name.toLowerCase().includes(x.target.value.toLowerCase()));

        let ImagesUrl = [
          '../../../../assets/maps_images/yellow.png',
          '../../../../assets/maps_images/green.png',
          '../../../../assets/maps_images/red.png',
        ];
        this.projectslocations = [];
        this.allMapProjects.forEach((i) => {
          let lat = i.Project_Location.substring(0,this.allMapProjects[0].Project_Location.indexOf(','));
          let lng = i.Project_Location.split(',')[1].trim();
          this.projectslocations.push({
            ID: i.ID,
            position: {
              lat: parseFloat(lat),
              lng: parseFloat(lng),
            },
            status: {
              scaledSize: {
                height: 40,
                width: 40,
                equals(other) {
                  return true;
                },
              },
              url: ImagesUrl[i.ID % 2],
            },
          });
          // console.log('lat: ', parseFloat(lat),'lng: ', parseFloat(lng));
          this.center = {
            lat: parseFloat(lat),
            lng: parseFloat(lng),
          };
        });

      } else {
        this.favProjects_list = JSON.parse(localStorage.getItem('favProjects_list') || '{}');
        this.favProjects_map = JSON.parse(localStorage.getItem('favProjects_map') || '{}');
        this.favProjects_card = JSON.parse(localStorage.getItem('favProjects_card') || '{}');

        this.favProjects_list = this.favProjects_list.filter((project) => project.Project_Name.toLowerCase().includes(x.target.value.toLowerCase()));
        this.allListsProjects = this.favProjects_list;
        this.favProjects_map = this.favProjects_map.filter((project) => project.Project_Name.toLowerCase().includes(x.target.value.toLowerCase()));
        this.allMapProjects = this.favProjects_map;
        this.favProjects_card = this.favProjects_card.filter((project) =>  project.Project_Name.toLowerCase().includes(x.target.value.toLowerCase()));
        this.allCardsProjects = this.favProjects_card;

        let ImagesUrl = [
          '../../../../assets/maps_images/yellow.png',
          '../../../../assets/maps_images/green.png',
          '../../../../assets/maps_images/red.png',
        ];
        this.projectslocations = [];
          this.favProjects_map.forEach((i) => {
            let lat = i.Project_Location.substring(0,this.favProjects_map[0].Project_Location.indexOf(','));
            let lng = i.Project_Location.split(',')[1].trim();
            this.projectslocations.push({
              ID: i.ID,
              position: {
                lat: parseFloat(lat),
                lng: parseFloat(lng),
              },
              status: {
                scaledSize: {
                  height: 40,
                  width: 40,
                  equals(other) {
                    return true;
                  },
                },
                url: ImagesUrl[i.ID % 2],
              },
            });
            // console.log('lat: ', parseFloat(lat),'lng: ', parseFloat(lng));
            this.center = {
              lat: parseFloat(lat),
              lng: parseFloat(lng),
            };
          });
      }
    }
  }
}

interface ProjectStatus {
  iconurl: string;
}

interface googleMaps_ApiReturn {
  ID: number;
  position: google.maps.LatLngLiteral;
  status: google.maps.Icon;
}
