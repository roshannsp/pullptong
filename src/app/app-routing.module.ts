import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AppComponent } from './app.component'
import { MenuComponent } from './menu/menu.component'

const routes: Routes = [
  { path: 'menu', component: MenuComponent },
  {
    path: 'random-eat',
    loadChildren: () => import('./random-eat/random-eat.module').then(mod => mod.RandomEatModule)
  },
  {
    path: 'countdown',
    loadChildren: () => import('./countdown/countdown.module').then(mod => mod.CountdownModule)
  },
  { path: '**', redirectTo: 'menu', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
