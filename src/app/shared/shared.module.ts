import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageComponent } from './components/language/language.component';
import { TogglerComponent } from './components/toggler/toggler.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgChartsModule } from 'ng2-charts';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
// import swiper
import { SwiperModule } from "swiper/angular";
import { BrowserModule } from '@angular/platform-browser';
import { ProjectComponent } from './components/project/project.component';
// angular material date picker
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from "@angular/material/input";
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    LanguageComponent,
    TogglerComponent,
    ProjectDetailsComponent,
    ProjectComponent,

  ],
  imports: [
    CommonModule,
    TranslateModule,
    NgChartsModule,
    BrowserModule,
    SwiperModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    
  ],
  exports: [
    LanguageComponent,
    TogglerComponent,
    ProjectDetailsComponent,
    ProjectComponent

  ]
})
export class SharedModule { }
