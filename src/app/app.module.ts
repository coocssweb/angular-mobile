import {BrowserModule, Title} from "@angular/platform-browser";
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
import {OrderDetailComponent} from "./modules/order/detail/order-detail.component";
import {OrderFlowComponent} from "./modules/order/flow/order-flow.component";
import {ShopComponent} from "./modules/shop/shop.component";
import {AdviceComponent} from "./modules/advice/advice.component";
import {UserInfoComponent} from "./modules/user-info/user-info.component";
import {AppointmentComponent} from "./modules/appointment/appointment.component";
import {BindingComponent} from "./modules/user-info/binding/binding.component";
import {NgSelectComponent} from "./common/ng-select/ng-select.component";
import {ErrorComponent} from "./common/error/error.component";
import {BrandService} from "./services/brand.service";
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
    OrderDetailComponent,
    OrderFlowComponent,
    ShopComponent,
    AdviceComponent,
    UserInfoComponent,
    AppointmentComponent,
    BindingComponent,
    NgSelectComponent,
    ErrorComponent
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
    LoggerService,
    BrandService,
    Title
  ],
  bootstrap: [AppComponent]
})


export class AppModule {
}
