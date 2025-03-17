import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterListV2Component } from './monster-list-v2.component';

describe('MonsterListComponent', () => {
  let component: MonsterListV2Component;
  let fixture: ComponentFixture<MonsterListV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonsterListV2Component],
    }).compileComponents();

    fixture = TestBed.createComponent(MonsterListV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
