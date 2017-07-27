import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UsersComponent } from 'app/users/users.component';
import { ServersComponent } from 'app/servers/servers.component';
import { EditServerComponent } from 'app/servers/edit-server/edit-server.component';
import { ServerComponent } from 'app/servers/server/server.component';
import { UserComponent } from './users/user/user.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from 'app/auth-guard.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'users',
    component: UsersComponent,
    children: [
      { path: ':id/:name', component: UserComponent }
    ]
  },
  {
    path: 'servers',
    // canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService],
    component: ServersComponent,
    children: [
      { path: ':id', component: ServerComponent },
      { path: ':id/edit', component: EditServerComponent }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
