import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {BaseService} from "./base.service";
import {Truing} from "../components/truings/truing";

@Injectable()
export class TruingService extends BaseService {
  constructor(http: Http) {
    super(http)
  }

  /**
   * 获取精修片初始化信息
   * @param photoInfoId
   * @returns {Promise<any>}
     */
  getTruingInfo(photoInfoId): Promise<any>{
    let url = '/photoInfos/'+photoInfoId+'/actions/truingInfo'
    return this.get(url)
  }

  /**
   * 获取精修片列表
   * @returns
   */
  getTruings(photoInfoId, page, sortBy, sortOrder, status): Promise<any> {
    let url = '/photoInfos/'+photoInfoId+'/photoTruings/pagination'
    let body = {pageNo: page.pageNo, totalCount: page.totalCount, pageSize: 20}

    if(status>-1){
      body['_filter_eq_status'] = status
    }

    if (sortBy) {
      body[sortBy] = sortOrder
    }

    return this.post(url, body)
  }

  /**
   * 添加备注信息
   * @param photoInfoId
   * @param id
   * @param remark
   * @returns {Promise<any>}
     */
  remark(photoInfoId, id, remark): Promise<any>{
    let url = '/photoInfos/'+photoInfoId+'/photoTruings/'+id+'/actions/confirm'
    let body = {
      remark: remark,
      status: 1
    }
    return this.put(url, body)
  }

  /**
   * 选中图片
   * @param photoInfoId
   * @param id
   * @param status
   * @returns {Promise<any>}
   */
  accept(photoInfoId, id): Promise<any>{
    let url = '/photoInfos/'+photoInfoId+'/photoTruings/'+id+'/actions/confirm'
    let body = {
      status: 2
    }
    return this.put(url, body)
  }

  /**
   * 精修确认完成
   * @param photoInfoId
   * @returns {Promise<any>}
   */
  finish(photoInfoId): Promise<any> {
    return this.put('/photoInfos/' + photoInfoId + '/actions/finishConfirmTruing', null)
  }
}
