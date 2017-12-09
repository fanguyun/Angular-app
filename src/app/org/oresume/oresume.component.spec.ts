import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OresumeComponent } from './oresume.component';

describe('OresumeComponent', () => {
  let component: OresumeComponent;
  let fixture: ComponentFixture<OresumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OresumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OresumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
