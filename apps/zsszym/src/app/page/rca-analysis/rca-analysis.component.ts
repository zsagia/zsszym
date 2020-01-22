import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Message } from '@zsszym/api-interfaces';

@Component({
    selector: 'zsszym-rca-analysis',
    templateUrl: './rca-analysis.component.html',
    styleUrls: ['./rca-analysis.component.scss']
})
export class RcaAnalysisComponent implements OnInit {
    public formType = 'dcp';
    public isCollapsed1 = false;
    public isCollapsed2 = true;
    public hello$ = this.http.get<Message>('/api/hello');

    constructor(private http: HttpClient) {}

    ngOnInit() {}
}
