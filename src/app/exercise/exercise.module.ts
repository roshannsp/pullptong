import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ExerciseRoutingModule } from './exercise-routing.module'
import { ExerciseComponent } from './exercise.component'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [ExerciseComponent],
  imports: [CommonModule, ReactiveFormsModule, ExerciseRoutingModule]
})
export class ExerciseModule {}
