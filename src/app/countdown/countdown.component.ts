import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {
  targetDate: number
  timer: any
  interval: any
  alpha = 0
  constructor() {}

  ngOnInit() {
    this.targetDate = new Date(2019, 9, 10, 18, 30, 0, 0).getTime()
    this.interval = setInterval(() => this.countdown(), 1000)
  }

  countdown() {
    const now = new Date().getTime()
    const distance = this.targetDate - now
    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)
    this.timer = `${days}d ${hours}h ${minutes}m ${seconds}s`
    this.alpha = 1 - distance / 1500000000
    if (distance <= 0) {
      clearInterval(this.interval)
      this.timer = `LET'S DATE <3`
    }
  }
}
