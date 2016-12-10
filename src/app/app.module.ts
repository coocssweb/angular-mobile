import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";
import {IndexComponent} from "./components/index/index.component";
import {SceneFormComponent} from "./components/scene/scene-form.component";
import {PhotosComponent} from "./components/photos/photos.component";
import {MyDialogComponent} from "./common/dialog/my-dialog.component";
import {ConfirmComponent} from "./common/confirm/confirm.component";
import {TabsComponent} from "./common/tabs/tabs.component";
import {TabItemComponent} from "./common/tabs/tabItem.component";
import {PaginationComponent} from "./common/pagination/pagination.component";
import {MessageComponent} from "./common/message/message.component";
import {ViewerComponent} from "./components/viewer/viewer.component";
import {PCViewerComponent} from "./components/pc-viewer/pc-viewer.component";
import {TipComponent} from "./common/tip/tip.component";
import {LoadingComponent} from "./common/loading/loading.component";
import {SuccessComponent} from "./common/success/success.component";
import {TruingsComponent} from "./components/truings/truings.component";
import {FeedbackComponent} from "./components/feedback/feedback.component";
import {PcFeedbackComponent} from "./components/pc-feedback/pc-feedback.component";
import {PcPhotoComponent} from "./common/pc-photo/pc-photo.component";
import {PhotoComponent} from "./common/photo/photo.component";
import {HttpModule, JsonpModule} from "@angular/http";
import {LoginComponent} from "./components/login/login.component";
import {LoggerService} from "./services/logger.service";
import {ForbiddenComponent} from "./components/forbidden/forbidden.component";
import {CacheService} from "./services/cache.service";
import {AppRoutingModule} from "./app-routing.module";
import {MyOrdersComponent} from "./modules/order/my-orders/my-orders.component";
import {OrderDetailComponent} from  "./modules/order/detail/order-detail.component";
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
    LoginComponent,
    ForbiddenComponent,
    MyOrdersComponent,
    OrderDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule
  ],
  providers: [
    CacheService,
    LoggerService
  ],
  bootstrap: [AppComponent]
})


export class AppModule {
}
