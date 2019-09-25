import { Component, OnInit } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import * as firebase from 'firebase/app'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(public afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit() {}

  async facebook() {
    const provider = new firebase.auth.FacebookAuthProvider()
    try {
      const res = await this.afAuth.auth.signInWithPopup(provider)
      this.next()
    } catch (err) {
      console.log(err)
    }
  }

  async twitter() {
    const provider = new firebase.auth.TwitterAuthProvider()
    try {
      const res = await this.afAuth.auth.signInWithPopup(provider)
      this.next()
    } catch (err) {
      console.log(err)
    }
  }

  async google() {
    const provider = new firebase.auth.GoogleAuthProvider()
    try {
      const res = await this.afAuth.auth.signInWithPopup(provider)
      this.next()
    } catch (err) {
      console.log(err)
    }
  }

  next() {
    this.router.navigate(['/menu'])
  }
}
