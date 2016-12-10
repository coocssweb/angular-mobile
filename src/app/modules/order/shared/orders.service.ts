/**
 * Created by zoushuiyun on 2016/12/10.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {BaseService} from "../../../services/base.service";

@Injectable()
export class OrdersService extends BaseService{

  constructor(http: Http) {
    super(http)
  }

  /**
   * 获取我的订单列表
   *
   * @returns {Promise<any>}
   */
  getMyOrders():Promise<any>{
    let url = '/orders'
    return this.get(url)
  }

  getOrderDetail(orderId):Promise<any>{
    let url = "/orders/" + orderId
    return this.get(url)
  }
}
