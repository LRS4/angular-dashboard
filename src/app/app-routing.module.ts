import { NgModule } from '@angular/core';
import { SectionSalesComponent } from '../app/sections/section-sales/section-sales.component';
import { SectionOrdersComponent } from '../app/sections/section-orders/section-orders.component';
import { SectionHealthComponent } from '../app/sections/section-health/section-health.component';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';


const routes: Routes = [
  { path: 'sales', component: SectionSalesComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: SectionOrdersComponent, canActivate: [AuthGuard] },
  { path: 'health', component: SectionHealthComponent, canActivate: [AuthGuard] },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'admin', component: AdminPanelComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin']} },
  { 
    path: 'user', component: UserComponent,
    children: [
      { path: 'register', component: RegistrationComponent },
      { path: 'login', component: LoginComponent }
    ] 
  },
  { path: '', redirectTo: '/sales', pathMatch: 'full', canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
