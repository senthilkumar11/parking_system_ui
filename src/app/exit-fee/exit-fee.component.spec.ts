import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitFeeComponent } from './exit-fee.component';

describe('ExitFeeComponent', () => {
  let component: ExitFeeComponent;
  let fixture: ComponentFixture<ExitFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExitFeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
