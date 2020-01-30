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

    public requestDataForSelect(dcp: DCP): void {
        this.store.dispatch(dcpActions.requestDataForSelect({ dcp: dcp }));
    }

    public selectDataForSelect$(key: string): Observable<string[]> {
        return this.store.pipe(
            select(dcpSelectors.selectDataForSelect(), { key })
        )
    }

    public requestDataForTable(dcp: DCP): void {
        this.store.dispatch(dcpActions.requestDataForTable({ dcp: dcp }));
    }

    public selectDataForTable$(key: string): Observable<any[]> {
        return this.store.pipe(
            select(dcpSelectors.selectDataForTable())
        );
    }
}
