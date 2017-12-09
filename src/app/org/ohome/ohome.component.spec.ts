import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OhomeComponent } from './ohome.component';

describe('OhomeComponent', () => {
  let component: OhomeComponent;
  let fixture: ComponentFixture<OhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
