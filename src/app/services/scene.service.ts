import {Injectable} from '@angular/core'
import {Http} from '@angular/http'
import {BaseService} from './base.service'
import {Scene} from '../components/scene/scene'

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
        return this.get('/photoInfo/'+photoInfoId+'/photoScenes/actions/statistics')
    }

}
