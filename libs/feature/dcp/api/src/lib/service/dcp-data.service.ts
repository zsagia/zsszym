import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { DCP } from '../model';

@Injectable()
export abstract class DcpDataService {

    public abstract requestDataForSelect(key: string, select: string): void;

    public abstract receiveDataForSelect$(event: string): Observable<any[]>;

    public abstract requestDataForTable(dcp: DCP): void;

    public abstract receiveDataForTable$(event: string): Observable<any[]>;
}
