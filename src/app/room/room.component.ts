import { Component, OnInit, ViewChild } from '@angular/core';
import { SocketService } from '../services/socket/socket.service'
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  @ViewChild('editor') editor;
  text: string = "";
  messagesSub: Subscription;
  private silent;

  constructor(private socketService: SocketService) {
    this.socketService.initSocket();

  }

  ngOnInit() {
    this.editor.getEditor().on("change", data => this.sendData(data));

    this.messagesSub = this.socketService.getContent()
      .subscribe(message => {
        try{
          switch(message.action){
            case "insert":
                  this.silent = true
                  console.log(this.editor);
                  if(message.lines[0] === ""){this.editor.getEditor().session.insert(message.start, '\n')}
                  this.editor.getEditor().session.insert(message.start, message.lines[0].toString());
                  this.silent = false
                  console.log(message);
                  break;
          }
        }catch(e){
          console.log(e);
        }
      });
  }

  ngAfterViewInit() {

      }


    sendData(e){
      if(this.silent) return;
      this.socketService.sendData(e);
    }


}
