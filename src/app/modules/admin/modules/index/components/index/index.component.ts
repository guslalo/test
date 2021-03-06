import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { CurrentUserService } from 'src/app/services/current-user.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  public currentUser: any = {};

  public multi = [
    {
      name: 'ejemplo 1',
      series: [
        {
          name: '2010',
          value: 7300000,
        },
        {
          name: '2011',
          value: 8940000,
        },
      ],
    },

    {
      name: 'ejemplo 2',
      series: [
        {
          name: '2010',
          value: 7870000,
        },
        {
          name: '2011',
          value: 8270000,
        },
      ],
    },
    {
      name: 'ejemplo 3',
      series: [
        {
          name: '2010',
          value: 7870000,
        },
        {
          name: '2011',
          value: 8270000,
        },
      ],
    },
  ];

  view: any[] = [700, 300];

  // options
  legend = true;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = '';
  yAxisLabel = '';
  timeline = true;
  legendTitle = ''

  colorScheme = {
    domain: ['#3976ea', '#6fbfa7', '#7f62c4', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  constructor(public currentUserService: CurrentUserService, private transloco: TranslocoService) {
    
    Object.assign(this.multi);
  }

  ngOnInit(): void {
    this.xAxisLabel = this.transloco.translate('dashboard.charts.xAxis.label');
    this.yAxisLabel = this.transloco.translate('dashboard.charts.yAxis.label')
    this.legendTitle = this.transloco.translate('dashboard.charts.legend.label')
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  onSelect(event) {
    console.log(event);
  }
}
