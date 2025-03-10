import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxJsDemosComponent } from './rx-js-demos.component';

describe('RxJsDemosComponent', () => {
  let component: RxJsDemosComponent;
  let fixture: ComponentFixture<RxJsDemosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxJsDemosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RxJsDemosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
