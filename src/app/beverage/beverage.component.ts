import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-beverage',
  templateUrl: './beverage.component.html',
  styleUrls: ['./beverage.component.scss']
})
export class BeverageComponent implements OnInit, OnDestroy {
  timer = 3
  timerInterval: any
  alpha = 0
  alphaInterval: any
  constructor(private router: Router) {}

  ngOnInit() {
    const alphaPerTik = 3000 / 50
    this.alphaInterval = setInterval(() => {
      this.alpha += alphaPerTik / 3600
    }, 50)
    this.timerInterval = setInterval(() => {
      --this.timer
      if (this.timer === 0) {
        clearInterval(this.timer)
        clearInterval(this.alphaInterval)
        this.router.navigate(['/menu'])
      }
    }, 1000)
  }

  ngOnDestroy(): void {
    clearInterval(this.timer)
    clearInterval(this.alphaInterval)
  }
}
