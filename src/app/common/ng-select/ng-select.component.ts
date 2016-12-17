/**
 * confirm
 * @description :: 通用确认框
 */

import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core'

@Component({
    selector: '<ng-select></ng-select>',
    templateUrl: 'ng-select.component.html',
    styleUrls: ['ng-select.component.css']
})
export class NgSelectComponent{
  @Input() options: Array<any>
  @Input() value: string
  @Output() onSelect = new EventEmitter()


  onChange(value){
    this.onSelect.emit(value)
  }

}
