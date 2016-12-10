/**
 * Created by zoushuiyun on 2016/12/10.
 */
import {Component, OnInit} from "@angular/core";
import {OrdersService} from "../shared/orders.service"
import any = jasmine.any;
import {ActivatedRoute, Params, Router} from "@angular/router";
import {OrderDetail} from "./order-detail";
import {OrderProduct} from "../shared/order-product";
@Component({
  selector: 'order-detail',
  templateUrl: 'order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
  providers: [OrdersService]
})

export class OrderDetailComponent implements OnInit {

  private orderId:number

  private orderDetail:any = {}

  private series:any={}

  private productList: any[]=[]

  /**
   * 构造函数
   * @param rawService
   */
  constructor(private ordersService: OrdersService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  /**
   * 初始化事件
   */
  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.orderId = +params['orderId']
    });
    this.getOrderDetail()
  }

  getOrderDetail(){
     this.ordersService.getOrderDetail(this.orderId).then((resp:any)=>{
       this.orderDetail = resp
       this.productList = this.orderDetail.products
       this.series = this.orderDetail.series
       console.log(this.orderDetail)
     })
  }
}
