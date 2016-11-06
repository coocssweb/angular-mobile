import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import {SelectModule} from "./module/select/select.module";
import {HeaderTopComponent} from "./module/common/header-top/header-top.component";
import {TruingModule} from "./module/truing/truing.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderTopComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    SelectModule,
    TruingModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
