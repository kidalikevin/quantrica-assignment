import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserResolverService } from './services/user-resolver.service';
import { RegisterComponent } from './auth/register/register.component';
import { SinglproductComponent } from './pages/singlproduct/singlproduct.component';

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
