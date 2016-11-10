import {Component, OnInit, Input,trigger, state, style, transition, animate, group} from '@angular/core';
import {PhotoRawService} from "../../../service/photo-raw.service";
import {Router} from "@angular/router";

@Component({
  selector: 'photo-raw2',
  templateUrl: './photo-raw2.component.html',
  styleUrls: ['./photo-raw2.component.css'],
  animations: [
    trigger('flyInOut', [
      state('active', style({height: '100%'})),
      state('inactive', style({height: 0})),
      transition('active => inactive', [

      ]),
      transition('inactive => active', [
        animate(1000, style({ height: '100%' }))

      ])
    ])
  ]

})
export class PhotoRaw2Component implements OnInit {

  constructor(private router: Router,
    private photoRawService: PhotoRawService){
  }

  //是否显示费用提醒
  costTips : boolean = false;

  //最少选择多少张
  @Input() minSelectNum : number = 5;

  photoRawList : any[] = [];

  //点击的照片
  photoRaw : any ;

  selectNum : number;

  ngOnInit() {
    this.photoRawService.getPhotoRaw2List().then(photoRaw2List=>{
      this.photoRawList = photoRaw2List;
      this.selectNum = photoRaw2List.length;
    })
  }


  onSelect( photoRaw : any ) {
    this.selectNum-- ;
    return false;
  }

  reconfirm(){
    if(this.selectNum < this.minSelectNum) {
      return false;
    }else{
      alert(1);
    }
  }

  //点击弹出框
  amplify(photoRaw){
    console.log(photoRaw);
    this.photoRaw = photoRaw;
  }
  onClose() {
    this.photoRaw = null;
  }

  goBack(): void {
    let link = ['/photo-raw'];
    this.router.navigate(link);
  }
}
