import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

export interface State {}

export const reducers: ActionReducerMap<State> = {};

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        EffectsModule.forRoot([]),
        StoreModule.forRoot(reducers),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production
        })
    ]
})
export class CoreModule {}
