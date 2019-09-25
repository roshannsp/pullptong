import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { CountdownComponent } from './countdown.component'

const routes: Routes = [
  {
    path: '',
    component: CountdownComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountdownRoutingModule {}
