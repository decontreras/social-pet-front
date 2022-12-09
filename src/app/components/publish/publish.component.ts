import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PublishService } from 'src/app/services/publish.service';
import { Preferences } from '@capacitor/preferences';
import { JwtDecodeService } from 'src/app/services/jwt-decode.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss'],
})
export class PublishComponent implements OnInit {

  multimediaList = [];
  multimediaLength = 0;
  allowedMimeType = ['image/png', 'image/gif', 'video/mp4', 'image/jpeg'];
  typesEnum = ['busqueda de hogar', 'busqueda de colecta', 'busqueda de ayuda'];
  type: any;
  userToken: any;
  dataUser: any = {};
  isModalOpen = false;
  @Output() reloadHome = new EventEmitter<any>();

  constructor(
    private publishService: PublishService,
    private jwtDecodeService: JwtDecodeService,
    private userService: UserService,
    private router: Router
  ) { }

  async ngOnInit() {
    const { value } = await Preferences.get({ key: 'token' });
    this.userToken = this.jwtDecodeService.decodeToken(value);
    this.userService.getUserById(this.userToken.uid).subscribe((data) => {
      this.dataUser = data;
    }, error => {
      console.log(error);
    });
  }

  uploadPreview(event) {
    this.multimediaLength = 0;
    this.multimediaList = [];
    for (let fileItem = 0; fileItem < event.target.files.length; fileItem++) {
      this.getBase64(event.target.files[fileItem]);
    }
  }

  getBase64(file) {
    let self = this;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      self.multimediaList.push({
        type: file.type,
        base64: reader.result
      });
      if (self.multimediaLength < 3)
        self.multimediaLength = self.multimediaLength + 1;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  upload() {
    const text = document.getElementById("publish__content_text").textContent;
    if ((text || this.multimediaLength) && this.type) {
      this.publishService.newPublish({
        userId: this.userToken.uid,
        multimedia: this.multimediaList,
        text,
        type: this.type
      }).subscribe(() => {
        this.multimediaList = [];
        this.multimediaLength = 0;
        this.type = null;
        document.getElementById("publish__content_text").textContent = "";
        this.reloadHome.emit();
      }, error => {
        console.log(error);
      });
    } else {
      alert("Seleccione el tipo de publicación y algún contenido.");
    }
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
