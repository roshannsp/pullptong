import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

import { RandomEatRoutingModule } from './random-eat-routing.module'
import { RandomEatComponent } from './random-eat.component'

@NgModule({
  declarations: [RandomEatComponent],
  imports: [CommonModule, RandomEatRoutingModule, ReactiveFormsModule]
})
export class RandomEatModule {}
