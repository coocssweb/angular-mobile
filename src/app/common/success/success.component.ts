/**
 * confirm
 * @description :: 通用确认框
 */

import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core'

@Component({
    selector: '<success></success>',
    templateUrl: 'success.component.html',
    styleUrls: ['success.component.css']
})
export class SuccessComponent implements OnInit, OnDestroy{


  //confirm框确认事件回调
  @Output() close = new EventEmitter()

  /**
   * 初始化事件
   */
  ngOnInit(): void {
    // let dom = (<HTMLElement>document.getElementById('html'))
    // dom.style.overflow = 'hidden'
    // dom.style.height='100%'

    let _self = this
    setTimeout(function () {
      _self.onClose()
    }, 2000)
  }

  /**
   * 组件摧毁
   */
  ngOnDestroy(){
    // let dom = (<HTMLElement>document.getElementById('html'))
    // dom.style.overflow = 'auto'
    // dom.style.height=''
  }


  //确认事件
  onClose(){
        this.close.emit()
    }
}
