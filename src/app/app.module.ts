import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BurgerComponent } from './burger/BurgerComponent';
import { UserComponent } from './user/user.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BurgerDetailComponent } from './burger-detail/burger-detail.component';
import { AdminComponent } from './admin/admin.component';
import { EditBurgerComponent } from './edit-burger/edit-burger.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    BurgerComponent,
    UserComponent,
    RegisterComponent, // Assurez-vous que RegisterComponent est déclaré
    LoginComponent, BurgerDetailComponent, AdminComponent, EditBurgerComponent, OrdersListComponent, StatisticsComponent // Assurez-vous que LoginComponent est déclaré
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
