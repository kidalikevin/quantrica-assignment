import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserResolverService } from './services/user-resolver.service';
import { UserServiceService } from './services/user-service.service';
import { AuthGuardService } from './services/auth-guard.service';
import { UploadServiceService } from './services/upload-service.service';
import { ProductuploadComponent } from './productupload/productupload.component';
import { RegisterComponent } from './register/register.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SinglproductComponent } from './products/singlproduct/singlproduct.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProductsComponent,
    LoginComponent,
    DashboardComponent,
    ProductuploadComponent,
    RegisterComponent,
    NavigationComponent,
    SinglproductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule
  ],
  providers: [AuthGuardService, UserServiceService, UserResolverService, UploadServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
