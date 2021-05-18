import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CookieModule } from 'ngx-cookie';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatListModule } from '@angular/material/list';

import { LayoutModule } from '@angular/cdk/layout';
import { ChartComponent } from './components/chart/chart.component';
import { CardComponent } from './components/card/card.component';
import { DialogDateComponent } from './components/dialog-date/dialog-date.component';
import { SigninComponent } from './components/signin/signin.component';
import { DialogPinComponent } from './components/dialog-pin/dialog-pin.component';
import { HttpInterceptorsService } from './services/http-interceptors.service';



import { ConnectionServiceModule } from 'ng-connection-service';
import { MainComponent } from './components/main/main.component';
import { SignupComponent } from './components/signup/signup.component';
import { DialogConfirmComponent } from './components/dialog-confirm/dialog-confirm.component';
import { DialogMcuTokenComponent } from './components/dialog-mcu-token/dialog-mcu-token.component';
import { DialogChangePasswordComponent } from './components/dialog-change-password/dialog-change-password.component';
import { DialogActionComponent } from './components/dialog-action/dialog-action.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    CardComponent,
    DialogDateComponent,
    SigninComponent,
    DialogPinComponent,
    MainComponent,
    SignupComponent,
    DialogConfirmComponent,
    DialogMcuTokenComponent,
    DialogChangePasswordComponent,
    DialogActionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ConnectionServiceModule,
    CookieModule.forRoot(),
    ClipboardModule,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatProgressBarModule,
    MatListModule,

    LayoutModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:10000'
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorsService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
