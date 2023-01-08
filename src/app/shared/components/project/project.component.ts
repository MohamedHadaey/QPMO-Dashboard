import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { EventColor } from 'calendar-utils';

// import swiper components
// import Swiper core and required modules
import SwiperCore, {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from 'swiper';

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
  minimize: boolean = true;
  fav: boolean = false;
  constructor() {}

  ngOnInit(): void {}

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

  // request to update images
  updateImages() {
    $('.update-popups').show();
  }

  // close update images popup
  closeUpdateImagesPopup() {
    $('.update-popups').hide();
  }
}
