import { Injectable } from '@angular/core';

import { DCP } from '../model';
import { Observable } from 'rxjs';

@Injectable()
export abstract class DCPStateService {
    public abstract load(dcp: DCP): void;

    public abstract selectDataForSelect$(key: string): Observable<string[]>;
}
