import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingStartComponent } from './shopping-start.component';

describe('ShoppingStartComponent', () => {
  let component: ShoppingStartComponent;
  let fixture: ComponentFixture<ShoppingStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
