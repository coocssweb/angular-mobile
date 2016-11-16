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

  /**
   * 关闭事件
   * @type {EventEmitter}
   */
  @Output() close = new EventEmitter()

  qiniuDomain: any = QINIU_DOMAIN

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

  onClose() {
    this.close.emit()
  }
}
