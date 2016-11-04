import {Component, OnInit, Input, EventEmitter, style, animate, transition, trigger} from '@angular/core';
import {Output} from "@angular/core/src/metadata/directives";

const inactiveStyle = style({
  opacity: 0,
  transform: 'translateY(-40px)'
});
const timing = '.3s ease';

@Component({
  selector: 'dy-toastr',
  styleUrls: ['dy-toastr.component.css'],
  template:`
    <div class="dy-toastr">
    {{message}}
    </div>
  `,
  animations: [
    trigger('flyInOut', [
      transition('void => *', [
        inactiveStyle,
        animate(timing)
      ]),
      transition('* => void', [
        animate(timing, inactiveStyle)
      ])
    ])
  ]
})
export class DyToastrComponent implements OnInit {

  message : string  = '操作成功';

  ngOnInit() {

  }


}
