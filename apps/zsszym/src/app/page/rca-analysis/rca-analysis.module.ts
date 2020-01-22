import {
    NzLayoutModule,
    NzMenuModule,
    NzRadioModule,
    NzIconModule,
    NzGridModule
} from 'ng-zorro-antd';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FeatureDcpViewModule } from '@zsszym/feature/dcp/view';

import { RcaAnalysisRoutingModule } from './rca-analysis-routing.module';
import { RcaAnalysisComponent } from './rca-analysis.component';

@NgModule({
    declarations: [RcaAnalysisComponent],
    imports: [
        CommonModule,
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
