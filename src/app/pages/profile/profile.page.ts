import { Component, OnInit } from '@angular/core';
import { PublishService } from 'src/app/services/publish.service';
import { Preferences } from '@capacitor/preferences';
import { JwtDecodeService } from 'src/app/services/jwt-decode.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FriendService } from 'src/app/services/friend.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {

  publishList: any = [];
  userToken: any;
  userData: any = {};
  idOtherUser: any;
  friend: boolean;
  isModalOpen = false;
  allowedMimeType = ['image/png', 'image/jpeg'];
  newProfile: any;
  publish = true;
  idUser: any;

  constructor(
    private publishService: PublishService,
    private userService: UserService,
    private friendService: FriendService,
    private jwtDecodeService: JwtDecodeService,
    private readonly activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      const { value } = await Preferences.get({ key: 'token' });
      this.userToken = this.jwtDecodeService.decodeToken(value);
      let userSelect = this.userToken.uid;
      if (params.id && params.id != this.userToken.uid) {
        this.validRequest(params);
        userSelect = params.id;
        this.publish = false;
      }
      this.getUser(userSelect);
      this.listPublish(userSelect);
      this.idUser = userSelect;
    });
  }

  getUser(userSelect) {
    this.userService.getUserById(userSelect).subscribe((data) => {
      this.userData = data;
    }, error => {
      console.log(error);
    });
  }

  listPublish(userSelect) {
    this.publishService.listByUser(userSelect).subscribe((data) => {
      this.publishList = data;
    }, error => {
      console.log(error);
    });
  }

  validRequest(params) {
    this.friendService.listByUsers(this.userToken.uid, params.id).subscribe((data: any) => {
      this.friend = data ? data.status : "none";
      this.idOtherUser = params.id;
    })
  }

  request() {
    this.friendService.request({
      user_1: this.userToken.uid,
      user_2: this.idOtherUser
    }).subscribe((data) => {
      this.validRequest({ id: this.idUser });
    }, error => {
      console.log(error);
    });
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  uploadPreview(event) {
    this.getBase64(event.target.files[0]);
  }

  getBase64(file) {
    let self = this;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      self.newProfile = reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  edit() {
    this.userService.update(this.userToken.uid, { image: this.newProfile }).subscribe(async (data: any) => {
      this.userData.image = this.newProfile;
      this.isModalOpen = false;
    }, error => {
      console.log(error);
    });
  }

}
