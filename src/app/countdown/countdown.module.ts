import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CountdownRoutingModule } from './countdown-routing.module';
import { CountdownComponent } from './countdown.component'

@NgModule({
  declarations: [CountdownComponent],
  imports: [CommonModule, CountdownRoutingModule]
})
export class CountdownModule {}
