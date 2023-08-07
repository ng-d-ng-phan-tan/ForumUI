import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisResetpasswordComponent } from './regis-resetpassword.component';

describe('RegisResetpasswordComponent', () => {
  let component: RegisResetpasswordComponent;
  let fixture: ComponentFixture<RegisResetpasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisResetpasswordComponent]
    });
    fixture = TestBed.createComponent(RegisResetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
