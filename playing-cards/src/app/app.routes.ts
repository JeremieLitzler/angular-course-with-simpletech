import { Routes } from '@angular/router';
import { MonsterListComponent } from './pages/monster-list/monster-list.component';
import { MonsterComponent } from './pages/monster/monster.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { isLoggedInGuard } from './guards/is-logged-in.guard';
import { RxJsDemosComponent } from './pages/rx-js-demos/rx-js-demos.component';
import { SearchPageComponent } from './pages/search/search.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'rxjs',
    component: RxJsDemosComponent,
  },
  {
    path: 'search',
    component: SearchPageComponent,
  },
  {
    path: 'home',
    component: MonsterListComponent,
    canActivate: [isLoggedInGuard],
  },
  {
    path: 'monster',
    children: [
      // route for new monster
      { path: '', component: MonsterComponent, canActivate: [isLoggedInGuard] },
      // route for an existing monster
      {
        path: ':id',
        component: MonsterComponent,
        canActivate: [isLoggedInGuard],
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
