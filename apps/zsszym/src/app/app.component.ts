import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@zsszym/api-interfaces';

@Component({
    selector: 'zsszym-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public formType = 'dcp';
    public isCollapsed1 = false;
    public isCollapsed2 = true;
    public hello$ = this.http.get<Message>('/api/hello');

    constructor(private http: HttpClient) {}
}
