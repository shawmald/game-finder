import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GamefinderComponent } from './gamefinder/gamefinder.component';
import { CharactersComponent } from './characters/characters.component';
import { GmScreenComponent } from './gm-screen/gm-screen.component';
import { DiceRollerComponent } from './dice-roller/dice-roller.component';
import { AboutComponent } from './about/about.component';
import { MessagesComponent } from './messages/messages.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';  // keep at end

const routes: Routes = [
  { path: '', redirectTo: 'gamefinder', pathMatch: 'full'},

  { path: 'gamefinder', component: GamefinderComponent },
  { path: 'characters', component: CharactersComponent },
  { path: 'gmscreen', component: GmScreenComponent },
  { path: 'diceroller', component: DiceRollerComponent },
  { path: 'about', component: AboutComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'profile', component: ProfileComponent }, //replace when login implemented
  /*{ path: 'profile/:username', component: ProfileComponent },*/ //might cause issues without login?
  { path: 'settings', component: SettingsComponent },

  /*
  { path: 'login', component: LoginPageComponent, canActivate: [LoginGuard] },
  { path: 'register', component: RegisterPageComponent, canActivate: [LoginGuard] },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  */

  { path: '**', component: PageNotFoundComponent }  //always keep at end
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
