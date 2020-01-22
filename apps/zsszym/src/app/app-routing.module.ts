import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'rca-analysis',
        pathMatch: 'full'
    },
    {
        path: 'rca-analysis',
        loadChildren: () =>
            import('./page/rca-analysis/rca-analysis.module').then(
                lib => lib.RcaAnalysisModule
            )
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
