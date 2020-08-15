import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccasionalExpensesComponent } from './occasional-expenses.component';

describe('OccasionalExpensesComponent', () => {
  let component: OccasionalExpensesComponent;
  let fixture: ComponentFixture<OccasionalExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccasionalExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccasionalExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
