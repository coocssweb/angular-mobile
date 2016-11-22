/**
 *
 * @description :: 大图查看器
 */
import {Component, Input, Output, EventEmitter, OnInit, OnDestroy} from "@angular/core";
import {QINIU_DOMAIN} from "../../constant/config";

@Component({
  selector: '<pcviewer></pcviewer>',
  templateUrl: 'pc-viewer.component.html',
  styleUrls: ['./pc-viewer.component.css']
})
export class PCViewerComponent implements OnInit, OnDestroy{

  //图片列表
  @Input() photoList:any

  //当前图片
  @Input() currentIndex:number

  //关闭事件
  @Output() close = new EventEmitter()

  //选择事件
  @Output() choose = new EventEmitter()

  isTouchStart = false

  isTouchMove = false

  isLoadingImage = true
  //当前触屏位置
  touchPosStart= {
    x: 0,
    y: 0
  }

  touchPosMove = {
    x: 0,
    y: 0
  }

  /**
   * 初始化事件
   */
  ngOnInit():void {
    let dom = (<HTMLElement>document.getElementById('html'))
    dom.style.overflow = 'hidden'
    dom.style.height = '100%'
  }

  ngOnDestroy() {
    let dom = (<HTMLElement>document.getElementById('html'))
    dom.style.overflow = 'auto'
    dom.style.height = ''
  }

  /**
   * 上一张图片
   */
  onPrev() {
    if (this.currentIndex == 0) {
      return
    }

    this.isLoadingImage =  true
    this.currentIndex -= 1
  }

  /**
   * 下一张图片
   */
  onNext() {
    if (this.currentIndex == this.photoList.length - 1) {
      return
    }

    this.isLoadingImage = true
    this.currentIndex += 1
  }

  /**
   * 关闭大图查看
   */
  onClose() {
    this.close.emit()
  }

  /**
   * 选择取消按钮
   */
  onChoose(){
    this.choose.emit(this.photoList[this.currentIndex])
  }



  loadImage(imageSrc){
    let image = new Image()
    let _self = this
    image.onload=function() {
      _self.isLoadingImage = false
    }
    image.src = imageSrc
  }
}
