import {
  Component, OnInit, Input, trigger, state, style, transition, animate, group,
  ViewContainerRef, ComponentFactoryResolver, Injector, ComponentRef
} from '@angular/core';
import {PhotoRawService} from "../../../service/photo-raw.service";
import {Router} from "@angular/router";
import {DyToastrComponent} from "../../common/toastr/dy-toastr.component";

@Component({
  selector: 'photo-raw',
  templateUrl: './photo-raw.component.html',
  styleUrls: ['./photo-raw.component.css'],
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
export class PhotoRawComponent implements OnInit {

  constructor(private router: Router,
              private cfResolver: ComponentFactoryResolver,
              private vcRef: ViewContainerRef,
              private injector: Injector,
              private photoRawService: PhotoRawService){
  }

  private dyToastrRef: ComponentRef<DyToastrComponent>;

  //是否显示费用提醒
  costTips : boolean = false;

  //最少选择多少张
  @Input() minSelectNum : number = 5;

  photoRawList : any[] = [];

  //点击的照片
  photoRaw : any ;

  selectNum : number;

  ngOnInit() {

    this.getPhotoRaw(0);
  }

  getPhotoRaw(sceneId:number) {

    this.photoRawService.getPhotoRawList().then(photoRawList=>{
      var result = photoRawList.filter(function(item) {
          return item.photoSceneId == sceneId || sceneId==0;
      });
      this.photoRawList = result;
      //已选择数量
      var selectNum = 0;
      photoRawList.forEach(item=>{
        if(item.status==1){
          selectNum++;
        }
      });
      this.selectNum = selectNum;
    });

  }
  onSelect( photoRaw : any ) {
    //调用服务器接口
    photoRaw.status==1 ? photoRaw.status=0 : photoRaw.status =1 ;
    if(photoRaw.status ==0){
      this.selectNum--;
      //

    }else if(photoRaw.status ==1){
      this.selectNum++;
    }
    this.selectNum > this.minSelectNum ? this.costTips = true : this.costTips = false;
    const  dyToastrComponent = this.cfResolver.resolveComponentFactory(DyToastrComponent);
    this.dyToastrRef = this.vcRef.createComponent(dyToastrComponent, null, this.injector);
    setTimeout(()=>{
      this.dyToastrRef.destroy();
    },2000);
    return false;
  }

  reconfirm(){
    if(this.selectNum < this.minSelectNum) {
      return false;
    }else{
      //进入细选
      let link = ['/photo-raw2'];
      this.router.navigate(link);
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
}
