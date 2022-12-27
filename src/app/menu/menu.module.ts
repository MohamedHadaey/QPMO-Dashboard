import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CalenderComponent } from './components/calender/calender.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { ReportsComponent } from './components/reports/reports.component';
import { RouterModule } from '@angular/router';
import {  ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';

import { GoogleMapsModule } from '@angular/google-maps';
//import { AgmCoreModule } from '@agm/core/lib/core.module';

// import { CalendarModule, DateAdapter } from 'angular-calendar';
// import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
// from angular material
import { MatSliderModule } from '@angular/material/slider';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
// npm
// import swiper
import { SwiperModule } from "swiper/angular";

// my trail to add calender cards
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';

// import ApexCharts for charts
import { NgApexchartsModule } from "ng-apexcharts";



@NgModule({
  declarations: [
    MainComponent,
    ProjectsComponent,
    CalenderComponent,
    FavouritesComponent,
    ReportsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SwiperModule,
    SharedModule,
    MatSliderModule,
    NgApexchartsModule,
    NgxSliderModule,
    TranslateModule,
    CalendarModule
    // CalendarModule.forRoot({
    //   provide: DateAdapter,
    //   useFactory: adapterFactory,
    // }),
  ],
  exports: [
    MainComponent,
    ProjectsComponent,
    FavouritesComponent,
    CalenderComponent,
    ReportsComponent
  ]

})
export class MenuModule { }
