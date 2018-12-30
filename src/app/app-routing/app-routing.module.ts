import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from '../room/room.component';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path:':documentID',component: RoomComponent},
  { path:'login', component: LoginComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})





export class AppRoutingModule {}
