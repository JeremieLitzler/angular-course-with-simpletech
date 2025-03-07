import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterDeleteConfirmationDialogComponent } from './monster-delete-confirmation-dialog.component';

describe('MonsterDeleteConfirmationDialogComponent', () => {
  let component: MonsterDeleteConfirmationDialogComponent;
  let fixture: ComponentFixture<MonsterDeleteConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonsterDeleteConfirmationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonsterDeleteConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
