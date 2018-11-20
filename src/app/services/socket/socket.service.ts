import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Observer } from 'rxjs/Observer';

import io from "socket.io-client";


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket;
  constructor() { }

  public initSocket(){
    this.socket = io.connect('http://localhost:8080');
  }

  public sendData(data){
    this.socket.emit("data",data);
  }


}
