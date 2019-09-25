import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { BeverageComponent } from './beverage.component'

const routes: Routes = [
  {
    path: '',
    component: BeverageComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeverageRoutingModule {}
