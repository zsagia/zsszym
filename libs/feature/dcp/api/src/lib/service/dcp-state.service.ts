import { Injectable } from '@angular/core';

import { DCP } from '../model';
import { Observable } from 'rxjs';

@Injectable()
export abstract class DCPStateService {
    public abstract createLineNumberAndInputPromptArray(key: string, data: string[]);

    public abstract createPartNumberArray(key: string, data: string[]);

    public abstract requestDataForSelect(key: string, select: string): void;

    public abstract selectDataForSelect$(key: string): Observable<any[]>;

    public abstract requestDataForTable(dcp: DCP): void;

    public abstract selectDataForTable$(key: string): Observable<any[]>;
}
