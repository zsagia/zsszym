import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DcpFormComponent } from './component/dcp-form/dcp-form.component';

@NgModule({
    declarations: [DcpFormComponent],
    exports: [DcpFormComponent],
    imports: [CommonModule]
})
export class FeatureDcpViewModule {}
