import { Component, OnInit } from '@angular/core'
import { Menu } from './../model/menu'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menus: Menu[] = [
    {
      name: 'Couple',
      image: 'assets/images/couple',
      orientation: 'vertical',
      url: '/countdown'
    },
    {
      name: 'Random EAT',
      image: 'assets/images/food',
      orientation: 'horizontal',
      url: '/random-eat'
    },
    {
      name: 'Document',
      image: 'assets/images/document',
      orientation: 'horizontal',
      url: '/document'
    },
    {
      name: 'Beverage',
      image: 'assets/images/drink',
      orientation: 'vertical',
      url: '/beverage'
    }
  ]
  constructor() {}

  ngOnInit() {}
}
