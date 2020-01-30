import { Injectable } from '@angular/core';

import { DCP } from '../model';
import { Observable } from 'rxjs';

@Injectable()
export abstract class DCPStateService {
    public abstract requestDataForSelect(dcp: DCP): void;

    public abstract selectDataForSelect$(key: string): Observable<string[]>;

    public abstract requestDataForTable(dcp: DCP): void;

    public abstract selectDataForTable$(key: string): Observable<any[]>;
}
