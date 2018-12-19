import { Component, OnInit, ViewChild } from '@angular/core';
import { SocketService } from '../services/socket/socket.service'
import { Subscription } from 'rxjs/Subscription';

import 'brace';
import 'brace/theme/solarized_dark';
import 'brace/mode/yaml';
import { AceEditorComponent } from 'ng2-ace-editor';


declare var ace:any;

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

   //  this.paramsSubscribe=this.activatedRoute.params.subscribe(params => {
   //   this.socketService.leaveRoom(this.channelID);
   //   this.documentID = params['documentID'];
   //   this.socketService.joinRoom(this.documentID);
   // });
  }

  ngOnInit() {
    let Range = require('brace').acequire('ace/range').Range;
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
            case "remove":
                  console.log("Removing");
                  this.silent = true
                  console.log(this.editor.getEditor())
                  console.log(message)
                  if(message.start.row === message.end.row){
                    this.editor.getEditor().session.remove(new Range(message.start.row,message.start.column,message.end.row,message.end.column));
                  }
                  this.silent = false
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
