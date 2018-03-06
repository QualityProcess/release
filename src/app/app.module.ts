// core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatDialogModule, MatGridListModule, MatSnackBarModule, MatToolbarModule, MatIconModule, MatTableModule, MatMenuModule } from '@angular/material';

// routing 
import { routing } from './routing';

// guard
import { AuthGuard } from './guard/auth.guard';

// services
import { AuthService, UserService } from './services';

// used to create fake backend
import { fakeBackendProvider } from './helpers/fake-backend';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

// components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RoutingModule } from './routing.module';
import { HomeComponent } from './components/home/home.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { RegistrationComponent } from './components/registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ResetPasswordComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    routing,
    MatButtonModule, MatCheckboxModule, RoutingModule, MatGridListModule, MatSnackBarModule, MatIconModule, MatTableModule, MatToolbarModule, MatMenuModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    UserService,


    // providers used to create fake backend
    //fakeBackendProvider,
    //MockBackend,
    //BaseRequestOptions 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
