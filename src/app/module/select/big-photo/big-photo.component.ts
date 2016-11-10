import {Component, OnInit, Input, EventEmitter,trigger, state, style, transition, animate} from '@angular/core';
import {Output} from "@angular/core/src/metadata/directives";

@Component({
  selector: 'big-photo',
  templateUrl: 'big-photo.component.html',
  styleUrls: ['big-photo.component.css'],
  animations: [
    trigger('statusChange', [
      state('1', style({
        fontSize: '1.2rem',
        transform: 'scale(1)'
      })),
      state('0',   style({
        fontSize: '1rem',
        transform: 'scale(1.1)'
      })),
      transition('1 => 0', animate('100ms ease-in')),
      transition('0 => 1', animate('100ms ease-out'))
    ])
  ]
})
export class BigPhotoComponent implements OnInit {

  //显示的图片
  @Input() photoRaw : any ;

  @Output() onClose = new EventEmitter();

  @Output() onSelect = new EventEmitter();


  ngOnInit() {

  }

  closeWin(){
    this.onClose.emit();
  }

  photoRawSelect(){
    this.onSelect.emit(this.photoRaw);
  }

}
