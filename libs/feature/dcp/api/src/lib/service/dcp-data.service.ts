import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable()
export abstract class DcpDataService {
    public readonly PROPERTY_NAMES = {
        PLANT_KEY: 'plantKey',
        ROUTE: 'route',
        OPERATION: 'operation'
    };

    public abstract requestData(event: string, message: string): void;

    public abstract receiveData(event: string): Observable<string[]>;
}
