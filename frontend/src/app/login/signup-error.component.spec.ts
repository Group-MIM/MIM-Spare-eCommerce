import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupErrorComponent } from './signup-error.component';

describe('SignupErrorComponent', () => {
  let component: SignupErrorComponent;
  let fixture: ComponentFixture<SignupErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
