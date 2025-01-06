import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lab2v2Component } from './lab2v2.component';

describe('Lab2v2Component', () => {
  let component: Lab2v2Component;
  let fixture: ComponentFixture<Lab2v2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Lab2v2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Lab2v2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
