import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DCPStateService } from '@zsszym/feature/dcp/api';

@Component({
    selector: 'zsszym-dcp-table',
    templateUrl: './dcp-table.component.html',
    styleUrls: ['./dcp-table.component.scss']
})
export class DcpTableComponent implements OnInit {
    public tableData$: Observable<any[]>;

    constructor(private dcpStateService: DCPStateService) {}

    ngOnInit() {
        this.tableData$ = this.dcpStateService.selectDataForTable$('tableData');
    }
}
