import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { DcpDataService, DCP } from '@zsszym/feature/dcp/api';

@Injectable()
export class DcpDataServiceImpl extends DcpDataService {
    constructor(private socket: Socket) {
        super();
    }

    public requestData(event: string, message: string) {
        this.socket.emit(event, message);
    }

    public receiveData$(event: string): Observable<string[]> {
        return this.socket.fromEvent(event);
    }

    public load(dcp: DCP): Observable<string[]> {
        return this.socket.emit('dcp', dcp)
    }
}
