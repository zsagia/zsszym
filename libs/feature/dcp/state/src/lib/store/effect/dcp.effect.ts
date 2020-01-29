import { map, switchMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DcpDataService } from '@zsszym/feature/dcp/api';

import * as DCPAction from '../action';

@Injectable()
export class DCPEffect {
    public loadDCP = createEffect(() =>
        this.actions$.pipe(
            ofType(DCPAction.loadDCP),
            switchMap(action => {
                this.dCPDataService.load(action.dcp);

                return this.dCPDataService.receiveData$('dcp').pipe(
                    map(data => {
                        console.log(data);
                        return DCPAction.loadDCPSuccess({
                            key: data['key'],
                            data: data['data']
                        });
                    })
                );
            })
        )
    );

    public constructor(
        private actions$: Actions,
        private dCPDataService: DcpDataService
    ) {}
}
