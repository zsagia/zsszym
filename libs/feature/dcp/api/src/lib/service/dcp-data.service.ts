import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { DCP } from '../model';

@Injectable()
export abstract class DcpDataService {
    public static readonly PROPERTY_NAMES = {
        PLANT_KEY: 'plantKey',
        ROUTE: 'route',
        OPERATION: 'operation'
    };

    public abstract load(dcp: DCP): Observable<string[]>;

    public abstract requestData(event: string, message: string): void;

    public abstract receiveData$(event: string): Observable<string[]>;
}
