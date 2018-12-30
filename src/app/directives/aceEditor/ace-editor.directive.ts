import { Component } from '@angular/core';

@Component({
  template: `
  <div ace-editor
       [(text)]="text"
       [mode]="javascript"
       [theme]="'eclipse'"
       [options]="options"
       [readOnly]="false"
       [autoUpdateContent]="true"
       [durationBeforeCallback]="1000"
       (textChanged)="onChange($event)"
       style="min-height: 200px; width:100%; overflow: auto;"></div>
  `
})

export class AceEditorDirective {
  text:string = "";
  options:any = {maxLines: 1000, printMargin: false};


  constructor() { }

  onChange(code) {
      console.log("new code", code);
  }
}
