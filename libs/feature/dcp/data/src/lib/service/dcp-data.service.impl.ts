import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { DcpDataService, DCP } from '@zsszym/feature/dcp/api';

@Injectable()
export class DcpDataServiceImpl extends DcpDataService {
    constructor(private socket: Socket) {
        super();
    }

    public receiveDataForSelect$(event: string): Observable<string[]> {
        return this.socket.fromEvent(event);
    }

    public receiveDataForTable$(event: string): Observable<any[]> {
        return this.socket.fromEvent(event);
    }

    public requestDataForSelect(dcp: DCP): void {
        this.socket.emit('dcp', dcp);
    }

    public requestDataForTable(dcp: DCP): void {
        this.socket.emit('tableData', dcp);
    }
}
