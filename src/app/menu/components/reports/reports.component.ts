import { Component, OnInit, ViewChild } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid
} from "ng-apexcharts";


type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
};
// end:: using charts
import { AuthService } from 'src/app/auth/services/auth.service';
declare const $: any;


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  @ViewChild("chart") chart!: ChartComponent;
  public statechartOptions: Partial<ChartOptions> | any;
  public archivechartOptions: Partial<ChartOptions> | any;

  /*************************/
  typeChartSeries: ApexNonAxisChartSeries = [26,16,18,40];
  typeChartDetails: ApexChart = {
    type: "donut",
    toolbar: {
      show: false
    }
  };

  typechartDetails: ApexDataLabels = {
    enabled: true
  }
  /******************** */
  employees:number = 25;
  workers:number = 8500 ;
  completed:number = 6000;
  completedText:boolean = true
  constructor(private _AuthService:AuthService) {

    /* state projects  chart */
    this.statechartOptions = {
      series: [
        {
          name: " ",
          data: [80, 65, 85, 45, 5]
        }
      ],
      chart: {
        height: 250,
        type: "bar",
        events: {
          // click: function(chart, w, e) {
          //   console.log(chart, w, e)
          // }
        },
        toolbar: false
      },
      colors: [
        "#F5E306",
        "#F24773",
        "#4CB871",
        "#068DF5",
        "#CCCCCC"
      ],
      plotOptions: {
        bar: {
          columnWidth: "10%",
          distributed: true,
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 2
      },
      legend: {
        show: false
      },
      grid: {
        show: true
      },
      xaxis: {
        categories: [
          "مكتملة",
          "متأخرة",
          "تنتهي قريباً",
          "الحالية",
          "لم يتم التعميد"

        ],
        labels: {
          style: {
            colors: [
              "#F5E306",
              "#F24773",
              "#4CB871",
              "#068DF5",
              "#CCCCCC"
            ],
            fontSize: "14px"
          }
        }
      }
    };

    /* archive projects chart */
    this.archivechartOptions = {
      series: [
        {
          name: " غير مكتملة ",
          data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
          name: " مكتملة ",
          data: [11, 32, 45, 32, 34, 52, 41]
        }
      ],
      chart: {
        height: 350,
        type: "area",
        zoom: {
          enabled: false
        },
        toolbar: false
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "date",
        categories: [
          " Jan ",
          " Feb ",
          " Mar ",
          " Apr ",
          " May ",
          " Jun ",
          " Jul "
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy"
        }
      }
    };
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
