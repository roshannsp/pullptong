import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeverageRoutingModule } from './beverage-routing.module';
import { BeverageComponent } from './beverage.component';


@NgModule({
  declarations: [BeverageComponent],
  imports: [
    CommonModule,
    BeverageRoutingModule
  ]
})
export class BeverageModule { }
