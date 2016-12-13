/**
 * Created by zoushuiyun on 2016/12/8.
 */
import {Component, OnInit} from "@angular/core";
import {OrdersService} from "../shared/orders.service"
import {Order} from "./order"
import any = jasmine.any;
import {Router} from "@angular/router";

@Component({
  selector: 'my-orders',
  templateUrl: 'my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
  providers: [OrdersService]
})

export class MyOrdersComponent implements OnInit {

  private myOrders : Order[] = []

  /**
   * 构造函数
   * @param rawService
   */
  constructor(private ordersService: OrdersService,
                private router: Router) {
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
    this.ordersService.getMyOrders().then((resp:any) =>{
        this.myOrders = resp
    })
  }

  goOrderDetail(orderId){
    this.router.navigate(['/order-detail', orderId]);
  }
  goOrderFlow(orderId){
    this.router.navigate(['/order-flow', orderId]);
  }
}
