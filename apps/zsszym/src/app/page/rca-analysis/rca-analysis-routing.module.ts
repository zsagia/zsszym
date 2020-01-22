import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RcaAnalysisComponent } from './rca-analysis.component';

const routes: Routes = [
  {
    path: '',
    component: RcaAnalysisComponent,
    pathMatch: 'full'
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RcaAnalysisRoutingModule {}
