import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwaibaoComponent } from './owaibao.component';

describe('OwaibaoComponent', () => {
  let component: OwaibaoComponent;
  let fixture: ComponentFixture<OwaibaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwaibaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwaibaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
