import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactMainContentComponent } from './contact-main-content.component';

describe('ContactMainContentComponent', () => {
  let component: ContactMainContentComponent;
  let fixture: ComponentFixture<ContactMainContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactMainContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactMainContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
