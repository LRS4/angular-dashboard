import { NgModule } from '@angular/core';
import { SectionSalesComponent } from '../app/sections/section-sales/section-sales.component';
import { SectionOrdersComponent } from '../app/sections/section-orders/section-orders.component';
import { SectionHealthComponent } from '../app/sections/section-health/section-health.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'sales', component: SectionSalesComponent },
  { path: 'orders', component: SectionOrdersComponent },
  { path: 'health', component: SectionHealthComponent },
  { path: '', redirectTo: '/sales', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
