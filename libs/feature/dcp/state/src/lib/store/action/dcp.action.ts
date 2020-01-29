import { createAction, props } from '@ngrx/store';

import { DCP } from '@zsszym/feature/dcp/api';

export const loadDCP = createAction(
    '[DCP] Load DCP',
    props<{ dcp: DCP }>()
);

export const loadDCPFail = createAction(
    '[DCP] Load DCP FAIL',
    props<{ error: Error }>()
);

export const loadDCPSuccess = createAction(
    '[DCP] Load DCP Success',
    props<{ key: string; data: string[] }>()
);
