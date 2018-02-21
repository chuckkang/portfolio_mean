import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsnavbarComponent } from './questionsnavbar.component';

describe('QuestionsnavbarComponent', () => {
  let component: QuestionsnavbarComponent;
  let fixture: ComponentFixture<QuestionsnavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsnavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
