import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPassSendOkComponent } from './reset-pass-send-ok.component';

describe('ResetPassSendOkComponent', () => {
  let component: ResetPassSendOkComponent;
  let fixture: ComponentFixture<ResetPassSendOkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPassSendOkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPassSendOkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
