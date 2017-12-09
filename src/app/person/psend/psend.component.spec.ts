import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsendComponent } from './psend.component';

describe('PsendComponent', () => {
  let component: PsendComponent;
  let fixture: ComponentFixture<PsendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
