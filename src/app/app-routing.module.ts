import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import {SceneListComponent} from "./module/select/scene-list/scene-list.component";
import {PhotoTruingComponent} from "./module/truing/photo-truing.component.ts/photo-truing.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/index',
        pathMatch: 'full'
      },
      {
        path:"index",
        component: SceneListComponent
      },
      {
        path: 'select',
        loadChildren: 'app/module/select/select.module#SelectModule',
      },
      {
        path: 'truing',
        component: PhotoTruingComponent
      }
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: [

  ]
})
export class AppRoutingModule {}


/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */
