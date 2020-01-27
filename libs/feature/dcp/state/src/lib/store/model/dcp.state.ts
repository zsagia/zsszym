import { EntityState } from '@ngrx/entity';
import { DCP } from '@zsszym/feature/dcp/api';

export interface DCPState extends EntityState<DCP> {
    dataMap: Object;

    error: string;

    loading: boolean;
}
