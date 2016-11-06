import {Component, OnInit, Input, EventEmitter} from '@angular/core';
import {Output} from "@angular/core/src/metadata/directives";

@Component({
  selector: 'my-guidance',
  templateUrl: 'my-guidance.component.html',
  styleUrls: ['my-guidance.component.css']
})
export class MyGuidanceComponent implements OnInit {

  @Input()
  show : boolean = false;

  @Input()
  text : string = "";

  //知道了事件回调
  @Output() onGotIt = new EventEmitter();

  ngOnInit() {

  }

  gotIt(){
    this.show = false;
    this.onGotIt.emit();
    return false;
  }

}
