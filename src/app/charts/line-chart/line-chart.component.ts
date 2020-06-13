import { Component, OnInit } from '@angular/core';
import { LINECHART_COLORS } from '../../shared/chart.colors';

const LINECHART_SAMPLE_DATA: any[] = [
  { data: [32, 14, 46, 23, 38, 56], label: 'Sentiment Analysis'},
  { data: [12, 18, 40, 13, 28, 26], label: 'Image Recognition'},
  { data: [52, 44, 66, 53, 68, 62], label: 'Forecasting'},
];

const LINECHART_SAMPLE_LABELS: string[] = ['Jan','Feb','Mar','Apr','May','Jun'];

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  constructor() { }

  public lineChartData: any[] = LINECHART_SAMPLE_DATA;
  public lineChartLabels: string[] = LINECHART_SAMPLE_LABELS;
  public lineChartOptions: any = {
    responsive: true
  };

  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
  public lineChartColors: any[] = LINECHART_COLORS;

  ngOnInit(): void {
  }

}
