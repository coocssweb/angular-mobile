/**
 * Created by zoushuiyun on 2016/12/8.
 */
import {Component, OnInit} from "@angular/core";
import {OrdersService} from "../shared/orders.service"
import {Order} from "./order"
import any = jasmine.any;
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'my-orders',
  templateUrl: 'my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
  providers: [OrdersService]
})

export class MyOrdersComponent implements OnInit {

  private myOrders : Order[] = []
  //是否正在加载数据
  isLoadingData = false
  /**
   * 构造函数
   * @param rawService
   */
  constructor(private ordersService: OrdersService,private titleService:Title,
                private router: Router) {
    this.titleService.setTitle("我的订单");
  }

  /**
   * 初始化事件
   */
  ngOnInit(): void {
    this.getMyOrders()
  }

  /**
   * 获取我的订单列表
   *
   * @returns {Promise<any>}
   */
  getMyOrders(){
    this.isLoadingData = true
    this.ordersService.getMyOrders().then((resp:any) =>{
        this.myOrders = resp
      this.isLoadingData = false
    },(error:any)=>{
      console.log("获取订单列表出错==>>：")
      console.log(error)
      // let jsonResult = JSON.parse(error._body)
      // if(jsonResult.errCode=="COM/WARN_NO_BINDING_CUSTOMER"){//未绑定，跳转到绑定页面
      //   this.router.navigate(['/binding']);
      // }else {//其他，暂显示无订单   maybe other status。。。
        this.isLoadingData = false
      // }
    })
  }

  goOrderDetail(orderId){
    this.router.navigate(['/orders/'+orderId+'/detail']);
  }
  goOrderFlow(orderId){
    this.router.navigate(['/orders/'+orderId+'/flow', ]);
  }
  goPhotos(order,to){
    if(to==1&&order.cusRawStatus!=0){
      this.router.navigate(['/raw', order.photoInfoId]);
    }else if(to==2&&order.cusTruingStatus!=0){
      this.router.navigate(['/truing', order.photoInfoId]);
    }else {
      return
    }
  }
}
