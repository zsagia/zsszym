import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { DCP } from '../model';

@Injectable()
export abstract class DcpDataService {
    public static readonly PROPERTY_NAMES = {
        PLANT_KEY: 'plantKey',
        ROUTE: 'route',
        OPERATION: 'operation',
        LINE_NUMBER_AND_INPUT_PROMPT: 'lineNumberAndInputPrompt',
        PART_NUMBER: 'partNumber'
    };

    public abstract requestDataForSelect(dcp: DCP): void;

    public abstract receiveDataForSelect$(event: string): Observable<string[]>;

    public abstract requestDataForTable(dcp: DCP): void;

    public abstract receiveDataForTable$(event: string): Observable<any[]>;
}
