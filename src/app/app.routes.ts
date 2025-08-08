import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { TournamentDetailsComponent } from './tournament-details/tournament-details';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tournament/:id', component: TournamentDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }