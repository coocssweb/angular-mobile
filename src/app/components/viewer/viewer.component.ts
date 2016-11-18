/**
 *
 * @description :: 大图查看器
 */
import {Component, Input, Output, EventEmitter, OnInit, OnDestroy} from "@angular/core";
import {QINIU_DOMAIN} from "../../constant/config";

@Component({
  selector: '<viewer></viewer>',
  templateUrl: 'viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit, OnDestroy{

  //图片列表
  @Input() photoList:any

  //当前图片
  @Input() currentIndex:number

  @Input() photo: any

  //关闭事件
  @Output() close = new EventEmitter()

  //选择事件
  @Output() choose = new EventEmitter()

  isTouchStart = false

  isTouchMove = false
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
    this.currentIndex -= 1
  }

  /**
   * 下一张图片
   */
  onNext() {
    if (this.currentIndex == this.photoList.length - 1) {
      return
    }
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
    this.choose.emit(this.photo)
  }

  onTouchStart(e){
    this.isTouchStart = true

    this.touchPosStart = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    }
  }

  onTouchEnd(e){
    if(!this.isTouchStart || !this.isTouchMove){
      this.isTouchStart = false
      this.isTouchMove = false
      return
    }

    if(this.touchPosStart.x - this.touchPosMove.x < 50 ){
      this.onPrev()
    }else if(this.touchPosStart.x - this.touchPosMove.x > 50){
      this.onNext()
    }

    this.isTouchStart = false
    this.isTouchMove = false
    this.touchPosStart = {
      x: 0,
      y: 0
    }

    this.touchPosMove = {
      x: 0,
      y: 0
    }
  }

  onTouchMove(e){
    this.isTouchMove = true
    this.touchPosMove = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    }
  }
}
