/**
 * Created by zoushuiyun on 2016/12/10.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {BaseService} from "../../services/base.service";

@Injectable()
export class ShopService extends BaseService{

  constructor(http: Http) {
    super(http)
  }

  /**
   * 获取门店列表信息
   *
   * @returns {Promise<any>}
   */
  getShops():Promise<any>{
    let url = '/shops'
    return this.get(url)
  }
}
