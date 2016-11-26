/**
 *
 * @description :: 大图查看器
 */
import {Component, Input, Output, EventEmitter, OnInit, OnDestroy} from "@angular/core";
import {QINIU_DOMAIN} from "../../constant/config";

@Component({
  selector: '<feedback></feedback>',
  templateUrl: 'feedback.component.html',
  styleUrls: ['feedback.component.css']
})
export class FeedbackComponent implements OnInit, OnDestroy{

  //图片列表
  @Input() truingList:any

  //当前图片
  @Input() currentIndex:number
  //关闭事件
  @Output() close = new EventEmitter()

  @Output() remark =  new EventEmitter()

  @Output() accept = new EventEmitter()

  isTouchStart = false

  isTouchMove = false

  message: any = null

  isLoadingImage = true

  currentVersion = 0

  isShowDrop = false

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
    this.currentVersion =  this.truingList[this.currentIndex].truings.length - 1
    this.message = this.truingList[this.currentIndex].truings[this.currentVersion].remark

    let _self = this
    document.addEventListener('click',function (e: any) {

      if(e.target.className !='drop-display'){
        _self.isShowDrop = false
      }
    }, false)
  }

  ngOnDestroy() {
    let dom = (<HTMLElement>document.getElementById('html'))
    dom.style.overflow = 'auto'
    dom.style.height = ''
    document.removeEventListener('click')
  }

  /**
   * 满意
   */
  onAccept(){
    if(this.truingList[this.currentIndex].status == 2 ){
      return
    }

    this.accept.emit({
      id: this.truingList[this.currentIndex].id,
      index: this.currentIndex,
      done: this.acceptSuccess.bind(this)
    })
  }

  acceptSuccess(){

  }

  /**
   * 反馈
   */
  onRemark(){
    if(!this.message){
      return
    }

    this.remark.emit({
      id: this.truingList[this.currentIndex].id,
      message: this.message,
      index: this.currentIndex,
      done: this.remarkSuccess.bind(this)
    })
  }

  remarkSuccess(){
    this.message = ''
  }

  /**
   * 上一张图片
   */
  onPrev() {
    if (this.currentIndex == 0) {
      return
    }
    this.isLoadingImage = true
    this.message = ''
    this.currentIndex -= 1

    this.currentVersion =  this.truingList[this.currentIndex].truings.length - 1
    this.message = this.truingList[this.currentIndex].truings[this.currentVersion].remark

  }

  /**
   * 下一张图片
   */
  onNext() {
    if (this.currentIndex == this.truingList.length - 1) {
      return
    }

    this.isLoadingImage = true
    this.message = ''
    this.currentIndex += 1

    this.currentVersion =  this.truingList[this.currentIndex].truings.length - 1
    this.message = this.truingList[this.currentIndex].truings[this.currentVersion].remark

  }

  /**
   * 关闭大图查看
   */
  onClose() {
    this.close.emit()
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

  loadImage(imageSrc){
    let image = new Image()
    let _self = this
    image.onload=function() {
      _self.isLoadingImage = false
    }
    image.src = imageSrc
  }

  onToggleDrop(e){
    e.preventDefault()
    this.isShowDrop = !this.isShowDrop
  }

  onSelectVersion(index){
    this.isShowDrop = false
    this.currentVersion = index
  }
}
