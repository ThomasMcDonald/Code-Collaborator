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
       ></div>
  `
})

export class AceEditorDirective {
  text:string = "";
  options:any = {maxLines: 1000, printMargin: false};

// style="min-height: 200px; width:100%; overflow: auto;"
  constructor() { }

  onChange(code) {
      console.log("new code", code);
  }
}
