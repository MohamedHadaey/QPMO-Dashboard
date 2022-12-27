import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { CalendarEvent, CalendarEventAction } from 'angular-calendar';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { EventColor } from 'calendar-utils';
import { Subject } from 'rxjs';

// import swiper components
// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar]);
declare const $: any;
const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  minimize:boolean= true;
  fav:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }


   // this function to close day projects panel
   closeDayProjects() {
    $(".day-projects").slideUp();
  }

  // this function to open project card details panel
  showProjectCardDetails() {
    $(".project-card-details").slideToggle();
  }

    // this function to close project card details panel
    closeProjectCardDetails() {
      $(".project-card-details").slideToggle();
    }

  // this function to show project process panel
  showProjectProcess(){
    $(".project-process").slideToggle();
    this.minimize =! this.minimize;
  }

  favProject() {
    this.fav =! this.fav;
  }
}
