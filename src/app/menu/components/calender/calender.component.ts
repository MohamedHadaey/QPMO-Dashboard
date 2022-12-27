import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
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

// my trail to add calender cards
import { ChangedEventArgs } from '@syncfusion/ej2-calendars';
import { addClass } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalenderComponent implements OnInit {
  // // my trail to add calendar cards
  // //if you want to put min and max date
  // // public minDate: Date = new Date ("10/01/2022");
  // // public maxDate: Date = new Date ("12/30/2022");
  // // public value: Date = new Date ("05/16/2017");
  // public value: Date [] = [new Date ("11/03/2022"), new Date ("11/16/2022"), new Date ("11/26/2022"), new Date ("11/28/2022"), new Date ("05/12/2017"), new Date ("10/02/2022"), new Date ("10/24/2022"), new Date ("10/22/2022")];
  // public weekStart: number = 2;
  // public cssClass = "e-custom";
  // onValueChange(args: any): void {
  //   /* to Displays selected date in the label*/
  //   // (<HTMLInputElement>document.getElementById("selectedDate")).textContent =
  //   //   "Selected Value: " + args.value.toLocaleDateString();
  //   // console.log(args.value.toDateString())
  //   // console.log(args.value.toLocaleDateString())
  //   console.log(args.value.getDate())
  //   // this.showDayProjects();
  // }

  //   onLoad(args: any) {
	// /*Date need to be customized*/
  //       if (args.date.getDate() === 10) {
  //          let span: HTMLElement;
  //           span = document.createElement('span');
  //           span.setAttribute('class', 'e-icons highlight');
  //           addClass([args.element], ['special', 'e-day', 'birthday']);
  //            args.element.firstElementChild.setAttribute('title', 'Birthday !');
  //           args.element.setAttribute('title', ' Birthday !');
  //            args.element.setAttribute('data-val', 'Birthday!');
  //           args.element.appendChild(span);
  //       }
  //       if (args.date.getDate() === 15) {
  //           let span: HTMLElement;
  //           span = document.createElement('span');
  //           span.setAttribute('class', 'e-icons highlight');
  //           addClass([args.element], ['special', 'e-day', 'farewell']);
  //            args.element.firstElementChild.setAttribute('title', 'Farewell !');
  //           args.element.setAttribute('title', 'Farewell !');
  //           args.element.setAttribute('data-val', 'Farewell!');
  //           args.element.appendChild(span);
  //       }
  //       if (args.date.getDate() === 20) {
  //          let span: HTMLElement;
  //           span = document.createElement('span');
  //           span.setAttribute('class', 'e-icons highlight');
  //           addClass([args.element], ['special', 'e-day', 'vacation']);
  //           args.element.firstElementChild.setAttribute('title', 'Vacation !');
  //           args.element.setAttribute('title', 'Vacation !');
  //           args.element.setAttribute('data-val', 'Vacation!');
  //           args.element.appendChild(span);
  //       }
  //   }

  /****************/
  refresh = new Subject<void>();
  viewDate: Date = new Date();
  minDate: Date = new Date ("10/01/2022");
  maxDate: Date = new Date ("12/30/2022");
  activeDayIsOpen: boolean = true;
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

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  minimize:boolean= true;
  fav:boolean = false;
  constructor(private _AuthService:AuthService) { }

  ngOnInit(): void {
  }

  // this function to log out
  logOut() {
    this._AuthService.logout();
  }

  // this function to open day projects panel
  showDayProjects() {
    $(".day-projects").slideToggle();
    $(".project-card-details").slideUp();
  }
}
