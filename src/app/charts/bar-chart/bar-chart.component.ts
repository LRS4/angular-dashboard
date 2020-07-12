import { Component, OnInit } from '@angular/core';
import { SalesDataService } from 'src/app/services/sales-data.service';
import * as moment from 'moment';

// const SAMPLE_BARCHART_DATA: any[] = [
//   { data: [65, 59, 80, 81, 56, 54, 30], label: 'Q3 Sales' },
//   { data: [65, 59, 80, 81, 56, 54, 30], label: 'Q4 Sales' }
// ];

// const SAMPLE_BARCHART_LABELS: string[] = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7' ]

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  constructor(private _salesDataService: SalesDataService) { }

  orders: any;
  orderLabels: string[];
  orderData: number[];

  /* Data bindings for component */
  public barChartData: any[];
  public barChartLabels: string[];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  }

  ngOnInit(): void {
    this._salesDataService.getOrders(1, 100)
      .subscribe(res => {
        //console.log(res['page']['data']);
        const localChartData = this.getChartData(res);
        this.barChartLabels = localChartData.map(x => x[0]).reverse();
        this.barChartData = [{ 'data': localChartData.map(x => x[1]), 'label': 'Sales' }];
      });
  }

  getChartData(res: Object) {
    this.orders = res['page']['data'];
    const data = this.orders.map(o => o.total);
    // const labels = this.orders.map(o => moment(new Date(o.placed)).format('YY-MM-DD'));
    
    const formattedOrders = this.orders.reduce((arr, current) => {
      arr.push([moment(current.placed).format('YY-MM-DD'), current.total]);
      return arr;
    }, [])

    const chartData = this.groupTotalsByDate(formattedOrders);
    console.log("Grouped orders: ", chartData);

    return chartData;
  }

  groupTotalsByDate(formattedOrders: any): Object[] {
    const p = [];
    console.log("Formatted orders: ", formattedOrders);

    return formattedOrders.reduce((arr, current) => {
      const key = current[0]; 

      // If p array doesn't have date, add it
      // If it does, add total to that date to group it
      if (!p[key]) {
        p[key] = current;
        arr.push(p[key]);
      } else {
        p[key][1] += current[1];
      }
      return arr;
    }, []);
  } 



}
