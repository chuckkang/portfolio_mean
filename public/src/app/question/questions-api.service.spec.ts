import { TestBed, inject } from '@angular/core/testing';

import { QuestionsApiService } from './questions-api.service';

describe('QuestionsApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionsApiService]
    });
  });

  it('should be created', inject([QuestionsApiService], (service: QuestionsApiService) => {
    expect(service).toBeTruthy();
  }));
});
