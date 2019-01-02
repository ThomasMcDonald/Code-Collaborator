import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AceEditorModule } from 'ng2-ace-editor';
import { AceEditorDirective } from './directives/aceEditor/ace-editor.directive';
import { RoomComponent } from './room/room.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './notFound/notFound.component';

@NgModule({
  declarations: [
    AppComponent,
    AceEditorDirective,
    RoomComponent,
    LoginComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AceEditorModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
