import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { io } from "socket.io-client";
import { Preferences } from '@capacitor/preferences';
import { JwtDecodeService } from './jwt-decode.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  io: any;
  userOnline: [];
  actionSendMessage: any = () => { };
  actionReciveMessageGeneral: any = () => { };
  actioNewMessage: any = () => { };

  constructor(
    private jwtDecodeService: JwtDecodeService
  ) {
    this.initSocket();
  }

  async initSocket() {
    const { value } = await Preferences.get({ key: 'token' });
    try {
      const userToken: any = await this.jwtDecodeService.decodeToken(value);
      this.io = io(environment.socketURL, {
        withCredentials: true,
        auth: {
          user: userToken.uid
        }
      });
      this.listenEvents();
    } catch (e) {
      console.log("cliente sin usuario");
    }
  }

  async listenEvents() {
    this.io.on("userOnline", (data) => {
      this.userOnline = data;
    });
    this.io.on("sendMessage", (data) => {
      this.actionSendMessage(data);
    })
    this.io.on("reciveMessageGeneral", (data) => {
      this.actionReciveMessageGeneral(data);
    })
    this.io.on("newMessage", () => {
      this.actioNewMessage();
    })
  }
}
