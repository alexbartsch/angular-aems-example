import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AngularAemsModule } from 'angular-aems';

import { AppComponent } from './app.component';
import { fakeBackendProvider } from './_helpers/fake-backend';

import { CustomerService } from './_services/customer.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,

    AngularAemsModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    CustomerService,

    // provider used to create fake backend
    fakeBackendProvider
  ]
})
export class AppModule {
}
