import {
    NzGridModule,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzRadioModule
} from 'ng-zorro-antd';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FeatureDcpApiModule } from '@zsszym/feature/dcp/api';
import { FeatureDcpDataModule } from '@zsszym/feature/dcp/data';
import { FeatureDcpStateModule } from '@zsszym/feature/dcp/state';
import { FeatureDcpViewModule } from '@zsszym/feature/dcp/view';

import { RcaAnalysisRoutingModule } from './rca-analysis-routing.module';
import { RcaAnalysisComponent } from './rca-analysis.component';

@NgModule({
    declarations: [RcaAnalysisComponent],
    imports: [
        CommonModule,
        FeatureDcpApiModule,
        FeatureDcpDataModule,
        FeatureDcpStateModule,
        FeatureDcpViewModule,
        FormsModule,
        RcaAnalysisRoutingModule,
        NzGridModule,
        NzIconModule,
        NzLayoutModule,
        NzMenuModule,
        NzRadioModule
    ]
})
export class RcaAnalysisModule {}
