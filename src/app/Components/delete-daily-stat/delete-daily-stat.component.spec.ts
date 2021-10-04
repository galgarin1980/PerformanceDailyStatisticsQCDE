import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDailyStatComponent } from './delete-daily-stat.component';

describe('DeleteDailyStatComponent', () => {
  let component: DeleteDailyStatComponent;
  let fixture: ComponentFixture<DeleteDailyStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDailyStatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDailyStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
