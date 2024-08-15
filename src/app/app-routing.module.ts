import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BurgerComponent } from './burger/BurgerComponent';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './model/auth.guard';
import { BurgerDetailComponent } from './burger-detail/burger-detail.component';
import { AdminComponent } from './admin/admin.component';
import { EditBurgerComponent } from './edit-burger/edit-burger.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
  { path: 'burger', component: BurgerComponent },
  { path: 'user', component: UserComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'protected-route', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'burgers/edit/:id', component: EditBurgerComponent, canActivate: [AuthGuard] },
  { path: 'admin/orders', component: OrdersListComponent, canActivate: [AuthGuard] },
  { path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'admin-dashboard', component: UserComponent },
  { path: 'user-dashboard', component: BurgerComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'burgers/:id', component: BurgerDetailComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
