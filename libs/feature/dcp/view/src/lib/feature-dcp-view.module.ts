import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcpFormComponent } from './component/dcp-form/dcp-form.component';

@NgModule({
    declarations: [DcpFormComponent],
    exports: [DcpFormComponent],
    imports: [CommonModule]
})
export class FeatureDcpViewModule {}
