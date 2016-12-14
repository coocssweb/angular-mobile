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

  /**
   * 获取订单详情
   *
   * @param orderId
   * @returns {Promise<any>}
   */
  getOrderDetail(orderId):Promise<any>{
    let url = "/orders/" + orderId
    return this.get(url)
  }

  /**
   * 获取订单进度流程
   *
   * @param orderId
   * @returns {Promise<any>}
   */
  getOrderFlow(orderId):Promise<any>{
    let url = "/orders/" + orderId + "/flows"
    return this.get(url)
  }

  /**
   * 客户给订单流程中的工作人员进行评价
   *
   * @param orderId
   * @returns {Promise<any>}
   */
  saveEvaluate(orderId,params):Promise<any>{
    let url = "/orders/" + orderId + "/flows/evaluates"
    let body = JSON.stringify(params)
    return this.post(url,body)
  }
}
