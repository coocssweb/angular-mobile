import {Injectable} from '@angular/core'
import {Http} from '@angular/http'
import {BaseService} from './base.service'
import {Scene} from '../components/scene/scene'
import {CacheService} from "./cache.service";

@Injectable()
export class SceneService extends BaseService {

  constructor(http: Http) {
    super(http)
  }

    /**
     * 获取原片场景列表
     * @returns {Promise<never|T>|Promise<never>|Observable<R>|Promise<R>|any}
     */
    getScenes(photoInfoId): Promise<Scene[]> {
        return this.get('/photoInfos/'+photoInfoId+'/photoScenes/actions/statistics')
    }

}

