/**
 * 信息结果
 * @description :: 信息
 */
import { Component, Input } from '@angular/core';


@Component({
    selector: '<message></message>',
    templateUrl: 'message.component.html',
    styleUrls: ['./message.component.css']
})
export class MessageComponent{

    //confirm框标题
    @Input() title: string
}
