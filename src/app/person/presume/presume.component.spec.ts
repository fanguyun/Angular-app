import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresumeComponent } from './presume.component';

describe('PresumeComponent', () => {
  let component: PresumeComponent;
  let fixture: ComponentFixture<PresumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
