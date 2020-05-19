import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingNewComponent } from './shopping-new.component';

describe('ShoppingNewComponent', () => {
  let component: ShoppingNewComponent;
  let fixture: ComponentFixture<ShoppingNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
