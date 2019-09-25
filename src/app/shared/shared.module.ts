import { LoadingService } from './services/loading.service'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component'

@NgModule({
  declarations: [LoadingScreenComponent],
  exports: [LoadingScreenComponent],
  imports: [CommonModule],
  providers: [LoadingService]
})
export class SharedModule {}
