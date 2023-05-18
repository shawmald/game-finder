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
import { LoginComponent } from './login/login.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';  // keep at end
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'gamefinder', pathMatch: 'full'},

  { path: 'gamefinder', component: GamefinderComponent, canActivate: [AuthGuard]},
  { path: 'characters', component: CharactersComponent, canActivate: [AuthGuard]},
  { path: 'gmscreen', component: GmScreenComponent, canActivate: [AuthGuard]},
  { path: 'diceroller', component: DiceRollerComponent, canActivate: [AuthGuard]},
  { path: 'about', component: AboutComponent},
  { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard]},
  { path: 'profile/:username', component: ProfileComponent }, //causes issues without login
  { path: 'settings', component: SettingsComponent,  canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'logout', component: LogoutComponent },

  { path: '**', component: PageNotFoundComponent }  //always keep at end
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
