import { Component, OnInit, Input } from '@angular/core';
import { __values } from 'tslib';
import { THEME_COLORS } from '../../shared/theme.colors';
var _ = require('lodash');

const theme = 'Bright';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  constructor() { }

  @Input() inputData: any;
  @Input() limit: number;

  public pieChartData: number[];
  public pieChartLabels: string[];

  public colors: any[] = [
    {
      backgroundColor: this.themeColors(theme),
      borderColor: '#111'
    }
  ];

  public pieChartType: string = 'doughnut';

  ngOnInit(): void {
    this.parseChartData(this.inputData, this.limit);
  }

  parseChartData(res: any, limit?: number) {
    const allData = res.slice(0, limit);
    this.pieChartData = allData.map(x =>  _.values(x)[1]);
    this.pieChartLabels = allData.map(x => _.values(x)[0]);
  }

  themeColors(setName:string): string[] {
    const colors = THEME_COLORS.slice(0)
      .find(set => set.name === setName).colorSet;
    return colors;
  }

}
