import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { DCP } from '@zsszym/feature/dcp/api';

import * as dcpActions from '../action';
import { DCPState } from '../model';

export const adapter: EntityAdapter<DCP> = createEntityAdapter<DCP>({
    selectId: (model: DCP) => model.id
});

export const initialState: DCPState = adapter.getInitialState({
    loading: false,
    error: null,
    plantKeys: [],
    routes: [],
    operations: [],
    lineNumberAndInputPrompts: [],
    partNumbers: [],
    tableData: []
});

export const dcpReducer = createReducer(
    initialState,
    on(dcpActions.requestDataForSelectSuccess, (state, { key, data }) => {
        state[key] = data;
        
        return {
            ...state,
            loading: false,
            error: null
        };
    }),
    on(dcpActions.requestDataForTableSuccess, (state, { data }) => {
        state.tableData = data;
        
        return {
            ...state,
            loading: false,
            error: null
        };
    })
);

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal
} = adapter.getSelectors();
