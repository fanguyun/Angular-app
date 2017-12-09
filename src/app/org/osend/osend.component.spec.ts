import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OsendComponent } from './osend.component';

describe('OsendComponent', () => {
  let component: OsendComponent;
  let fixture: ComponentFixture<OsendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OsendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
