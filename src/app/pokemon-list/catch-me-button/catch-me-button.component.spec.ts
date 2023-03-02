import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchMeButtonComponent } from './catch-me-button.component';

describe('CatchMeButtonComponent', () => {
  let component: CatchMeButtonComponent;
  let fixture: ComponentFixture<CatchMeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatchMeButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatchMeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
