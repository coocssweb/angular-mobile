import { Injectable } from '@angular/core';

let photoTruingList : any = [
  {"id":1, "imgIndex":1,"imgKey":"FRK_3199.jpg","imgName":"FRK_3199.jpg","imgSize":123123,"imgVersion":1,"status":0},
  {"id":2, "imgIndex":2,"imgKey":"FRK_3200.jpg","imgName":"FRK_3200.jpg","imgSize":123123,"imgVersion":1,"status":1},
  {"id":3, "imgIndex":3,"imgKey":"FRK_3209.jpg","imgName":"FRK_3209.jpg","imgSize":123123,"imgVersion":1,"status":2},
  {"id":4, "imgIndex":4,"imgKey":"FRK_3079.jpg","imgName":"FRK_3079.jpg","imgSize":123123,"imgVersion":1,"status":0},
  {"id":5, "imgIndex":5,"imgKey":"FRK_3182.jpg","imgName":"FRK_3182.jpg","imgSize":123123,"imgVersion":1,"status":1},
  {"id":6, "imgIndex":6,"imgKey":"FRK_3087.jpg","imgName":"FRK_3087.jpg","imgSize":123123,"imgVersion":1,"status":2},
  {"id":7, "imgIndex":7,"imgKey":"FRK_3222.jpg","imgName":"FRK_3222.jpg","imgSize":123123,"imgVersion":1,"status":0},
  {"id":8, "imgIndex":8,"imgKey":"F24A7678.JPG","imgName":"F24A7678.JPG","imgSize":123123,"imgVersion":2,"status":0},
  {"id":9, "imgIndex":9,"imgKey":"F24A7731.JPG","imgName":"F24A7731.JPG","imgSize":123123,"imgVersion":2,"status":0},
  {"id":10, "imgIndex":10,"imgKey":"F24A7683.JPG","imgName":"F24A7683.JPG","imgSize":123123,"imgVersion":2,"status":0},
];

let photoTruingListPromise = Promise.resolve(photoTruingList);


@Injectable()
export class PhotoTruingService {

  //查询所有精修片
  getPhotoTruingList() {
    return photoTruingListPromise;
  }

}

