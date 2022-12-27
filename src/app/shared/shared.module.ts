import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchComponent } from './components/search/search.component';
import { SliderComponent } from './components/slider/slider.component';
import { LanguageComponent } from './components/language/language.component';
import { TogglerComponent } from './components/toggler/toggler.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgChartsModule } from 'ng2-charts';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
// import swiper
import { SwiperModule } from "swiper/angular";


@NgModule({
  declarations: [
    NavbarComponent,
    SearchComponent,
    SliderComponent,
    LanguageComponent,
    TogglerComponent,
    ProjectDetailsComponent,

  ],
  imports: [
    CommonModule,
    TranslateModule,
    NgChartsModule,
    SwiperModule
  ],
  exports: [
    NavbarComponent,
    SearchComponent,
    SliderComponent,
    LanguageComponent,
    TogglerComponent,
    ProjectDetailsComponent,

  ]
})
export class SharedModule { }
