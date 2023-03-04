import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as ApexCharts from 'apexcharts';
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid,
} from 'ng-apexcharts';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
type ApexXAxis = {
  type?: 'category' | 'datetime' | 'numeric';
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
import { MenuService } from '../../services/menu.service';
declare const $: any;

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  completeText_en: string = 'Completed';
  unCompleteText_en: string = 'not complete';
  completeText_ar: string = 'مكتملة';
  unCompleteText_ar: string = 'غير مكتملة';
  currentLanguage: any = localStorage.getItem('currentLanguage');
  /*************************/
  @ViewChild('chart') chart!: ChartComponent;
  public statechartOptions: Partial<ChartOptions> | any;
  public archivechartOptions: Partial<ChartOptions> | any;

  /*************************/
  Catcount: number[] = [];
  Category: string[] = [];
  typeChartSeries: ApexNonAxisChartSeries = this.Catcount;
  typeChartDetails: ApexChart = {
    type: 'donut',
    height: 1000,

    toolbar: {
      show: false,
    },
  };

  typechartDetails: ApexDataLabels = {
    enabled: true,
  };
  /******************** */
  employees: number = 25;
  workers: number = 8500;
  completed: number = 6000;
  completedText: boolean = true;
  count: number[] = [];
  status: string[] = [];

  addedOn_month: number[] = [];
  addedOn_count: number[] = [];
  endedOn_month: number[] = [];
  endedOn_count: number[] = [];
  constructor(
    private _AuthService: AuthService,
    private _MenuService: MenuService,
    private translate: TranslateService,
    private datePipe: DatePipe
  ) {
    /* state projects  chart */
    this.statechartOptions = {
      series: [
        {
          name: ' ',
          data: this.count,
        },
      ],
      chart: {
        height: 250,
        type: 'bar',
        events: {
          // click: function(chart, w, e) {
          //   console.log(chart, w, e)
          // }
        },
        toolbar: false,
      },
      colors: ['#4CB871', '#F5E306', '#F24773', , '#068DF5', '#CCCCCC'],
      plotOptions: {
        bar: {
          columnWidth: '10%',
          distributed: true,
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
      },
      legend: {
        show: false,
      },
      grid: {
        show: true,
      },
      xaxis: {
        categories: this.status,
        labels: {
          style: {
            colors: ['#4CB871', '#F5E306', '#F24773', , '#068DF5', '#CCCCCC'],
            fontSize: '14px',
          },
        },
      },
    };

    if (localStorage.getItem('currentLanguage') == 'ar-sa') {
      /* archive projects chart */
      this.archivechartOptions = {
        series: [
          {
            name: 'غير مكتملة',
            data: this.addedOn_count,
          },
          {
            name: 'مكتملة',
            data: this.endedOn_count,
          },
        ],
        chart: {
          height: 350,
          type: 'area',
          zoom: {
            enabled: false,
          },
          toolbar: false,
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        xaxis: {
          type: 'date',
          categories: [
            ' Jan ',
            ' Feb ',
            ' Mar ',
            ' Apr ',
            ' May ',
            ' Jun ',
            ' Jul ',
            ' Aug ',
            ' Sep ',
            ' Oct ',
            ' Nov ',
            ' Dec ',
          ],
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy',
          },
        },
      };
    } else {
      /* archive projects chart */
      this.archivechartOptions = {
        series: [
          {
            name: 'not complete',
            data: this.addedOn_count,
          },
          {
            name: 'Completed',
            data: this.endedOn_count,
          },
        ],
        chart: {
          height: 350,
          type: 'area',
          zoom: {
            enabled: false,
          },
          toolbar: false,
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        xaxis: {
          type: 'date',
          categories: [
            ' Jan ',
            ' Feb ',
            ' Mar ',
            ' Apr ',
            ' May ',
            ' Jun ',
            ' Jul ',
            ' Aug ',
            ' Sep ',
            ' Oct ',
            ' Nov ',
            ' Dec ',
          ],
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy',
          },
        },
      };
    }
  }

  ngOnInit(): void {
    this.getData();
    this.getStatus();
    this.getCategory();
    // this.getCategory_form("01/01/2022","01/01/2023");
    this.getTracking();
  }

  // this function to log out
  logOut() {
    this._AuthService.logout();
  }

  ProjectArchived: number = 0;
  ArchivedCorrectly: number = 0;
  ArchivedInCorrectly: number = 0;
  ProjectNotLaunched: number = 0;

  getData(): void {
    this._MenuService.GetStatistics_ProjectArchived().subscribe((Response) => {
      this.ProjectArchived = Response.data;
    });
    this._MenuService
      .GetStatistics_ArchivedCorrectly()
      .subscribe((response) => {
        this.ArchivedCorrectly = response.data;
      });
    this._MenuService
      .GetStatistics_ArchivedInCorrectly()
      .subscribe((response) => {
        this.ArchivedInCorrectly = response.data;
      });
    this._MenuService
      .GetStatistics_ProjectNotLaunched()
      .subscribe((response) => {
        this.ProjectNotLaunched = response.data;
      });
  }

  getStatus() {
    this._MenuService.GetStatistics_ProjectByStatus().subscribe((response) => {
      console.log('res', response);

      for (let index = 0; index < response.data.length; index++) {
        const element = response.data[index];
        this.status[index] = element.Status;
        this.count[index] = element.Count;
      }

      this.statechartOptions = {
        series: [
          {
            name: ' ',
            data: this.count,
          },
        ],
        chart: {
          height: 250,
          type: 'bar',
          events: {
            // click: function(chart, w, e) {
            //   console.log(chart, w, e)
            // }
          },
          toolbar: false,
        },
        colors: ['#F5E306', '#F24773', '#4CB871', '#068DF5', '#CCCCCC'],
        plotOptions: {
          bar: {
            columnWidth: '10%',
            distributed: true,
            endingShape: 'rounded',
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 2,
        },
        legend: {
          show: false,
        },
        grid: {
          show: true,
        },
        xaxis: {
          categories: this.status,
          labels: {
            style: {
              colors: ['#F5E306', '#F24773', '#4CB871', '#068DF5', '#CCCCCC'],
              fontSize: '14px',
            },
          },
        },
      };
    });
  }

  getCategory(): void {
    this._MenuService
      .GetStatistics_ProjectByCategory()
      .subscribe((response) => {
        for (let index = 0; index < response.data.length; index++) {
          const element = response.data[index];
          this.Category[index] = element.Category;
          this.Catcount[index] = element.Count;
        }
        this.typeChartSeries = this.Catcount;
        this.typeChartDetails = {
          type: 'donut',
          toolbar: {
            show: false,
          },
        };

        this.typechartDetails = {
          enabled: true,
        };
      });
  }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  currentPeriodClicked(val: any) {
    console.log(this.datePipe.transform(val.start, 'yyyy-MM-dd'));
    this.getCategory_form(
      this.datePipe.transform(val.start, 'yyyy-MM-dd'),
      this.datePipe.transform(val.end, 'yyyy-MM-dd')
    );
  }

  // from:Date | null = null;
  // to:Date | null = null;
  getCategory_form(from: any, to: any): void {
    this._MenuService
      .GetStatistics_ProjectByCategory_form(from, to)
      .subscribe((response) => {
        console.log(response);
        for (let index = 0; index < response.data.length; index++) {
          const element = response.data[index];
          this.Category[index] = element.Category;
          this.Catcount[index] = element.Count;
        }
        this.typeChartSeries = this.Catcount;
        this.typeChartDetails = {
          type: 'donut',
          toolbar: {
            show: false,
          },
        };

        this.typechartDetails = {
          enabled: true,
        };
      });
  }

  getTracking() {
    this._MenuService.GetStatistics_ProjectTracking().subscribe((response) => {
      console.log(response.data);
      for (let index = 1; index <= 12; index++) {
        let monthExist_Data = (
          response.data.Added_Projects as DataStatatic[]
        ).find((id) => id.Month == index);
        this.addedOn_month[index - 1] = index;
        if (monthExist_Data == undefined) {
          this.addedOn_count[index - 1] = 0;
        } else {
          this.addedOn_count[index - 1] = monthExist_Data.Count;
        }
      }
      for (let index2 = 1; index2 <= 12; index2++) {
        let monthExist_Data = (
          response.data.Ended_Projects as DataStatatic[]
        ).find((id) => id.Month == index2);
        this.endedOn_month[index2 - 1] = index2;
        if (monthExist_Data == undefined) {
          this.endedOn_count[index2 - 1] = 0;
        } else {
          this.endedOn_count[index2 - 1] = monthExist_Data.Count;
        }
      }

      if (localStorage.getItem('currentLanguage') == 'ar-sa') {
        /* archive projects chart */
        this.archivechartOptions = {
          series: [
            {
              name: 'غير مكتملة',
              data: this.addedOn_count,
            },
            {
              name: 'مكتملة',
              data: this.endedOn_count,
            },
          ],
          chart: {
            height: 350,
            type: 'area',
            zoom: {
              enabled: false,
            },
            toolbar: false,
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: 'smooth',
          },
          xaxis: {
            type: 'date',
            categories: [
              ' Jan ',
              ' Feb ',
              ' Mar ',
              ' Apr ',
              ' May ',
              ' Jun ',
              ' Jul ',
              ' Aug ',
              ' Sep ',
              ' Oct ',
              ' Nov ',
              ' Dec ',
            ],
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy',
            },
          },
        };
      } else {
        /* archive projects chart */
        this.archivechartOptions = {
          series: [
            {
              name: 'not complete',
              data: this.addedOn_count,
            },
            {
              name: 'Completed',
              data: this.endedOn_count,
            },
          ],
          chart: {
            height: 350,
            type: 'area',
            zoom: {
              enabled: false,
            },
            toolbar: false,
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: 'smooth',
          },
          xaxis: {
            type: 'date',
            categories: [
              ' Jan ',
              ' Feb ',
              ' Mar ',
              ' Apr ',
              ' May ',
              ' Jun ',
              ' Jul ',
              ' Aug ',
              ' Sep ',
              ' Oct ',
              ' Nov ',
              ' Dec ',
            ],
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy',
            },
          },
        };
      }
    });
  }
}
export class DataStatatic {
  Count: number = 0;
  Month: number = 0;
}
