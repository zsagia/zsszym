import { EntityState } from '@ngrx/entity';
import { DCP } from '@zsszym/feature/dcp/api';

export interface DCPState extends EntityState<DCP> {
    plantKeys: string[];
    routes: string[];
    operations: string[];
    operationData: object[];
    lineNumberAndInputPrompts: string[];
    partNumbers: string[];

    tableData?: any[];

    error: string;

    loading: boolean;
}
