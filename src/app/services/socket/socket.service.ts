import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Observer } from 'rxjs/Observer';

import io from "socket.io-client";


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket;
  messageObserver: Observer<any>;

  constructor() { }

  public initSocket(){
    this.socket = io.connect('http://localhost:8080');
  }

  public sendData(data){
    this.socket.emit("data",data);
  }

  public joinRoom(room) {
     this.socket.emit('subscribe', {room: room});
 }

 public leaveRoom(room) {
     this.socket.emit('unsubscribe', {room: room});
 }

  getContent(): Observable<any> {
   this.socket.on('message', (message) => {
     this.messageObserver.next(message);
   });
   return new Observable(messageObserver => {
     this.messageObserver = messageObserver;
   });
 }

  private handleError(error) {
      console.error('server error:', error);
      if (error.error instanceof Error) {
          let errMessage = error.error.message;
          return Observable.throw(errMessage);
      }
      return Observable.throw(error || 'Socket.io server error');
    }
}
