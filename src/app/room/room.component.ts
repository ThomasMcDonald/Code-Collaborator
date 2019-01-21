import { Component, OnInit, ViewChild, HostListener  } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Title }     from '@angular/platform-browser';
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
  cursorSub: Subscription;
  private document = {
    ID: null as number,
    title: null as string,
    created: null as string,

  };

  private connectedUsers = []; // This is all user positions other than the local user

  private colorPool = ["#FF0000"," #800000"," #FFFF00", "#808000", "#00FF00"," #008000", "#00FFFF"," #008080"]


  private silent;
  private paramsSubscribe;
  private date;
  constructor(private socketService: SocketService,private activatedRoute: ActivatedRoute, private router: Router,private titleService: Title ) {
    this.socketService.initSocket();
    this.document.created = new Date().toString();

    this.paramsSubscribe=this.activatedRoute.params.subscribe(params => {
     this.socketService.leaveRoom(this.document.ID); // Leavbing the group before joining a new one, Default is null.
     this.document.ID = params['documentID'];
     this.titleService.setTitle(this.document.created);
     this.socketService.joinRoom(this.document.ID); // Join new group
   });
  }

  ngOnInit() {
    let Range = require('brace').acequire('ace/range').Range;
    this.editor.getEditor().on("change", data => this.sendData("message", data)); // Pass message data onto sendData function
    this.editor.getEditor().selection.on('changeCursor', data => this.sendData("cursor",this.editor.getEditor().getCursorPosition()));


    this.messagesSub = this.socketService.getContent()
      .subscribe(message => {
        try{
          switch(message.action){
            case "insert":
                  this.silent = true
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

            case "selection":
                  break;
          }
        }catch(e){
          console.log(e);
        }
      });

    this.cursorSub = this.socketService.getCursor()
      .subscribe(cursorPos => {
        console.log(cursorPos);

        // This is now a desirable //
        // if(this.userLocation != null){
        //    this.editor.getEditor().session.removeMarker(this.userLocation);
        //  }
        //  this.userLocation = this.editor.getEditor().session.addMarker(new Range(message.row,message.column,message.row,message.column+1), "bar", true);
        //  console.log(message);
      });

  }

  ngAfterViewInit() {

      }

  ngOnDestroy() {
          this.messagesSub.unsubscribe();
          this.paramsSubscribe.unsubscribe();
      }

  sendData(type,message){
      if(this.silent) return;
      this.socketService.sendData(type,this.document.ID,message);
    }


    insertLines(message){
      // This exists purely because i havent figured out how to work the insertlines function
      for(var i=0;i<message.lines.length;i++){
        this.editor.getEditor().session.insert(message.start, message.lines[i]);
        message.start.row++;
        this.editor.getEditor().session.insert(message.start, '\n');
      }
    }


    onKeyDown($event): void {
    // Detect platform
    if(navigator.platform.match('Mac')){
        this.handleMacKeyEvents($event);
    }
    else {
        this.handleWindowsKeyEvents($event);
    }
  }

  handleMacKeyEvents($event) {
    // MetaKey documentation
    // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/metaKey
    let charCode = String.fromCharCode($event.which).toLowerCase();
    if ($event.metaKey && charCode === 's') {
        // Action on Cmd + S
        $event.preventDefault();
        console.log("Save key pressed")
    }
  }

  handleWindowsKeyEvents($event) {
    let charCode = String.fromCharCode($event.which).toLowerCase();
    if ($event.ctrlKey && charCode === 's') {
        // Action on Ctrl + S
        console.log("Save key pressed")
        this.socketService.saveData();
        $event.preventDefault();
    }
  }


}
