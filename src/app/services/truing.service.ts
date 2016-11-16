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
   * 获取精修片状态
   * @param photoInfoId
   */
  getTruingStatus(photoInfoId): Promise<any> {
    return this.get('/photoInfos/' + photoInfoId + '/actions/truingInfo')
  }

  /**
   * 获取图片列表
   * @returns
   */
  getTruings(photoInfoId, page, sortBy, sortOrder): Promise<any> {
    let url = '/photoInfos/' + photoInfoId + '/photoTruings/pagination'
    let body = {pageNo: page.pageNo, totalCount: page.totalCount, pageSize: 15};

    if (sortBy) {
      body[sortBy] = sortOrder
    }

    return this.post(url, body)
  }

  /**
   * 保存数据
   * @param params
   * @returns
   */
  save(photoInfoId, params): Promise<Truing> {
    let body = JSON.stringify(params)
    return this.post('/photoInfos/' + photoInfoId + '/photoTruings', body)
  }

  /**
   * 删除信息
   * @param ids
   * @returns
   */
  remove(photoInfoId, imgName) {
    return this.delete('/photoInfos/' + photoInfoId + '/photoTruings?imgName=' + encodeURI(imgName) + '&type=last', null)
  }

  getMessage(photoInfoId): Promise<any> {
    return this.get('/photoInfos/' + photoInfoId + '/actions/truingInfo')
  }

  /**
   * 确认上传完成
   * @param photoInfoId
   * @returns {Promise<any>}
   */
  finish(photoInfoId) {
    return this.put('/photoInfos/' + photoInfoId + '/actions/finishUploadTruing')
  }

  /**
   * 重新确认精修片
   * @param photoInfoId
   */
  redo(photoInfoId) {
    return this.put('/photoInfos/' + photoInfoId + '/actions/redoConfirmTruing')
  }
}
