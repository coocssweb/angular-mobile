import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import {SceneListComponent} from "./scene-list/scene-list.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: SceneListComponent
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class SelectRoutingModule {}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
