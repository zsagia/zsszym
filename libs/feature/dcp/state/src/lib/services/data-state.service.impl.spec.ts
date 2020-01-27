import { TestBed } from '@angular/core/testing';

import { StoreModule } from '@ngrx/store';

import { DCPStateServiceImpl } from './dcp-state.service.impl';

describe('DCPStateServiceImpl', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [StoreModule.forRoot({})],
            providers: [DCPStateServiceImpl]
        })
    );

    it('should be created', () => {
        const service: DCPStateServiceImpl = TestBed.get(DCPStateServiceImpl);

        expect(service).toBeTruthy();
    });
});
