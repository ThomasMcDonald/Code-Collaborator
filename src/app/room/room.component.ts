import { Component, OnInit, ViewChild } from '@angular/core';
import { SocketService } from '../services/socket/socket.service'

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  @ViewChild('editor') editor;
  text: string = "";

  constructor(private socketService: SocketService) {
    this.socketService.initSocket();

  }

  ngOnInit() {
    this.editor.getEditor().on("change", data => this.sendData(data)); 
  }

  ngAfterViewInit() {

      }


    sendData(e){
      this.socketService.sendData(e);
    }


}
