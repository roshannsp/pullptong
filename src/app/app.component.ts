import { Component, OnInit } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router'
import { Location } from '@angular/common'
declare const $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user: any
  whitelist: any
  whitelistChange: any
  constructor(private afAuth: AngularFireAuth, public router: Router, private location: Location) {}

  ngOnInit() {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.user = user
      } else {
        this.user = null
      }
    })
  }

  openConfirmModal() {
    $('#signOutModal').modal()
  }

  logout() {
    this.afAuth.auth.signOut()
    this.router.navigate(['/login'])
  }

  back() {
    this.location.back()
  }
}
