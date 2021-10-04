import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyStatListComponent } from './daily-stat-list.component';

describe('DailyStatListComponent', () => {
  let component: DailyStatListComponent;
  let fixture: ComponentFixture<DailyStatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyStatListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyStatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
