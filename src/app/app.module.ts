import {BrowserModule} from "@angular/platform-browser"
import {NgModule} from "@angular/core"
import {FormsModule} from "@angular/forms"
import {RouterModule} from "@angular/router"
import {AppComponent} from "./app.component"
import {IndexComponent} from "./components/index/index.component"
import {SceneFormComponent} from "./components/scene/scene-form.component"
import {PhotosComponent} from "./components/photos/photos.component"
import {MyDialogComponent} from "./common/dialog/my-dialog.component"
import {ConfirmComponent} from "./common/confirm/confirm.component"
import {TabsComponent} from "./common/tabs/tabs.component"
import {TabItemComponent} from "./common/tabs/tabItem.component"
import {PaginationComponent} from "./common/pagination/pagination.component"
import {MessageComponent} from "./common/message/message.component"
import {ViewerComponent} from "./components/viewer/viewer.component"
import {PCViewerComponent} from './components/pc-viewer/pc-viewer.component'
import {TipComponent} from "./common/tip/tip.component"
import {LoadingComponent} from './common/loading/loading.component'
import {SuccessComponent} from './common/success/success.component'
import {TruingsComponent} from './components/truings/truings.component'
import {FeedbackComponent} from './components/feedback/feedback.component'
import {PcFeedbackComponent} from './components/pc-feedback/pc-feedback.component'
import {PcPhotoComponent} from './common/pc-photo/pc-photo.component'
import {PhotoComponent} from './common/photo/photo.component'
import {HttpModule, JsonpModule} from "@angular/http"
import {HashLocationStrategy, LocationStrategy} from "@angular/common"
import {ForbiddenComponent} from "./components/forbidden/forbidden.component";

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
    MessageComponent,
    ViewerComponent,
    TipComponent,
    LoadingComponent,
    SuccessComponent,
    TruingsComponent,
    FeedbackComponent,
    PcFeedbackComponent,
    PcPhotoComponent,
    PhotoComponent,
    PCViewerComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot([
      {path: 'raw/:photoinfoid', component: PhotosComponent},
      {path: 'raw/:photoinfoid/:status', component: PhotosComponent},
      {path: 'truing/:photoinfoid', component: TruingsComponent},
      {path:'forbidden',component: ForbiddenComponent}
    ]),
    RouterModule.forChild([])
  ],
  exports: [
    RouterModule
  ],
  providers: [{
    provide: LocationStrategy, // 导航路径的策略设置
    useClass: HashLocationStrategy // 使用'#'方式的策略
  }],
  bootstrap: [AppComponent]
})


export class AppModule {
}
