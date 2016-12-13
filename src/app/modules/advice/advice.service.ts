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
export class AdviceService extends BaseService{

  constructor(http: Http) {
    super(http)
  }

  /**
   * 提交建议
   *
   * @returns {Promise<any>}
   */
  addAdvice(params):Promise<any>{
    let url = '/advices'
    let body = JSON.stringify(params)
    return this.post(url,body)
  }
}
