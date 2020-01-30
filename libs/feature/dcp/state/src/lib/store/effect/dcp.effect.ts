import { map, switchMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DcpDataService } from '@zsszym/feature/dcp/api';

import * as DCPAction from '../action';

@Injectable()
export class DCPEffect {
    public requestDataForSelect = createEffect(() =>
        this.actions$.pipe(
            ofType(DCPAction.requestDataForSelect),
            switchMap(action => {
                this.dcpDataService.requestDataForSelect(action.dcp);

                return this.dcpDataService.receiveDataForSelect$('dcp').pipe(
                    map(data => {
                        return DCPAction.requestDataForSelectSuccess({
                            key: data['key'],
                            data: data['data']
                        });
                    })
                );
            })
        )
    );

    public requestDataForTable = createEffect(() =>
        this.actions$.pipe(
            ofType(DCPAction.requestDataForTable),
            switchMap(action => {
                this.dcpDataService.requestDataForTable(action.dcp);

                return this.dcpDataService.receiveDataForTable$('tableData').pipe(
                    map(data => {
                        return DCPAction.requestDataForTableSuccess({
                            data: data
                        });
                    })
                );
            })
        )
    );

    public constructor(
        private actions$: Actions,
        private dcpDataService: DcpDataService
    ) {}
}
