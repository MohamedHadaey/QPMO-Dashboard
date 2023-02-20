import { Component, OnInit,ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MenuService } from '../../services/menu.service';
import { Options } from '@angular-slider/ngx-slider';
import { ToastrService } from 'ngx-toastr';
declare const $: any;
declare var google: any;
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';



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
  currentLanguage: any = localStorage.getItem('currentLanguage');
  display: any;

  constructor(
    private _AuthService: AuthService,
    private _MenuService: MenuService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // $(".dropdown-toggle").dropdown('toggle');
    this.getProjectDetails(6);
    this.chartOptions = {
      chart: {
        height: 150,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '60%',
          },
        },
      },
      labels: ['Percent'],
    };
    // for check directions after any refresh
    if (this.currentLanguage == 'ar-sa') {
      $('.content-body').removeClass('content-body-ltr');
      $('.content-body').addClass('content-body-rtl');
    } else {
      $('.content-body').removeClass('content-body-rtl');
      $('.content-body').addClass('content-body-ltr');
    }

    this.getListsProjects();
    this.getMapProjects();
    this.getCardsProjects();
    this.getFavProjects_lists();
    this.getFavProjects_cards();
    this.getProjectsTypes();
    this.getProjectsStates();
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
  zoom = 7;

  projectslocations: googleMaps_ApiReturn[] = [
    {
      position: {
        // this.allMapProjects[0].Project_Location
        lat: 24.742007867478183,
        lng: 46.65728366258421,
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
    },
    {
      position: {
        lat: 24.295213,
        lng: 50.454654,
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
    },
    {
      position: {
        lat: 24.895213,
        lng: 49.454654,
      },
      status: {
        scaledSize: {
          height: 40,
          width: 40,
          equals(other) {
            return true;
          },
        },
        url: '../../../../assets/maps_images/red.png',
      },
    },
    {
      position: {
        lat: 25.295213,
        lng: 50.454654,
      },
      status: {
        scaledSize: {
          height: 40,
          width: 40,
          equals(other) {
            return true;
          },
        },
        url: '../../../../assets/maps_images/green.png',
      },
    },
    {
      position: {
        lat: 23.77636944273777,
        lng: 44.76241220442151,
      },
      status: {
        scaledSize: {
          height: 40,
          width: 40,
          equals(other) {
            return true;
          },
        },
        url: '../../../../assets/maps_images/white.png',
      },
    },
    {
      position: {
        lat: 26.30282760999688,
        lng: 44.81099865206671,
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
    },
  ];

  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
  };

  openProjectDetails(markerPosition: any) {
    this.showProjectCardDetails(markerPosition);
  }
  // showProjectCardDetails() {
  //   $('.project-card-details').slideToggle();
  // }

  showProjectCardDetails(projectId: any) {
    this.getProjectDetails(projectId);
    $('.project-card-details').slideToggle();
  }

  // this function to open day projects panel
  showDayProjects() {
    $('.day-projects').slideToggle();
    $('.project-card-details').slideUp();
  }
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
          console.log('list view', this.allListsProjects);
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

  // function of get all Map projects
  getMapProjects() {
    this._MenuService.getAllMapProjects().subscribe(
      (response) => {
        if (response.Code == 200) {
          this.allMapProjects = response.data;
          localStorage.setItem('allMapProjects', JSON.stringify(this.allMapProjects));
          console.log('map view', this.allMapProjects);
          console.log(this.allMapProjects[0].Project_Location);

          let lat = this.allMapProjects[0].Project_Location.substring(0,this.allMapProjects[0].Project_Location.indexOf(','));
          let lng = this.allMapProjects[0].Project_Location.split(',')[1].trim();
          console.log('lat: ', lat);
          console.log('lng: ', lng);
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
          localStorage.setItem('allCardsProjects', JSON.stringify(this.allCardsProjects));
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
  favProjects_card: any[] = [];

  // fav Projects_list
  getFavProjects_lists() {
    this._MenuService.getFavProjects_list().subscribe(
      (response) => {
        if (response.Code == 200) {
          this.favProjects_list = response.data;
          localStorage.setItem('favProjects_list', JSON.stringify(this.favProjects_list));
          console.log('fav_lists', this.favProjects_list);
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
          localStorage.setItem('favProjects_card', JSON.stringify(this.favProjects_card));
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
          console.log(this.projectDetails, ' and ', response);
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
          console.log(this.projectsTypes);
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
          this.toastr.error('خطأ غير معروف من الخادم !!');
        } else {
          this.toastr.error('Unknown error From Server!!');
        }
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
          console.log(this.projectsStates);
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
          this.toastr.error('خطأ غير معروف من الخادم !!');
        } else {
          this.toastr.error('Unknown error From Server!!');
        }
      }
    );
  }
  /***************************************/
  // filter form inputs
  filterForm: FormGroup = new FormGroup({
    ProjectType: new FormControl('1', [Validators.required]),
    ProjectStatus: new FormControl('1', [Validators.required]),
    // now_check: new FormControl('checked', [Validators.required]),
    // complete_check: new FormControl(false, [Validators.required]),

    // late_check: new FormControl(false, [Validators.required]),

    // end_check: new FormControl('checked', [Validators.required]),

    // not_check: new FormControl(false, [Validators.required]),
    StartDate: new FormControl(null, [Validators.required]),
    EndDate: new FormControl(null, [Validators.required]),
    UserPer: new FormControl([25, 75], [Validators.required]),
    MaqawlPer: new FormControl([25, 75], [Validators.required]),
  });

  submitFilterForm(filterForm: FormGroup) {
    filterForm.value.UserPer =
      filterForm.value.UserPer[1] - filterForm.value.UserPer[0];
    filterForm.value.MaqawlPer =
      filterForm.value.MaqawlPer[1] - filterForm.value.MaqawlPer[0];
    console.log(filterForm.value.UserPer);
    console.log(filterForm.value.MaqawlPer);
    console.log(filterForm.value);
    this._MenuService.filterProjects(filterForm.value).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // show favourites projects in all themes
  showFav() {
    this.isFav = true;
    this.allListsProjects = this.favProjects_list;
    this.allCardsProjects = this.favProjects_card;
  }

  // show favourites projects in all themes
  showUnFav() {
    this.isFav = false;
    this.getListsProjects();
    this.getCardsProjects();
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
      }else {
        this.favProjects_list = JSON.parse(localStorage.getItem('favProjects_list') || '{}');
        this.favProjects_card = JSON.parse(localStorage.getItem('favProjects_card') || '{}');
      }

    } else {
      if (this.isFav == false) {
        this.allListsProjects = JSON.parse(localStorage.getItem('allListsProjects') || '{}');
        this.allMapProjects = JSON.parse(localStorage.getItem('allMapProjects') || '{}');
        this.allCardsProjects = JSON.parse(localStorage.getItem('allCardsProjects') || '{}');

        this.allListsProjects = this.allListsProjects.filter((project) => project.Project_Name.toLowerCase().includes(x.target.value.toLowerCase()));
        this.allMapProjects = this.allMapProjects.filter((project) => project.Project_Name.toLowerCase().includes(x.target.value.toLowerCase()));
        this.allCardsProjects = this.allCardsProjects.filter((project) => project.Project_Name.toLowerCase().includes(x.target.value.toLowerCase()));
      } else {
        this.favProjects_list = JSON.parse(localStorage.getItem('favProjects_list') || '{}');
        this.favProjects_card = JSON.parse(localStorage.getItem('favProjects_card') || '{}');

        this.favProjects_list = this.favProjects_list.filter((project) => project.Project_Name.toLowerCase().includes(x.target.value.toLowerCase()));
        this.allListsProjects = this.favProjects_list
        this.favProjects_card = this.favProjects_card.filter((project) => project.Project_Name.toLowerCase().includes(x.target.value.toLowerCase()));
        this.allCardsProjects = this.favProjects_card
      }






    }
  }
}

interface ProjectStatus {
  iconurl: string;
}

interface googleMaps_ApiReturn {
  position: google.maps.LatLngLiteral;
  status: google.maps.Icon;
}
