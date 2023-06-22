import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendInstructionsRecoverPassComponent } from './send-instructions-recover-pass.component';

describe('SendInstructionsRecoverPassComponent', () => {
  let component: SendInstructionsRecoverPassComponent;
  let fixture: ComponentFixture<SendInstructionsRecoverPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendInstructionsRecoverPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendInstructionsRecoverPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
