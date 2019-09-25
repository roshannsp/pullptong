import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { RandomEatComponent } from './random-eat.component'

const routes: Routes = [
  {
    path: '',
    component: RandomEatComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RandomEatRoutingModule {}
