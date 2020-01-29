import { EntityState } from '@ngrx/entity';
import { DCP } from '@zsszym/feature/dcp/api';

export interface DCPState extends EntityState<DCP> {
    plantKeys: string[];
    routes: string[];
    operations: string[];
    lineNumberAndInputPrompts: string[];
    partNumbers: string[];

    error: string;

    loading: boolean;
}
