import { createFeatureSelector, createSelector } from '@ngrx/store';

import { DCPState } from '../model';

export const selectDCPState = createFeatureSelector<DCPState>('dcp');

export const getError = (state: DCPState) => state.error;

export const getLoadingIndicator = (state: DCPState) => state.loading;

export const getState = (state: DCPState) => state['dcp'];

export const selectDataForSelect = () =>
    createSelector(
        getState,
        (state, props) => {
            return state[props.key]
        }
    );
