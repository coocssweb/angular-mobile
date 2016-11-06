import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from "@angular/router";


import {SceneListComponent} from "./scene-list/scene-list.component";
import {SceneService} from "../../service/scene.service";
import {PhotoRawComponent} from "./photo-raw/photo-raw.component";
import {PhotoRawService} from "../../service/photo-raw.service";
import {MyGuidanceComponent} from "../common/my-guidance/my-guidance.component";
import {BigPhotoComponent} from "./big-photo/big-photo.component";
import {PhotoRaw2Component} from "./photo-raw2/photo-raw2.component";
import {DyToastrComponent} from "../common/toastr/dy-toastr.component";

@NgModule({
  declarations: [
    SceneListComponent,
    PhotoRawComponent,
    PhotoRaw2Component,
    MyGuidanceComponent,
    BigPhotoComponent,
    DyToastrComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'photo-raw2',
        component: PhotoRaw2Component
      },
      {
        path: 'photo-raw',
        component: SceneListComponent
      }
    ])
  ],
  providers: [
    SceneService,
    PhotoRawService
  ],
  entryComponents: [
    DyToastrComponent
  ],
  bootstrap: [

  ]
})
export class SelectModule {

}
