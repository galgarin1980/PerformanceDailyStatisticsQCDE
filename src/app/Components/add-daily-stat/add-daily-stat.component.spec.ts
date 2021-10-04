import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDailyStatComponent } from './add-daily-stat.component';

describe('AddDailyStatComponent', () => {
  let component: AddDailyStatComponent;
  let fixture: ComponentFixture<AddDailyStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDailyStatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDailyStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
