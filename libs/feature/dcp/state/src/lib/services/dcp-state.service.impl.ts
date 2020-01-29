import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { DCP, DCPStateService } from '@zsszym/feature/dcp/api';

import * as dcpActions from '../store/action';
import { DCPState } from '../store/model';
import * as dcpSelectors from '../store/selector';

@Injectable()
export class DCPStateServiceImpl extends DCPStateService {
    public constructor(private store: Store<DCPState>) {
        super();
    }

    public load(dcp: DCP): void {
        this.store.dispatch(dcpActions.loadDCP({ dcp: dcp }));
    }

    public selectDataForSelect$(key: string): Observable<string[]> {
        return this.store.pipe(
            select(dcpSelectors.selectDataForSelect(), { key })
        )
    }
}
