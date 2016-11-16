import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {BaseService} from "./base.service";
import {Photo} from "../components/photos/photo";

@Injectable()
export class PhotoService extends BaseService {
  constructor(http: Http) {
    super(http)
  }

  /**
   * 获取图片列表
   * @returns
   */
  getPhotos(photoInfoId, sceneId, page, sortBy, sortOrder): Promise<any> {
    let url = '/photoInfos/' + photoInfoId + '/photoRaws/pagination'
    let body = {pageNo: page.pageNo, totalCount: page.totalCount, pageSize: 15};
    if (sceneId) {
      body['_filter_eq_photoSceneId'] = sceneId
    }

    if (sortBy) {
      body[sortBy] = sortOrder
    }

    return this.post(url, body)
  }


  getMessage(photoInfoId): Promise<any> {
    return this.get('/photoInfos/' + photoInfoId + '/actions/rawInfo')
  }

  /**
   * 保存数据
   * @param params
   * @returns
   */
  save(photoInfoId, params): Promise<Photo> {

    let body = JSON.stringify(params)
    return this.post('/photoInfos/' + photoInfoId + '/photoRaws', body)
  }

  /**
   * 删除信息
   * @param ids
   * @returns
   */
  remove(photoInfoId, ids) {
    return this.delete('/photoInfos/' + photoInfoId + '/photoRaws/', ids)
  }

  /**
   * 完成选片，提交
   * @param photoInfoId
   * @returns {Promise<any>}
   */
  finish(photoInfoId): Promise<any> {
    return this.put('/photoInfos/' + photoInfoId + '/actions/finishUploadRaw')
  }
}
