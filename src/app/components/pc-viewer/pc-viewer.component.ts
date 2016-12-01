/**
 *
 * @description :: 大图查看器
 */
import {Component, Input, Output, EventEmitter, OnInit, OnDestroy} from "@angular/core";
import {LoggerService} from "../../services/logger.service";

@Component({
  selector: 'pcviewer',
  templateUrl: 'pc-viewer.component.html',
  styleUrls: ['./pc-viewer.component.css']
})
export class PCViewerComponent implements OnInit, OnDestroy{

  //图片列表
  @Input() list:any


  @Input() status: any

  //当前图片
  @Input() currentIndex:number

  @Input() isShowDelete: boolean

  //关闭事件
  @Output() close = new EventEmitter()

  //选择事件
  @Output() choose = new EventEmitter()

  isLoadingImage = true

  constructor(private logger: LoggerService) {

  }

  /**
   * 初始化事件
   */
  ngOnInit():void {
    let dom = (<HTMLElement>document.getElementById('html'))
    dom.style.overflow = 'hidden'
    dom.style.height = '100%'

    let _self = this

    document.addEventListener('keydown',function (e) {
        if(e.keyCode === 37 || e.keyCode === 38) {
          _self.onPrev()
        }else if(e.keyCode === 39 || e.keyCode === 40){
          _self.onNext()
        }
    }, false)

  }

  ngOnDestroy() {
    let dom = (<HTMLElement>document.getElementById('html'))
    dom.style.overflow = 'auto'
    dom.style.height = ''
    document.removeEventListener('keydown')
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
    if (this.currentIndex == this.list.length - 1) {
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
    this.choose.emit(this.currentIndex)
  }

  /**
   * 加载图片
   * @param imageSrc
   */
  loadImage(imageSrc){
    this.logger.debug("开始加载大图 imageUrl:" + imageSrc)
    let image = new Image()
    let _self = this
    image.onload=function() {
      _self.logger.debug("大图加载完成 imageUrl:" + imageSrc)
      _self.isLoadingImage = false
    }
    image.src = imageSrc
  }
}
