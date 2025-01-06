import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneworkComponent } from './onework.component';

describe('OneworkComponent', () => {
  let component: OneworkComponent;
  let fixture: ComponentFixture<OneworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
