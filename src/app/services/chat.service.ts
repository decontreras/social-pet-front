import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  allChat: any = [];
  chatId: any;
  actionReceive: any = () => { };
  actionReloadRoom: any = () => { };
  listChats: any = [];

  constructor(
    private socket: SocketService
  ) { }

  public connected(chatId: any) {    
    this.socket.io.emit("activateChat", { chatId });
    this.chatId = chatId.chatId;
    this.socket.actionSendMessage = (data) => this.reciveMessage(data);
  }

  public disconnect() {
    this.socket.io.emit("inactivateChat");
  }

  public connectedGeneral() {
    this.socket.io.emit("activateRoom");
    this.socket.actionReciveMessageGeneral = (data) => this.reloadRoom(data);
  }

  public disconnectGeneral() {
    this.socket.io.emit("inactivateRoom");
  }

  public sendMessage(payload: any) {
    this.socket.io.emit("sendMessage", payload);
  }

  public reciveMessage(data) {console.log(data);
  
    if (this.chatId == data._id) {
      this.allChat = data.messages;
      this.actionReceive();
    }
  }

  reloadRoom(data) {
    this.listChats = data;
    this.actionReloadRoom();
  }
}
