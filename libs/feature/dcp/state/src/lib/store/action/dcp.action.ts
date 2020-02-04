import { createAction, props } from '@ngrx/store';

import { DCP } from '@zsszym/feature/dcp/api';

export const createLineNumberAndInputPromptArray = createAction(
    '[DCP Form] Create Line Number and Input Prompt Array',
    props<{ key: string; data: string[] }>()
);

export const createPartNumberArray = createAction(
    '[DCP Form] Create Part Number Array',
    props<{ key: string; data: string[] }>()
);

export const requestDataForSelect = createAction(
    '[DCP Form] Request Data for Select',
    props<{ key: string; select: string }>()
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
