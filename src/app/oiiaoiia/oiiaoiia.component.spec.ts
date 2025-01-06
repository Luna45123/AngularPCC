import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OiiaoiiaComponent } from './oiiaoiia.component';

describe('OiiaoiiaComponent', () => {
  let component: OiiaoiiaComponent;
  let fixture: ComponentFixture<OiiaoiiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OiiaoiiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OiiaoiiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
