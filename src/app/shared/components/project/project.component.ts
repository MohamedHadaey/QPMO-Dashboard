import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

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

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectComponent implements OnInit {
  @Input() data:any = {};
  minimize: boolean = true;
  fav: boolean = false;
  currentLanguage: any = localStorage.getItem('currentLanguage');
  constructor(private _SharedService:SharedService, private toastr: ToastrService) {
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
    console.log(" data on ngOnInit  " , this.data)

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
  }

}
