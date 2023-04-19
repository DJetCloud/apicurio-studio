import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginsessionsComponent } from './loginsessions.component';

describe('LoginsessionsComponent', () => {
  let component: LoginsessionsComponent;
  let fixture: ComponentFixture<LoginsessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginsessionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginsessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
