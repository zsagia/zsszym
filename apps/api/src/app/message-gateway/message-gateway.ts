import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';

@WebSocketGateway()
export class MessageGateway
    implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server;

    private plantKeys = ['UAP', 'CAW', 'HLP'];
    private routeMap = {
        UAP: [
            'UAP_HLA Assembly',
            'UAP_Probe Assembly External_V2.0',
            'UAP_Probe Assembly Internal_V2.0'
        ],
        CAW: ['CAW_CAB_Integration', 'CAW_MAG_Product', 'CAW_TAB_Integration'],
        HLP: ['HLP_Nova_route', 'HLP_SubAssy_Route']
    };
    private operationMap = {
        'UAP_HLA Assembly': [
            'UAP_HLA_Assembly',
            'UAP_HLA_Labeling Check',
            'UAP_HLA_Rework'
        ],
        'UAP_Probe Assembly External_V2.0': [
            'UAP_Assembly',
            'UAP_Final Test',
            'UAP_Labelling Check'
        ],
        'UAP_Probe Assembly Internal_V2.0': [
            'UAP_Assembly',
            'UAP_Final Test',
            'UAP_Labelling Check'
        ],
        CAW_CAB_Integration: [
            'CAW_CAB_Assembly',
            'CAW_CAB_Covers & Labeling',
            'CAW_CAB_FAR'
        ],
        CAW_MAG_Product: [
            'CAW_MAG_FAR',
            'CAW_MAG_FQC',
            'CAW_MAG_He_Top-off_and_Labelling'
        ],
        CAW_TAB_Integration: ['CAW_TAB_Assembly', 'CAW_TAB_FAR', 'CAW_TAB_FQC'],
        HLP_Nova_route: [
            'HLP_Nova_Main_1',
            'HLP_Nova_Main_2',
            'HLP_Nova_Main_3'
        ],
        HLP_SubAssy_Route: ['HLP_RI', 'HLP_Sub_Assy']
    };

    private root = {
        data: ['UAP', 'CAW', 'HLP'],
        route: {
            UAP: {
                data: [
                    'UAP_HLA Assembly',
                    'UAP_Probe Assembly External_V2.0',
                    'UAP_Probe Assembly Internal_V2.0'
                ],
                operation: {
                    'UAP_HLA Assembly': {
                        data: [
                            'UAP_HLA_Assembly',
                            'UAP_HLA_Labeling Check',
                            'UAP_HLA_Rework'
                        ]
                    },
                    'UAP_Probe Assembly External_V2.0': {
                        data: [
                            'UAP_Assembly',
                            'UAP_Final Test',
                            'UAP_Labelling Check'
                        ]
                    },
                    'UAP_Probe Assembly Internal_V2.0': {
                        data: [
                            'UAP_Assembly',
                            'UAP_Final Test',
                            'UAP_Labelling Check'
                        ]
                    }
                }
            },
            CAW: {
                data: [
                    'CAW_CAB_Integration',
                    'CAW_MAG_Product',
                    'CAW_TAB_Integration'
                ],
                operation: {
                    CAW_CAB_Integration: {
                        data: [
                            'CAW_CAB_Assembly',
                            'CAW_CAB_Covers & Labeling',
                            'CAW_CAB_FAR'
                        ]
                    },
                    CAW_MAG_Product: {
                        data: [
                            'CAW_MAG_FAR',
                            'CAW_MAG_FQC',
                            'CAW_MAG_He_Top-off_and_Labelling'
                        ]
                    },
                    CAW_TAB_Integration: {
                        data: ['CAW_TAB_Assembly', 'CAW_TAB_FAR', 'CAW_TAB_FQC']
                    }
                }
            },
            HLP: {
                data: ['HLP_Nova_route', 'HLP_SubAssy_Route'],
                operation: {
                    HLP_Nova_route: {
                        data: [
                            'HLP_Nova_Main_1',
                            'HLP_Nova_Main_2',
                            'HLP_Nova_Main_3'
                        ]
                    },
                    HLP_SubAssy_Route: {
                        data: ['HLP_RI', 'HLP_Sub_Assy']
                    }
                }
            }
        }
    };

    async handleConnection() {
        // Notify connected clients of current users
        this.server.emit('data', 'connected');
        console.log('fdfdfdfdf');
    }

    async handleDisconnect() {
        // Notify connected clients of current users
        this.server.emit('data', 'disconected');
        console.log('rerererer');
    }

    @SubscribeMessage('plantKey')
    onRequestPlantKeys(client, message) {
        const event = 'plantKey';
        const data = this.plantKeys;

        return of({ event, data }).pipe(delay(500));
    }

    @SubscribeMessage('route')
    onRequestRoute(client, message) {
        const event = 'route';
        const data = this.routeMap[message];

        return of({ event, data }).pipe(delay(500));
    }

    @SubscribeMessage('operation')
    onRequestOperation(client, message) {
        const event = 'operation';
        const data = this.operationMap[message];

        return of({ event, data }).pipe(delay(500));
    }

    @SubscribeMessage('dcp')
    onDCP(client, message) {
        console.log(message);
        const event = 'dcp';
        const data = !message['plantKey']
            ? this.root.data
            : this.getPlantKeys(message, message['plantKey'], this.root.route);

        return of({ event, data }).pipe(delay(500));
    }

    getPlantKeys(message, key: string, data: any) {
        return !message['route'] ? data[key].data : this.getRoute(message, message['route'], data.operation.data);
    }

    getRoute(message, key: string, data: any) {

    }
}
