import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserResolverService } from './services/user-resolver.service';
import { RegisterComponent } from './register/register.component';
import { SinglproductComponent } from './products/singlproduct/singlproduct.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'home' } },
  { path: 'login', component: LoginComponent, data: { animation: 'login' } },
  { path: 'register', component: RegisterComponent, data: { animation: 'register' } },
  { path: 'dashboard', component: DashboardComponent, resolve: { data: UserResolverService}, data: { animation: 'dashboard' } },
  { path: 'product/:id', component: SinglproductComponent, resolve: { data: UserResolverService}, data: { animation: 'singleproduct' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
