import { createFeatureSelector, createSelector } from '@ngrx/store';

import { DCPState } from '../model';

export const selectDCPState = createFeatureSelector<DCPState>('category');

export const getError = (state: DCPState) => state.error;

export const getLoadingIndicator = (state: DCPState) => state.loading;

export const getDataMap = (state: DCPState) => state.dataMap;

export const selectData = () =>
    createSelector(
        getDataMap,
        (dataMap, props) => dataMap[props.id]
    );
