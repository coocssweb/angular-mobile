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
const routes: Routes = [
  {path: 'login/qrCode', component: LoginComponent},
  {path: 'raw/:photoinfoid', component: PhotosComponent},
  {path: 'raw/:photoinfoid/:status', component: PhotosComponent},
  {path: 'truing/:photoinfoid', component: TruingsComponent},
  {path: 'forbidden', component: ForbiddenComponent},
  {path: 'orders', component: MyOrdersComponent},
  {path: 'orderDetail/:orderId', component: OrderDetailComponent},
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
