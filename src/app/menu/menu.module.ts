import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CalenderComponent } from './components/calender/calender.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { ReportsComponent } from './components/reports/reports.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';

import { GoogleMapsModule } from '@angular/google-maps';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

// import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
// from angular material
import { MatSliderModule } from '@angular/material/slider';
import { NgxSliderModule } from '@angular-slider/ngx-slider';


// my trail to add calender cards

// import ApexCharts for charts
import { NgApexchartsModule } from 'ng-apexcharts';

// import swiper
import { SwiperModule } from "swiper/angular";
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    MainComponent,
    ProjectsComponent,
    CalenderComponent,
    FavouritesComponent,
    ReportsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    MatSliderModule,
    NgApexchartsModule,
    NgxSliderModule,
    TranslateModule,
    SwiperModule,
    GoogleMapsModule,
    BrowserModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  exports: [
    MainComponent,
    ProjectsComponent,
    FavouritesComponent,
    CalenderComponent,
    ReportsComponent,
  ],
})
export class MenuModule {}
