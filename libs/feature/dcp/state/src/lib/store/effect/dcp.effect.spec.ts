import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';

import { DCPEffect } from './dcp.effect';

describe('CategoryEffects', () => {
    let actions$: Observable<any>;
    let effects: DCPEffect;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, StoreModule.forRoot({})],
            providers: [provideMockActions(() => actions$)]
        });

        effects = TestBed.get(DCPEffect);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
});
