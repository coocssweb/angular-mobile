/**
 * Created by wangjiaxin on 16/10/22.
 * @description 客户信息service
 */

import {Injectable} from '@angular/core'
import {Http} from '@angular/http'
import {BaseService} from './base.service'

@Injectable()
export class CustomerService extends BaseService {

    constructor(http: Http) {
        super(http)
    }

    /**
     * 根据照片信息获取客户信息
     * @param photoInfoId
     * @returns {Promise<any>}
     */
    getCustomerByPhotoInfo(photoInfoId) {
        return this.get('/photoInfos/' + photoInfoId + '/customer')
    }


}
