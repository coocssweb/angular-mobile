/**
 * Created by zoushuiyun on 2016/12/10.
 */
/**
 * 订单列表点单信息
 * @description :: 定义订单列表点单信息数据原型
 */

export class Order{
  constructor(
    public orderId: number,
    public orderNo: string,
    public customerName: string,
    public brandName: string,
    public seriesName:string,
    public cusStateName:string,
    public shootDateStr:string,
    public shootType:string
  ){

  }
}

