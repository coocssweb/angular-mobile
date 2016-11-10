import {Component, OnInit, Input,trigger, state, style, transition, animate, group} from '@angular/core';
import {Router} from "@angular/router";
import {PhotoTruingService} from "../../../service/photo-truing.service";

@Component({
  selector: 'photo-truing',
  templateUrl: './photo-truing.component.html',
  styleUrls: ['./photo-truing.component.css']
})
export class PhotoTruingComponent implements OnInit {

  constructor(private router: Router,
              private photoTruingService: PhotoTruingService){
  }

  //客户端精修状态 0：最初状态 1：客户提交修改意见 2：客户已提交修改意见 3：客户已确认
  cusTruingStatus : number = 0;

  //列表显示该状态的精修片
  status :number = 0;

  //所有精修片
  photoTruingList : any[];

  //弹出窗口的精修片
  photoTruing : any;

  //反馈类型 0 未反馈 1 不满意，修改 2 满意，无需修改
  types : any = {"all":0, "feedback0" : 0, "feedback1": 0, "feedback2": 0 };

  ngOnInit() {
    this.photoTruingService.getPhotoTruingList().then(photoTruingList=>{
      this.photoTruingList = photoTruingList;
      this.calcTypes();
    });
  }

  calcTypes(){
    this.types.all = this.photoTruingList.length;
    this.types.feedback0 = this.photoTruingList.filter(function (item) {
      return item.status == 0 ;
    }).length;
    this.types.feedback1 = this.photoTruingList.filter(function (item) {
      return item.status == 1 ;
    }).length;
    this.types.feedback2 = this.photoTruingList.filter(function (item) {
      return item.status == 2 ;
    }).length;
  }

  amplify(photoTruing){
    this.photoTruing = photoTruing;
  }

  inputComments(){
    alert(1);
  }

  good(){
    this.photoTruing = null;
  }
  notGood(){
    this.photoTruing = null;
  }

  touch($event){
    console.log($event);
  }
}
