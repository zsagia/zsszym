import { createAction, props } from '@ngrx/store';

import { DCP } from '@zsszym/feature/dcp/api';

export const requestDataForSelect = createAction(
    '[DCP Form] Request Data for Select',
    props<{ dcp: DCP }>()
);

export const requestDataForSelectFail = createAction(
    '[DCP Form] Request Data for Select FAIL',
    props<{ error: Error }>()
);

export const requestDataForSelectSuccess = createAction(
    '[DCP Form] Request Data for Select Success',
    props<{ key: string; data: string[] }>()
);

export const requestDataForTable = createAction(
    '[DCP Form] Request Data for Table',
    props<{ dcp: DCP }>()
);

export const requestDataForTableFail = createAction(
    '[DCP Form] Request Data for Table FAIL',
    props<{ error: Error }>()
);

export const requestDataForTableSuccess = createAction(
    '[DCP Form] Request Data for Table Success',
    props<{ data: any[] }>()
);
