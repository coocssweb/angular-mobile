/**
 * tab
 * @description :: 通用Tab组件
 */

import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
    selector: '<tabItem></tabItem>',
    templateUrl: 'tabItem.component.html',
    styleUrls: ['./tabItem.component.css']
})
export class TabItemComponent {
    @Input() isActive: boolean
    @Input() disabled: boolean
    @Input() link: string
}
