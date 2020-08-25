import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddViewProductComponent } from './add-view-product.component';

describe('AddViewProductComponent', () => {
  let component: AddViewProductComponent;
  let fixture: ComponentFixture<AddViewProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddViewProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddViewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
