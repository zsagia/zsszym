import { Injectable } from '@angular/core';

@Injectable()
export abstract class DcStateService {

    public abstract dispatchRequestData(event: string, message: string): void;
}
