/**
 * Created by zoushuiyun on 2016/12/8.
 */
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {LoginComponent} from "./components/login/login.component";
import {PhotosComponent} from "./components/photos/photos.component";
import {TruingsComponent} from "./components/truings/truings.component";
import {ForbiddenComponent} from "./components/forbidden/forbidden.component";
import {MyOrdersComponent} from "./modules/order/my-orders/my-orders.component";
import {OrderDetailComponent} from  "./modules/order/detail/order-detail.component";
import {OrderFlowComponent} from  "./modules/order/flow/order-flow.component";
import {ShopComponent} from "./modules/shop/shop.component";
import {AdviceComponent} from "./modules/advice/advice.component";
import {UserInfoComponent} from "./modules/user-info/user-info.component";
import {AppointmentComponent} from "./modules/appointment/appointment.component";
import {BindingComponent} from "./modules/user-info/binding/binding.component";
import {ErrorComponent} from "./common/error/error.component";

const routes: Routes = [
  {path: '', redirectTo: 'orders', pathMatch: 'full'},
  {path: 'error/:msgType',component: ErrorComponent},
  {path: 'login/qrCode', component: LoginComponent},
  {path: 'raw/:photoinfoid', component: PhotosComponent},
  {path: 'raw/:photoinfoid/:status', component: PhotosComponent},
  {path: 'truing/:photoinfoid', component: TruingsComponent},
  {path: 'forbidden', component: ForbiddenComponent},
  {path: 'binding', component: BindingComponent},
  {path: 'orders', component: MyOrdersComponent},
  {path: 'orders/:orderId/detail', component: OrderDetailComponent},
  {path: 'orders/:orderId/flow', component: OrderFlowComponent},
  {path: 'shops', component: ShopComponent},
  {path: 'advice', component: AdviceComponent},
  {path: 'user-info', component: UserInfoComponent},
  {path: 'appoint', component: AppointmentComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forChild([])
  ],
  exports: [RouterModule],
  providers: [{
    provide: LocationStrategy, // 导航路径的策略设置
    useClass: HashLocationStrategy // 使用'#'方式的策略
  }]
})
export class AppRoutingModule {
}
