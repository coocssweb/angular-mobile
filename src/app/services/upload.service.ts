import {Injectable} from '@angular/core'
import {Http} from '@angular/http'
import {BaseService} from './base.service'

@Injectable()
export class UploadService extends BaseService {
  constructor(http: Http) {
    super(http)
  }


  /**
   * 获取七牛Token
   * @returns
   */
  getToken(customer_id, count): Promise<String> {
    return this.get('/photo/uptoken/raw?customerId=' + customer_id + '&genNum=' +count)
  }


}
