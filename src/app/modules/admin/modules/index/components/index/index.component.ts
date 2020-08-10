import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})



export class IndexComponent implements OnInit {

  public multi =  [
    {
      "name": "ejemplo 1",
      "series": [
        {
          "name": "2010",
          "value": 7300000
        },
        {
          "name": "2011",
          "value": 8940000
        } 
      ]
    },
  
    {
      "name": "ejemplo 2",
      "series": [
        {
          "name": "2010",
          "value": 7870000
        },
        {
          "name": "2011",
          "value": 8270000
        }
      ]
    },
    {
      "name": "ejemplo 3",
      "series": [
        {
          "name": "2010",
          "value": 7870000
        },
        {
          "name": "2011",
          "value": 8270000
        }
      ]
    }
  ];

  view: any[] = [700, 300];
 
  

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#3976ea', '#6fbfa7', '#7f62c4', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  
  constructor() {
    Object.assign(this.multi);
   }

  ngOnInit(): void {
  }
  onSelect(event) {
    console.log(event);
  }
}