import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupIncompleteComponent } from './signup-incomplete.component';

describe('SignupIncompleteComponent', () => {
  let component: SignupIncompleteComponent;
  let fixture: ComponentFixture<SignupIncompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupIncompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupIncompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
