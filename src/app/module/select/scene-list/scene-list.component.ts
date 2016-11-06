import {Component, OnInit, ViewChild} from '@angular/core';
import {Scene, SceneService} from "../../../service/scene.service";
import {Router, ActivatedRoute} from "@angular/router";
import {PhotoRawComponent} from "../photo-raw/photo-raw.component";
import {MyGuidanceComponent} from "../../common/my-guidance/my-guidance.component";

@Component({
  selector: 'scene-list',
  templateUrl: './scene-list.component.html',
  styleUrls: ['./scene-list.component.css']
})
export class SceneListComponent implements OnInit {

  @ViewChild(PhotoRawComponent)
  private photoRawComponent: PhotoRawComponent;

  @ViewChild(MyGuidanceComponent)
  private myGuidanceComponent : MyGuidanceComponent;

  guidanceToShow : string;

  scenes : Scene[];

  totalRawNum : number = 0;

  //当前选择的场景ID
  currentSi : number = 0;

  constructor(
    private service: SceneService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.service.getScenes().then( scenes=>{
      this.scenes = scenes;
      this.scenes.forEach(item=>{
        this.totalRawNum += item.rawNum;
      })
    });
    //是否友情提示
    if( localStorage.getItem("guidanceToShow") ) {
      this.guidanceToShow = localStorage.getItem("guidanceToShow");
    }else{
      this.guidanceToShow = 'true';
    }
  }

  onGotIt() {
    localStorage.setItem("guidanceToShow","false");
    this.guidanceToShow = "false";
  }


}
