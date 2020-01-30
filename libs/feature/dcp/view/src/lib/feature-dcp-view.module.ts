import { NzRadioModule } from 'ng-zorro-antd';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzTableModule } from 'ng-zorro-antd/table';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FeatureDcpDataModule } from '@zsszym/feature/dcp/data';

import { DcpFormComponent } from './component/dcp-form/dcp-form.component';
import { DcpTableComponent } from './component/dcp-table/dcp-table.component';

@NgModule({
    declarations: [DcpFormComponent, DcpTableComponent],
    exports: [DcpFormComponent, DcpTableComponent],
    imports: [
        CommonModule,
        FeatureDcpDataModule,
        FormsModule,
        NzButtonModule,
        NzDatePickerModule,
        NzDividerModule,
        NzFormModule,
        NzIconModule,
        NzInputModule,
        NzInputNumberModule,
        NzRadioModule,
        NzSelectModule,
        NzSwitchModule,
        NzTableModule,
        ReactiveFormsModule
    ]
})
export class FeatureDcpViewModule {}
