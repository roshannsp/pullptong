import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Component, OnInit } from '@angular/core'
import { debounceTime, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit {
  running = false
  phase: string
  targetDate: number
  timer: any = ''
  interval: any
  exerciseFormGroup: FormGroup
  totalTime: string
  totalTimeNumber: number
  destroy$: Subject<boolean> = new Subject<boolean>()
  currentSet = 0
  tickSound: any
  endSetSound: any
  finishedSound: HTMLAudioElement

  data: {
    numberOfSet: number
    exerciseTimeMinute: number
    exerciseTimeSecond: number
    restTimeMinute: number
    restTimeSecond: number
  } = {
    numberOfSet: 8,
    exerciseTimeMinute: 0,
    exerciseTimeSecond: 20,
    restTimeMinute: 0,
    restTimeSecond: 10
  }

  constructor() {}

  ngOnInit() {
    this.loadSound()
    this.exerciseFormGroup = new FormGroup({
      numberOfSet: new FormControl(this.data.numberOfSet, [Validators.required]),
      exerciseTimeMinute: new FormControl(this.data.exerciseTimeMinute, [Validators.required]),
      exerciseTimeSecond: new FormControl(this.data.exerciseTimeSecond, [Validators.required]),
      restTimeMinute: new FormControl(this.data.restTimeMinute, [Validators.required]),
      restTimeSecond: new FormControl(this.data.restTimeSecond, [Validators.required])
    })
    this.calculateTotalTime(this.exerciseFormGroup.value)
    this.exerciseFormGroup.valueChanges
      .pipe(
        debounceTime(300),
        takeUntil(this.destroy$)
      )
      .subscribe(data => {
        this.data = data
        this.calculateTotalTime(data)
      })
  }

  loadSound() {
    this.tickSound = new Audio()
    this.tickSound.src = '../../assets/sounds/tick.mp3'
    this.tickSound.load()
    this.endSetSound = new Audio()
    this.endSetSound.src = '../../assets/sounds/success.mp3'
    this.endSetSound.load()
    this.finishedSound = new Audio()
    this.finishedSound.src = '../../assets/sounds/tada.mp3'
    this.finishedSound.load()
    this.finishedSound.volume = 0.3
  }

  calculateTotalTime(data: {
    numberOfSet: number
    exerciseTimeMinute: number
    exerciseTimeSecond: number
    restTimeMinute: number
    restTimeSecond: number
  }) {
    const totalExerciseTime = data.exerciseTimeMinute * 60 + data.exerciseTimeSecond
    const totalRestTime = data.restTimeMinute * 60 + data.restTimeSecond
    const totalTime = (totalExerciseTime + totalRestTime) * data.numberOfSet
    const days = Math.floor(totalTime / (60 * 60 * 24))
    const hours = Math.floor((totalTime % (60 * 60 * 24)) / (60 * 60))
    const minutes = Math.floor((totalTime % (60 * 60)) / 60)
    const seconds = Math.floor(totalTime % 60)
    if (days > 0) {
      this.totalTime = 'เยอะไปป้ะจ้ะ'
      this.totalTimeNumber = 0
    } else {
      if (hours) {
        this.totalTime = `${this.zeroPadding(hours)}:${this.zeroPadding(minutes)}:${this.zeroPadding(seconds)}`
      } else {
        this.totalTime = `${this.zeroPadding(minutes)}:${this.zeroPadding(seconds)}`
      }
      this.totalTimeNumber = totalTime
    }
  }

  start() {
    let counter = 0
    if (this.phase === 'Exercise Time') {
      this.phase = 'Rest Time'
    } else {
      this.phase = 'Exercise Time'
    }
    this.timer = ''
    this.running = true
    this.interval = setInterval(() => this.calculateTime(this.data.exerciseTimeMinute, this.data.exerciseTimeSecond, counter++), 1000)
  }

  stop() {
    this.running = false
    this.timer = ''
    this.phase = undefined
    this.currentSet = 0
    clearInterval(this.interval)
  }

  restart() {
    this.timer = ''
    this.phase = undefined
    this.currentSet = 0
    clearInterval(this.interval)
    this.start()
  }

  calculateTime(targetMinute: number, targetSecond: number, counter: number) {
    const distance = targetMinute * 60 + targetSecond - counter
    const minutes = Math.floor((distance % (60 * 60)) / 60)
    const seconds = Math.floor(distance % 60)
    this.timer = `${this.zeroPadding(minutes)}:${this.zeroPadding(seconds)}`
    if (distance <= 3 && distance > 0) {
      if (this.tickSound.played) {
        this.tickSound.pause()
      }
      this.tickSound.play()
    } else if (distance <= 0) {
      if (this.phase === 'Rest Time') {
        this.currentSet++
        if (this.currentSet === this.data.numberOfSet) {
          clearInterval(this.interval)
          if (this.finishedSound.played) {
            this.finishedSound.pause()
          }
          this.finishedSound.play()
          this.timer = `FINISHED`
          return
        }
      }
      this.newSet()
    }
  }

  newSet() {
    if (this.endSetSound.played) {
      this.endSetSound.pause()
    }
    this.endSetSound.play()
    clearInterval(this.interval)
    this.start()
  }

  zeroPadding(n: number) {
    return n.toString().padStart(2, '0')
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    clearInterval(this.interval)
  }
}
