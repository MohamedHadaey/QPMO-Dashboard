import { Component, OnInit, ViewChild } from '@angular/core';
import * as ApexCharts from 'apexcharts';

import { AuthService } from 'src/app/auth/services/auth.service';
declare const $: any;
import {
  ApexChart
} from "ng-apexcharts";
// end:: using charts



@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  ChartSeries: ApexNonAxisChartSeries = [26,16,18,40];
  ChartDetails: ApexChart = {
    type: "donut",
    toolbar: {
      show: true
    }
  };

  // chartLabels = [" إنارة طرق " , " طرق " , " صرف صحى " , " كبارى "];

  chartDetails: ApexDataLabels = {
    enabled: false
  }

  /******************** */
  employees:number = 25;
  workers:number = 8500 ;
  completed:number = 6000;
  completedText:boolean = true
  constructor(private _AuthService:AuthService) {
  }

  ngOnInit(): void {
  }


  // this function to log out
  logOut() {
    this._AuthService.logout();
  }

    // handle change in completing projects
    handleCompleting(event:any) {
      if(event.target.checked == false) {
        this.completed = 4500;
        this.completedText = false
      }else {
        this.completed = 6000;
        this.completedText = true
      }
    }
}
