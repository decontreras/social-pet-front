import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { FriendService } from 'src/app/services/friend.service';
import { JwtDecodeService } from 'src/app/services/jwt-decode.service';

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.page.html',
  styleUrls: ['chat.page.scss']
})
export class ChatPage {

  friendsList: any;
  userToken: any;
  dateDefault = new Date();

  constructor(
    private friendService: FriendService,
    private jwtDecodeService: JwtDecodeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      const { value } = await Preferences.get({ key: 'token' });
      this.userToken = this.jwtDecodeService.decodeToken(value);
      this.listFriends();
    });
  }

  listFriends() {
    this.friendService.listFriends(this.userToken.uid).subscribe((data: any) => {
      this.friendsList = data;
    }, error => {
      console.log(error);
    });
  }

  navigateToConversation(id) {
    this.router.navigate(['/conversation', { id }]);
  }

}
