import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { dcpReducer } from './store/reducer';
import { DCPEffect } from './store/effect';
import { DCPStateService } from '@zsszym/feature/dcp/api';
import { DCPStateServiceImpl } from './services';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('dcp', dcpReducer),
        EffectsModule.forFeature([DCPEffect])
    ],
    providers: [
        {
            provide: DCPStateService,
            useClass: DCPStateServiceImpl
        }
    ]
})
export class FeatureDcpStateModule {}
