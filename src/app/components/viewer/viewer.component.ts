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

  @Input() status: any

  @Input() isShowDelete: boolean

  //当前图片
  @Input() currentIndex:number

  //关闭事件
  @Output() close = new EventEmitter()

  //选择事件
  @Output() choose = new EventEmitter()

  isScale = false

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

  imageUrl = ''

  imgStyle = {
    'max-width': 'none',
    'max-height': 'none',
    'transform': 'inherit'
  }

  imgSize = {
    width: 0,
    height: 0
  }
  /**
   * 初始化事件
   */
  ngOnInit():void {
    this.imageUrl = this.photoList[this.currentIndex].imgKey
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
    this.isScale = false
    this.imageUrl = this.photoList[this.currentIndex].imgKey
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
    this.isScale = false
    this.imageUrl = this.photoList[this.currentIndex].imgKey
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
    this.choose.emit(this.photoList[this.currentIndex].listIndex)
  }

  onTouchStart(e){

    if(this.isLoadingImage){
      return
    }

    this.isTouchStart = true

    this.touchPosStart = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    }
  }

  onTouchEnd(e){
    if(this.isLoadingImage){
      return
    }

    if(!this.isTouchStart || !this.isTouchMove){
      this.isTouchStart = false
      this.isTouchMove = false
      return
    }




    if(this.touchPosStart.x - this.touchPosMove.x < -50 ){
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
    if(this.isLoadingImage){
      return
    }
    this.isTouchMove = true
    this.touchPosMove = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    }
  }

  loadImage(imageUrl){
    let image = new Image()
    let _self = this
    image.onload=function() {
      _self.isLoadingImage = false
      _self.imageUrl = imageUrl
      _self.imgSize.width = image.width
      _self.imgSize.height = image.height
    }
    image.src = imageUrl
  }


  onScale(){
    // this.isScale = true
    // this.imgStyle['margin-left'] = -this.imgSize.width/2 + 'px'
    // this.imgStyle['margin-top'] = -this.imgSize.height/2 + 'px'
  }
}
