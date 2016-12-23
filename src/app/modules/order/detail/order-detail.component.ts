/**
 * Created by zoushuiyun on 2016/12/10.
 */
import {Component, OnInit} from "@angular/core";
import {OrdersService} from "../shared/orders.service"
import any = jasmine.any;
import {ActivatedRoute, Params, Router} from "@angular/router";
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
  //是否正在加载数据
  isLoadingData = false

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
    this.isLoadingData = true
     this.ordersService.getOrderDetail(this.orderId).then((resp:any)=>{
       Object.assign(this.orderDetail, resp)
       this.series = this.orderDetail.series
       this.isLoadingData = false
     })
  }
  goOrderFlow(){
    this.router.navigate(['/orders/'+this.orderId+'/flow', ]);
  }
  goPhotos(){
    if(this.orderDetail.cusStateName=="客户选片"&&this.orderDetail.cusRawStatus!=0){
      this.router.navigate(['/raw', this.orderDetail.photoInfoId]);
    }else if(this.orderDetail.cusStateName=="原片精修"&&this.orderDetail.cusTruingStatus!=0){
      this.router.navigate(['/truing', this.orderDetail.photoInfoId]);
    }else {
      return
    }
  }
}
