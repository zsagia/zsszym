import { Injectable } from '@angular/core';

import { DCP } from '../model';

@Injectable()
export abstract class DCPStateService {
    public abstract load(dcp: DCP): void;
}
