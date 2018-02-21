import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppnotesComponent } from './appnotes.component';

describe('AppnotesComponent', () => {
  let component: AppnotesComponent;
  let fixture: ComponentFixture<AppnotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppnotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppnotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
