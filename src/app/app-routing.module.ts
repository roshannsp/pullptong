import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { MenuComponent } from './menu/menu.component'

import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard'

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login'])
const redirectLoggedInToMenu = () => redirectLoggedInTo(['menu'])

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(mod => mod.LoginModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToMenu }
  },
  {
    path: 'menu',
    component: MenuComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'random-eat',
    loadChildren: () => import('./random-eat/random-eat.module').then(mod => mod.RandomEatModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'countdown',
    loadChildren: () => import('./countdown/countdown.module').then(mod => mod.CountdownModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'document',
    loadChildren: () => import('./document/document.module').then(mod => mod.DocumentModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'beverage',
    loadChildren: () => import('./beverage/beverage.module').then(mod => mod.BeverageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'exercise',
    loadChildren: () => import('./exercise/exercise.module').then(mod => mod.ExerciseModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  { path: '**', redirectTo: 'menu', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
