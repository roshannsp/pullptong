import { LoadingService } from './../shared/services/loading.service'
import { Component, OnInit } from '@angular/core'
import { Menu } from './../model/menu'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
declare const $: any

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menus: Menu[] = []
  user: any
  whitelist: any
  whitelistChange: any
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private loadingService: LoadingService) {}

  ngOnInit() {
    this.user = this.afAuth.auth.currentUser
    if (this.user) {
      this.checkWhitelist()
    }
  }

  checkWhitelist() {
    this.loadingService.startLoading()
    this.db
      .collection('whitelist', ref => ref.where('uid', '==', this.user.uid))
      .valueChanges()
      .subscribe((items: any) => {
        let isAdmin = false
        if (items && items.length > 0) {
          isAdmin = true
        }
        this.getMenus(isAdmin)
      })
  }

  getMenus(isAdmin: boolean) {
    if (isAdmin) {
      this.db
        .collection('menus')
        .valueChanges()
        .subscribe((menus: any[]) => {
          if (menus && menus.length > 0) {
            let newMenu = []
            for (let menu of menus) {
              newMenu = newMenu.concat(menu.menus)
            }
            this.menus = newMenu
          }
          this.loadingService.stopLoading()
        })
    } else {
      this.db
        .collection('menus', ref => ref.where('role', '==', 'user'))
        .valueChanges()
        .subscribe((menus: any[]) => {
          if (menus && menus.length > 0) {
            let newMenu = []
            for (let menu of menus) {
              newMenu = newMenu.concat(menu.menus)
            }
            this.menus = newMenu
          }
          this.loadingService.stopLoading()
        })
    }
  }
}
