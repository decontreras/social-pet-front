import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { FriendService } from 'src/app/services/friend.service';
import { JwtDecodeService } from 'src/app/services/jwt-decode.service';

@Component({
  selector: 'app-request',
  templateUrl: 'request.page.html',
  styleUrls: ['request.page.scss']
})
export class RequestPage implements OnInit {

  requestList: any;
  userToken: any;

  constructor(
    private friendService: FriendService,
    private jwtDecodeService: JwtDecodeService,
    private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      const { value } = await Preferences.get({ key: 'token' });
      this.userToken = this.jwtDecodeService.decodeToken(value);
      this.listRequest();
    });
  }

  listRequest() {
    this.friendService.listRequest(this.userToken.uid).subscribe((data: any) => {
      this.requestList = data;
    }, error => {
      console.log(error);
    });
  }

  acceptRequest(id) {
    this.friendService.acceptRequest(id).subscribe(() => {
      this.listRequest();
    }, error => {
      console.log(error);
    });
  }

  declineRequest(id) {
    this.friendService.declineRequest(id).subscribe(() => {
      this.listRequest();
    }, error => {
      console.log(error);
    });
  }

}
