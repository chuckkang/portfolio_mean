import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenoteComponent } from './sidenote.component';

describe('SidenoteComponent', () => {
  let component: SidenoteComponent;
  let fixture: ComponentFixture<SidenoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
