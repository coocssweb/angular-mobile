/**
 * Created by zoushuiyun on 2016/12/10.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {BaseService} from "../../services/base.service";

@Injectable()
export class AppointmentService extends BaseService{

  constructor(http: Http) {
    super(http)
  }


  /**
   * 在线预约
   *
   * @param orderId
   * @param params
   * @returns {Promise<any>}
   */
  addAppoint(params):Promise<any>{
    let url = "/appoint"
    let body = JSON.stringify(params)
    return this.post(url,body)
  }
}
