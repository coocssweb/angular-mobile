import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AppComponent} from "./app.component";
import {IndexComponent} from "./components/index/index.component";
import {SceneFormComponent} from "./components/scene/scene-form.component";
import {PhotosComponent} from "./components/photos/photos.component";
import {MyDialogComponent} from "./common/dialog/my-dialog.component";
import {ConfirmComponent} from "./common/confirm/confirm.component";
import {TabsComponent} from "./common/tabs/tabs.component";
import {TabItemComponent} from "./common/tabs/tabItem.component";
import {PaginationComponent} from "./common/pagination/pagination.component";
import {CheckedComponent} from "./components/checked/checked.component";
import {MessageComponent} from "./common/message/message.component";
import {ViewerComponent} from "./components/viewer/viewer.component";
import {TipComponent} from "./common/tip/tip.component";
import {HttpModule, JsonpModule} from "@angular/http";
@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    SceneFormComponent,
    PhotosComponent,
    MyDialogComponent,
    ConfirmComponent,
    TabsComponent,
    TabItemComponent,
    PaginationComponent,
    CheckedComponent,
    MessageComponent,
    ViewerComponent,
    TipComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot([
      {path: 'raw/:photoinfoid', component: PhotosComponent}
    ]),
    RouterModule.forChild([])
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule {
}
