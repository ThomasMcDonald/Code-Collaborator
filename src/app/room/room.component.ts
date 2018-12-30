import { Component, OnInit, ViewChild } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { SocketService } from '../services/socket/socket.service'
import { Subscription } from 'rxjs/Subscription';
import * as ace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';


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
  private documentID = 0;
  private paramsSubscribe;
  constructor(private socketService: SocketService,private activatedRoute: ActivatedRoute, private router: Router) {
    this.socketService.initSocket();

    this.paramsSubscribe=this.activatedRoute.params.subscribe(params => {
     this.socketService.leaveRoom(this.documentID);
     this.documentID = params['documentID'];
     this.socketService.joinRoom(this.documentID);
   });
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
                  console.log(this.editor.getEditor().session.getValue());

                  if(message.lines.length > 1){
                      if(message.lines[0] === ""){this.editor.getEditor().session.insert(message.start, '\n')}
                      else{
                        this.insertLines(message);
                      }
                  }
                  else{
                      this.editor.getEditor().session.insert(message.start, message.lines[0].toString());
                  }
                  this.silent = false
                  console.log(message);
                  break;
            case "remove":
                  this.silent = true
                  this.editor.getEditor().session.remove(new Range(message.start.row,message.start.column,message.end.row,message.end.column));
                  this.silent = false
                  break;
            case "cursorPos":
                  break;

            case "selection":
                  break;
          }
        }catch(e){
          console.log(e);
        }
      });
  }

  ngAfterViewInit() {

      }

  ngOnDestroy() {
          this.messagesSub.unsubscribe();
          this.paramsSubscribe.unsubscribe();
      }

  sendData(message){
      if(this.silent) return;
      this.socketService.sendData(this.documentID,message);
    }

    insertLines(message){
      // This exists purely because i havent figured out how to work the insertlines function
      for(var i=0;i<message.lines.length;i++){
        this.editor.getEditor().session.insert(message.start, message.lines[i]);
        message.start.row++;
        this.editor.getEditor().session.insert(message.start, '\n');
      }
    }


}
