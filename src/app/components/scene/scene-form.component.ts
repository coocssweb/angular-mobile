import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {Scene} from './scene'
import {SceneService} from '../../services/scene.service.ts'
import StringUtils from '../../utils/stringUtils'

@Component({
  selector: '<scene-form></scene-form>',
  templateUrl: 'scene-form.component.html',
  styleUrls: ['./scene-form.component.css'],
  providers: [SceneService]
})
export class SceneFormComponent implements OnInit {

  @Input() photoInfoId:string

  //切换场景回调
  @Output() onTabSceneCb = new EventEmitter()


  //项目列表
  sceneList:Scene[] = []

  //当前选择项
  selectedScene = {
    id: 0
  }

  requireNum = 0

  checkedNum = 0


  /**
   * 构造函数
   * @param sceneService
   */
  constructor(private sceneService:SceneService) {
  }

  /**
   * 初始化事件
   */
  ngOnInit():void {
    this.getScenes()
  }


  /**
   * 获取场景
   */
  getScenes():void {
    this.sceneService.getScenes(this.photoInfoId)
      .then((scenes:any) => {
        let totalRaw = 0
        let totalChecked = 0
        this.requireNum = scenes.truingImgNum * 2
        scenes.photoSceneCounts.map((item)=> {
          totalRaw += item.rawNum ? item.rawNum : 0
          totalChecked += item.checkedNum ? item.checkedNum : 0
        })
        this.checkedNum = totalChecked
        let totalScene = new Scene(0, '全部', totalRaw, totalChecked)
        this.sceneList = scenes.photoSceneCounts
        this.sceneList = [totalScene].concat(this.sceneList)
      })
  }


  //切换选择项
  onSelectScene(scene) {
    this.selectedScene = scene
    this.onTabSceneCb.emit(scene)
  }

}
