import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'zsszym-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private socket: Socket) {}

    sendData(message) {
        this.socket.emit('data', message);
    }

    receiveData(): Observable<string> {
        return this.socket.fromEvent('data');
    }

    ngOnInit() {
        this.receiveData().subscribe((message: string) => {
            console.log('WebSockets:', message);
        });

        this.sendData('Hey Szymon!');
    }
}
