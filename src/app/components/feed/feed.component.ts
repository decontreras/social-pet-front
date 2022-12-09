import { Component, Input, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { JwtDecodeService } from 'src/app/services/jwt-decode.service';
import { PublishService } from 'src/app/services/publish.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {

  @Input() data: any;
  multimediaLength: any;
  isModalOpen = false;
  userToken: any = {};
  hasLike: boolean = false;
  postulado: boolean = false;
  isModalOpen2 = false;
  textComment: String;
  userData: any;

  constructor(
    private publishService: PublishService,
    private jwtDecodeService: JwtDecodeService,
    private userService: UserService
  ) { }

  async ngOnInit() {
    this.multimediaLength = this.data.multimedia.length > 3 ? 3 : this.data.multimedia.length
    const { value } = await Preferences.get({ key: 'token' });
    this.userToken = this.jwtDecodeService.decodeToken(value);
    this.hasLike = this.data.likes.filter(l => this.userToken.uid == l.user).length > 0;
    this.postulado = this.data.request.filter(l => this.userToken.uid == l.user).length > 0;
    console.log(this.data.request, "aquiii", this.userToken.uid);
    
    this.userService.getUserById(this.userToken.uid).subscribe(async (data: any) => {
      this.userData = data;
    }, error => {
      console.log(error);
    });
    this.textComment = "";
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  setOpen2(isOpen: boolean) {
    this.isModalOpen2 = isOpen;
  }

  addLike() {
    this.publishService.addLike(this.data._id, { user: this.userToken.uid }).subscribe(async (data: any) => {
      this.data = data;
      this.hasLike = this.data.likes.filter(l => this.userToken.uid == l.user.uid).length > 0;
    }, error => {
      console.log(error);
    });
  }

  addComment() {
    if (this.textComment) {
      this.publishService.addComment(this.data._id, { user: this.userToken.uid, text: this.textComment }).subscribe(async (data: any) => {
        this.data = data;
      }, error => {
        console.log(error);
      });
      this.textComment = "";
    }
  }

  addRequest() {
    this.publishService.addRequest(this.data._id, { user: this.userToken.uid }).subscribe(async (data: any) => {
      this.data = data;
      this.postulado = this.data.request.filter(l => this.userToken.uid == l.user.uid).length > 0;
    }, error => {
      console.log(error);
    });
  }
}
