import { TestBed } from '@angular/core/testing';

import { ChapterService } from './chapter.service';

describe('ChapterServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChapterService = TestBed.get(ChapterService);
    expect(service).toBeTruthy();
  });
});
