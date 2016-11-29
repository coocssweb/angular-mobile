import {Component, OnInit, Output, Input, EventEmitter} from "@angular/core";
import {Scene} from "./scene";
import {SceneService} from "../../services/scene.service";

@Component({
  selector: 'scene-form',
  templateUrl: 'scene-form.component.html',
  styleUrls: ['./scene-form.component.css'],
  providers: [SceneService]
})
export class SceneFormComponent implements OnInit {

  @Input() photoInfoId: string

  @Input() show: boolean

  //切换场景回调
  @Output() onTabSceneCb = new EventEmitter()

  //项目列表
  sceneList: Scene[] = []

  //当前选择项
  selectedScene = {
    id: 0
  }

  checkedNum = 0

  totalCount = 0

  isTouchStart = false

  isTouchMove = false

  diffX = {
    diff: 0,
    left: '0px'
  }

  //当前触屏位置
  touchPosStart = {
    x: 0,
    y: 0
  }

  touchPosMove = {
    x: 0,
    y: 0
  }

  /**
   * 构造函数
   * @param sceneService
   */
  constructor(private sceneService: SceneService) {
  }

  /**
   * 初始化事件
   */
  ngOnInit(): void {
    this.getScenes()
  }


  /**
   * 获取场景
   */
  getScenes(): void {
    this.sceneService.getScenes(this.photoInfoId)
      .then((photoSceneCounts: any[]) => {
        let totalRaw = 0
        let totalChecked = 0
        photoSceneCounts.map((item) => {
          totalRaw += item.rawNum ? item.rawNum : 0
          totalChecked += item.checkedNum ? item.checkedNum : 0
        })
        this.checkedNum = totalChecked
        this.totalCount = totalRaw
        let totalScene = new Scene(0, '全部', totalRaw, totalChecked)
        this.sceneList = photoSceneCounts
        this.sceneList = [totalScene].concat(this.sceneList)
      })
  }


  //切换选择项
  onSelectScene(scene) {
    this.selectedScene = scene
    this.onTabSceneCb.emit(scene)
  }


  onTouchStart(e) {
    this.isTouchStart = true

    this.touchPosStart = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    }
  }

  onTouchEnd(e) {
    this.isTouchStart = false
    this.isTouchMove = false

    this.diffX.diff = this.touchPosMove.x - this.touchPosStart.x

    this.touchPosStart = {
      x: 0,
      y: 0
    }

    this.touchPosMove = {
      x: 0,
      y: 0
    }
  }

  onTouchMove(e) {
    if (!this.isTouchStart) {
      return
    }
    this.isTouchMove = true
    this.touchPosMove = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    }

    let diffX = this.diffX.diff + this.touchPosMove.x - this.touchPosStart.x
    if (diffX > 0) {
      return
    }

    if (diffX < document.getElementById('scene-inner').offsetWidth - document.getElementById('scene-list').offsetWidth) {
      return
    }


    this.diffX.left = diffX + "px"
  }


}
