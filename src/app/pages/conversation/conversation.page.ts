import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { FriendService } from 'src/app/services/friend.service';
import { JwtDecodeService } from 'src/app/services/jwt-decode.service';
import { ChatService } from 'src/app/services/chat.service';
import 'emoji-picker-element';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-conversation',
  templateUrl: 'conversation.page.html',
  styleUrls: ['conversation.page.scss']
})
export class ConversationPage {

  userToken: any = {};
  friendData: any = {};
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @ViewChild('emojiButton') private emojiButton: ElementRef;
  @ViewChild('emojiElement') private emojiElement: ElementRef;
  showEmoji: boolean = false;
  text = "";
  allowedMimeType = ['image/png', 'image/gif', 'video/mp4', 'image/jpeg'];
  multimediaLength = 0;
  multimediaList = [];
  viewPreview = false;
  isModalOpen = false;
  isModalOpen2 = false;
  temporalList = [];

  constructor(
    private friendService: FriendService,
    private jwtDecodeService: JwtDecodeService,
    private renderer: Renderer2,
    private chatService: ChatService,
    private readonly activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (e.target !== this.emojiButton.nativeElement && e.target !== this.emojiElement.nativeElement) {
        this.showEmoji = false;
      }
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      const { value } = await Preferences.get({ key: 'token' });
      this.userToken = this.jwtDecodeService.decodeToken(value);
      this.getData(params);
      document.querySelector('emoji-picker')
        .addEventListener('emoji-click', event => this.text = this.text + event.detail.unicode);
    });
  }

  getData(params) {
    this.friendService.getById(params.id).subscribe((data: any) => {
      this.friendData = data;
      this.chatService.allChat = this.friendData.messages;
      this.chatService.actionReceive = () => this.scrollToBottom();
      this.chatService.connected({ chatId: this.friendData._id });
      this.scrollToBottom();
    })
  }

  emojiPicker() {
    this.showEmoji = !this.showEmoji;
    this.multimediaList = [];
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    setTimeout(() => {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    }, 500);
  }

  sendMessage(sendForm: NgForm) {
    if (sendForm.value.message || this.multimediaList.length) {
      const otherUser = this.friendData.user_1.uid == this.userToken.uid ? this.friendData.user_2.uid : this.friendData.user_1.uid;
      const payload = {
        chatId: this.friendData._id,
        message: sendForm.value,
        from: this.userToken.uid,
        to: otherUser,
        multimedia: this.multimediaList
      };
      const user = this.friendData.user_1.uid != this.userToken.uid ? this.friendData.user_2.uid : this.friendData.user_1.uid;
      console.log(payload);

      this.chatService.allChat.push({ message: payload.message.message, multimedia: payload.multimedia, user, created_at: new Date() })
      this.scrollToBottom();
      this.chatService.sendMessage(payload);
      this.text = "";
      this.multimediaList = [];
    }
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

  closePreview() {
    this.viewPreview = false;
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  setOpen2(isOpen: boolean, array: any) {
    this.isModalOpen2 = isOpen;
    this.temporalList = array;
  }

  backToChats() {
    this.router.navigate(["/tabs/tab2"]);
  }

}
