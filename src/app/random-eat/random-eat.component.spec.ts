import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomEatComponent } from './random-eat.component';

describe('RandomEatComponent', () => {
  let component: RandomEatComponent;
  let fixture: ComponentFixture<RandomEatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomEatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomEatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
