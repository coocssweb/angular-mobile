/**
 *
 * @description :: 大图查看器
 */
import {Component, Input, Output, EventEmitter, OnInit, OnDestroy} from "@angular/core";
import {QINIU_DOMAIN} from "../../constant/config";

@Component({
  selector: '<pcfeedback></pcfeedback>',
  templateUrl: 'pc-feedback.component.html',
  styleUrls: ['./pc-feedback.component.css']
})
export class PcFeedbackComponent implements OnInit, OnDestroy{
  //图片列表
  @Input() truingList:any

  //当前图片
  @Input() currentIndex:number
  //关闭事件
  @Output() close = new EventEmitter()

  @Output() remark =  new EventEmitter()

  @Output() accept = new EventEmitter()

  message: any = null

  isLoadingImage = true

  /**
   * 初始化事件
   */
  ngOnInit():void {
    let dom = (<HTMLElement>document.getElementById('html'))
    dom.style.overflow = 'hidden'
    dom.style.height = '100%'

    this.message = this.truingList[this.currentIndex].truings[0].remark
  }

  ngOnDestroy() {
    let dom = (<HTMLElement>document.getElementById('html'))
    dom.style.overflow = 'auto'
    dom.style.height = ''
  }


  /**
   * 关闭大图查看
   */
  onClose() {
    this.close.emit()
  }

  /**
   * 满意
   */
  onAccept(){
    if(this.truingList[this.currentIndex].status == 2 ){
      return
    }

    this.accept.emit({
      id: this.truingList[this.currentIndex].truings[0].id,
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
      id: this.truingList[this.currentIndex].truings[0].id,
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
