import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LopdLawComponent } from './lopd-law.component';

describe('LopdLawComponent', () => {
  let component: LopdLawComponent;
  let fixture: ComponentFixture<LopdLawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LopdLawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LopdLawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
