import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
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
import Swal from 'sweetalert2';

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

// my trail to add calender cards
import { ChangedEventArgs } from '@syncfusion/ej2-calendars';
import { addClass } from '@syncfusion/ej2-base';
import { F } from 'chart.js/dist/chunks/helpers.core';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
})
export class CalenderComponent implements OnInit {
  currentLanguage: any = localStorage.getItem('currentLanguage');
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  refresh = new Subject<void>();
  viewDate: Date = new Date();
  activeDayIsOpen: boolean = false;
  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: { ...colors['red'] },
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
      cssClass: 'display-none',
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: { ...colors['yellow'] },
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: { ...colors['blue'] },
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: { ...colors['yellow'] },
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];

  // dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
  //   if (isSameMonth(date, this.viewDate)) {
  //     if (
  //       (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
  //       events.length === 0
  //     ) {
  //       this.activeDayIsOpen = false;
  //     } else {
  //       this.activeDayIsOpen = true;
  //     }
  //     this.viewDate = date;
  //   }
  // }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  minimize: boolean = true;
  fav: boolean = false;
  constructor(private _AuthService: AuthService,private _MenuService:MenuService) {}

  ngOnInit(): void {}

  // this function to log out
  logOut() {
    this._AuthService.logout();
  }

  // this function to open day projects panel
  showDayProjects(e: any) {
    if (e.badgeTotal > 0) {
      // this.getProjectDetails(3);
      $('.day-projects').slideToggle();
      $('.project-card-details').slideUp();
    }
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
}
