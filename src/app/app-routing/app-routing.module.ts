import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from '../room/room.component';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { NotFoundComponent } from '../notFound/notFound.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path:'login', component: LoginComponent},
  {path: '404', component: NotFoundComponent},
  // All routes need to be above this one, or theyll be considered a room variable
  { path:':documentID',component: RoomComponent},
  {path: '**', redirectTo: '/404'} 
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: false }) ],
  exports: [ RouterModule ]
})





export class AppRoutingModule {}
