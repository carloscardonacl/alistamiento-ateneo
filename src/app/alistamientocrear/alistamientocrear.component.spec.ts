import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlistamientocrearComponent } from './alistamientocrear.component';

describe('AlistamientocrearComponent', () => {
  let component: AlistamientocrearComponent;
  let fixture: ComponentFixture<AlistamientocrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlistamientocrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlistamientocrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
