import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { UserService } from '../../config/user.service'

@Component({
  selector: 'page-set',
  templateUrl: 'setting.html'
})
export class SettingPage {

  constructor(public navCtrl: NavController,
    private camera: Camera) {

  }
  streamTrack = [];
  imgBase = '';
  phoneNumber = null;
  user_id = null;
  face_token = null;
  int1 = null;
  int2 = null;
  i = 0;
  aliAccount = null;
  video = null;
  canvas = null;
  ctx = null;
  ngOnInit() {
    // setTimeout(this.getH5Cameral(), 0)
    console.log('iii');
    // this.video = document.getElementById('video2');
    // this.canvas = document.getElementById('canvas2');
    // this.ctx = this.canvas.getContext('2d');
    // this.getH5Cameral()

  }
  getH5Cameral() {
    let _self = this;
    console.log('123')
    // video.srcObject = null; 
    // console.log(navigator.mediaDevices)
    // console.log(navigator.mozGetUserMedia)
    // console.log(navigator.webkitGetUserMedia)
    // console.log(navigator.getUserMedia)

    // if (navigator.mediaDevices === undefined) {
    //   navigator['mediaDevices'] = {};
    // }
    // console.log(navigator.mediaDevices)
    // 一些浏览器部分支持 mediaDevices。我们不能直接给对象设置 getUserMedia 
    // 因为这样可能会覆盖已有的属性。这里我们只会在没有getUserMedia属性的时候添加它。
    // if (navigator.mediaDevices.getUserMedia === undefined) {
    //   navigator.mediaDevices.getUserMedia = function (constraints) {

    //     // 首先，如果有getUserMedia的话，就获得它
    //     var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    //     // 一些浏览器根本没实现它 - 那么就返回一个error到promise的reject来保持一个统一的接口
    //     if (!getUserMedia) {
    //       return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
    //     }

    //     // 否则，为老的navigator.getUserMedia方法包裹一个Promise
    //     return new Promise(function (resolve, reject) {
    //       getUserMedia.call(navigator, constraints, resolve, reject);
    //     });
    //   }
    // }
    // navigator.mediaDevices.getUserMedia({ video: { facingMode: "user", width: 300, height: 300 }, audio: false }).then(stream => {
    //     navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(stream => {
    //     // video.setAttribute('height','300')
    //     // console.log(stream)
    //     // let video = document.getElementById('video');

    //     this.video.srcObject = stream;
    //     // console.log('ww',_self.video.videoHeight)

    //     this.video.onloadedmetadata = function (e) {
    //         _self.video.play();
    //     };
    //     _self.streamTrack = stream.getVideoTracks();
    //     setTimeout(() => {
    //         _self.drawImage()
    //     }, 1700)
    //     // setTimeout(() => {
    //     //     // console.log(canvas.toDataURL('image/png').slice(22))
    //     //     _self.askServer(_self.canvas.toDataURL("image/png"))
    //     // }, 2500)
    // }).catch(err => {
    //     // alert(err.name)
    //     // alert(err.message)
    //     console.log(err)
    // })
    const options={ video: true, audio: false }
    navigator.mediaDevices.getUserMedia(options).then(stream => {
      // navigator.getUserMedia({ video: true, audio: false }, stream => {
      // video.setAttribute('height','300')
      // console.log(stream)
      // let video = document.getElementById('video');

      this.video.srcObject = stream;
      // console.log('ww',_self.video.videoHeight)

      this.video.onloadedmetadata = function (e) {
        _self.video.play();
      };
      _self.streamTrack = stream.getVideoTracks();
      setTimeout(() => {
        _self.drawImage()
      }, 1700)
      // setTimeout(() => {
      //   // console.log(canvas.toDataURL('image/png').slice(22))
      //   _self.askServer(_self.canvas.toDataURL("image/png"))
      // }, 2500)
    }, err => {
      // alert(err.name)
      // alert(err.message)
      console.log(err)
    })
  }
  drawImage() {
    // let _self = this;
    // if(this.video.paused||this.video.ended){
    //     console.log('video stop')
    //     return
    // }
    this.int1 = setInterval(() => {
      // console.log('drawing')
      this.ctx.drawImage(this.video, 0, 0);
    }, 50)
    // setTimeout(_self.drawImage(),0)
    // setTimeout(_self.stopCameral(),10000)
  }
  stopCameral() {
    if (this.streamTrack.length == 0) return;
    // let stream = video.srcObject;
    // let tracks = stream.getTracks();
    this.streamTrack.forEach(function (track) {
      track.stop();
    });

    this.video.srcObject = null;
    // this.streamTrack[0].stop();
    // let video = document.getElementById('video');
    // video.stop();
    clearInterval(this.int1);
    this.int1 = null;
    // clearInterval(this.int2)

  }
  
  takePicture(){
    const options = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(base64Image)
     }, (err) => {
      // Handle error
      console.log(err)
     });
  }
  
}
