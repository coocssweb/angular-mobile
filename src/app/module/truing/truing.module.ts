import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {PhotoTruingService} from "../../service/photo-truing.service";
import {PhotoTruingComponent} from "./photo-truing.component.ts/photo-truing.component";

@NgModule({
  declarations: [
    PhotoTruingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    PhotoTruingService
  ],
  bootstrap: [

  ]
})
export class TruingModule {

}
