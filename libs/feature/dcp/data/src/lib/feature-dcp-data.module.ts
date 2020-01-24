import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DcpDataService, FeatureDcpApiModule } from '@zsszym/feature/dcp/api';

import { DcpDataServiceImpl } from './service';

@NgModule({
    imports: [CommonModule, FeatureDcpApiModule],
    providers: [
        {
            provide: DcpDataService,
            useClass: DcpDataServiceImpl
        }
    ]
})
export class FeatureDcpDataModule {}
