import { LoadingService } from './../../services/loading.service'
import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { debounceTime } from 'rxjs/operators'

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss']
})
export class LoadingScreenComponent implements OnInit, OnDestroy {
  loading: boolean = false
  loadingSubscription: Subscription

  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    this.loadingSubscription = this.loadingService.loadingStatus.pipe(debounceTime(200)).subscribe(value => {
      this.loading = value
    })
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe()
  }
}
