/**
 * tab
 * @description :: 通用Tab组件
 */

import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: '<pcphoto></pcphoto>',
  templateUrl: 'pc-photo.component.html',
  styleUrls: ['./pc-photo.component.css']
})
export class PcPhotoComponent {
  @Input() list: Array<any>

  @Output() preview = new EventEmitter()

  @Output() choose =  new EventEmitter()


  /**
   * 预览图片
   * @param index
     */
  onPreview(index){
    this.preview.emit(index)
  }

  /**
   * 选择图片
   * @param index
     */
  onChoose(index){
    this.choose.emit(index)
  }

}
