import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateCouponComponent } from './generate-coupon.component';

describe('GenerateCouponComponent', () => {
  let component: GenerateCouponComponent;
  let fixture: ComponentFixture<GenerateCouponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateCouponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
