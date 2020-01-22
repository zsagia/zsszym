import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RcaAnalysisRoutingModule } from './rca-analysis-routing.module';
import { RcaAnalysisComponent } from './rca-analysis.component';

@NgModule({
    declarations: [RcaAnalysisComponent],
    imports: [CommonModule, RcaAnalysisRoutingModule]
})
export class RcaAnalysisModule {}
