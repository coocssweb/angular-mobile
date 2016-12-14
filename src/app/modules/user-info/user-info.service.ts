/**
 * Created by zoushuiyun on 2016/12/10.
 */
/**
 * Created by zoushuiyun on 2016/12/10.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {BaseService} from "../../services/base.service";

@Injectable()
export class UserInfoService extends BaseService{

  constructor(http: Http) {
    super(http)
  }

  /**
   * 获取用户信息（actually , this is the weixinFans infomation）
   *
   * @returns {Promise<any>}
   */
  getUserInfo():Promise<any>{
    let url = '/weixinfans'
    return this.get(url)
  }

  /**
   * 更新用户信息
   *
   * @param orderId
   * @param params
   * @returns {Promise<any>}
   */
  updateUserInfo(params):Promise<any>{
    let url = "/weixinfans/actions/binding"
    let body = JSON.stringify(params)
    return this.post(url,body)
  }

  /**
   * 获取验证码
   *
   * @param mobile
   * @returns {Promise<any>}
   */
  getCodeByMobile(mobile):Promise<any>{
    let url = "/weixinfans/codes/" + mobile
    return this.get(url)
  }
}
