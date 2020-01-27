import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { switchMap, map } from 'rxjs/operators';

import * as DCPAction from '../action';
import { DcpDataService } from '@zsszym/feature/dcp/api';

@Injectable()
export class DCPEffect {
    public loadDCP = createEffect(() =>
        this.actions$.pipe(
            ofType(DCPAction.loadDCP),
            switchMap(action =>
                this.dCPDataService.load(action.dcp).pipe(
                    map(data => {
                        return DCPAction.loadDCPSuccess({
                            id: action.dcp.id,
                            data: data
                        });
                    })
                )
            )
        )
    );

    public constructor(
        private actions$: Actions,
        private dCPDataService: DcpDataService
    ) {}
}
