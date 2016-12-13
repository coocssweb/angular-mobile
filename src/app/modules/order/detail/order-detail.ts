/**
 * Created by zoushuiyun on 2016/12/10.
 */
import {Series} from "../shared/series";
import {OrderProduct} from "../shared/order-product";
/**
 * 订单详情信息
 * @description :: 定义订单详情数据原型
 */

export class OrderDetail {

  public id: number
  public orderNo: string
  public orderDate: string
  public shootDateStr: string
  public shopId: number
  public shopName: string
  public series: Series
  public products: OrderProduct[]=[]
  public cusState: number
  public cusStateName: string
  public actualPayment: number
  public downPayment: number
  public shotType: string
  public serviceWorkerMobile: string

  constructor(orderDetail) {
    this.id = orderDetail.id
    this.orderNo = orderDetail.orderNo
    this.orderDate = orderDetail.orderDate
    this.shootDateStr = orderDetail.shootDateStr
    this.shopId = orderDetail.shopId
    this.shopName = orderDetail.shopName
    this.series = orderDetail.series
    this.products = orderDetail.products
    this.cusState = orderDetail.cusState
    this.cusStateName = orderDetail.cusStateName
    this.actualPayment = orderDetail.actualPayment
    this.downPayment = orderDetail.downPayment
    this.shotType = orderDetail.shotType
    this.serviceWorkerMobile = orderDetail.serviceWorkerMobile
  }
}
