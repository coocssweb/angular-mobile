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

  check(photoInfoId, id, status): Promise<any>{
    let body = {
      id: id,
      status: status
    }
    return this.put('/photoInfos/'+photoInfoId+'/photoRaws/actions/check', body)
  }




  /**
   * 完成选片，提交
   * @param photoInfoId
   * @returns {Promise<any>}
   */
  finish(photoInfoId): Promise<any> {
    return this.put('/photoInfos/' + photoInfoId + '/actions/finishUploadRaw', null)
  }
}
