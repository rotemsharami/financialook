import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { IncomsEffects } from './incoms.effects';

describe('IncomsEffects', () => {
  let actions$: Observable<any>;
  let effects: IncomsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IncomsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(IncomsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
