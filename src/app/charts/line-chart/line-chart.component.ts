import { Component, OnInit } from '@angular/core';
import { LINECHART_COLORS } from '../../shared/chart.colors';
import { SalesDataService } from 'src/app/services/sales-data.service';
import * as moment from 'moment';

// const LINECHART_SAMPLE_DATA: any[] = [
//   { data: [32, 14, 46, 23, 38, 56], label: 'Sentiment Analysis'},
//   { data: [12, 18, 40, 13, 28, 26], label: 'Image Recognition'},
//   { data: [52, 44, 66, 53, 68, 62], label: 'Forecasting'},
// ];

// const LINECHART_SAMPLE_LABELS: string[] = ['Jan','Feb','Mar','Apr','May','Jun'];

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  constructor(private _salesDataService: SalesDataService) { }

  topCustomers: string[];
  allOrders: any[];

  public lineChartData: any[];
  public lineChartLabels: string[];
  public lineChartOptions: any = {
    responsive: true
  };

  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
  public lineChartColors: any[] = LINECHART_COLORS;

  ngOnInit(): void {
    this._salesDataService.getOrders(1, 100)
      .subscribe(res => {
        this.allOrders = res['page']['data'];
        console.log("allOrders", this.allOrders);

        this._salesDataService.getOrdersByCustomer(3)
          .subscribe(cus => {
            this.topCustomers = cus.map(x => x['name']);
            
            const allChartData = this.topCustomers.reduce((result, i) => {
              result.push(this.getChartData(this.allOrders, i));
              return result;
            }, []);

            let dates = this.getDates(allChartData);
            
            let customerOrdersByDate = this.getCustomerOrdersByDate(allChartData, dates)['data'];
            console.log(customerOrdersByDate);

            this.lineChartLabels = customerOrdersByDate[0]['orders'].map(order => order['date']);

            this.lineChartData = [
              { 'data': customerOrdersByDate[0].orders.map(order => order.total), 'label': customerOrdersByDate[0]['customer']},
              { 'data': customerOrdersByDate[1].orders.map(order => order.total), 'label': customerOrdersByDate[1]['customer']},
              { 'data': customerOrdersByDate[2].orders.map(order => order.total), 'label': customerOrdersByDate[2]['customer']}
            ]
          });
      });
  }

  getChartData(allOrders: any, customerName: string) {
    const customerOrders = this.filterOrdersByCustomer(allOrders, customerName);
    //console.log("customerName:", customerName, "customerOrders: ", customerOrders);

    const formattedOrders = customerOrders.reduce((acc, current) => {
      acc.push([current.placed, current.total]);
      return acc;
    }, []);

    return { customer: customerName, data: formattedOrders };
  }

  filterOrdersByCustomer(allOrders: any, customerName: string) {
    return allOrders.filter(o => o.customer.name === customerName);
  }

  getDates(allChartData: any[]) {
    let dates = allChartData.map(x => x['data']).reduce((acc, i) => {
      acc.push(i.map(o => new Date(o[0])));
      return acc;
    }, []);

    dates = [].concat.apply([], dates);

    return dates;
  }

  getCustomerOrdersByDate(orders: any, dates: any) {
    // for each customer -> for each date =>
    // { data: [{'customer': 'XYZ', 'orders', [{'date': '17-11-25', total: 2431}]}, {}, {}] }
    const customers = this.topCustomers;
    const prettyDates = dates.map(date => this.toFriendlyDate(date));
    const uniqueDates = Array.from(new Set(prettyDates)).sort();

    const result = {};
    const dataSets = result['data'] = [];

    customers.reduce((accCustomers, currentCustomer, i) => {
      //console.log('Reducing:', currentCustomer, 'at index:', i);
      const customerOrders = [];
      dataSets[i] = {
        customer: currentCustomer,
        orders: uniqueDates.reduce((accDates, currentDate, j) => {
          const obj = {};
          obj['date'] = currentDate;
          obj['total'] = this.getCustomerDateTotal(currentDate, currentCustomer);
          customerOrders.push(obj);
          //console.log('Reducing:', currentDate, 'at index:', j, 'customerOrders', customerOrders);
          return customerOrders;
        })
      }
      return accCustomers;
    }, []);

    return result;
  }

  toFriendlyDate(date: Date) {
    return moment(date).endOf('day').format('YY-MM-DD');
  }

  getCustomerDateTotal(date: any, customer: string) {
    const customerOrders = this.allOrders.filter(order => order.customer.name === customer 
      && this.toFriendlyDate(order.placed) === date);

    const summedOrders = customerOrders.reduce((a, b) => a + b.total, 0);

    return summedOrders;
  }
}
