import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForifComponent } from './forif.component';

describe('ForifComponent', () => {
  let component: ForifComponent;
  let fixture: ComponentFixture<ForifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
