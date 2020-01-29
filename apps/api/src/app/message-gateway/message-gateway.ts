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

    
    
    private root = {
        data: ['UAP', 'CAW', 'HLP'],
        routes: {
            UAP: {
                data: [
                    'UAP_HLA Assembly',
                    'UAP_Probe Assembly External_V2.0',
                    'UAP_Probe Assembly Internal_V2.0'
                ],
                operations: {
                    'UAP_HLA Assembly': {
                        data: [
                            'UAP_HLA_Assembly',
                            'UAP_HLA_Labeling Check',
                            'UAP_HLA_Rework'
                        ],
                        lineNumberAndInputPrompts: {
                            'UAP_HLA_Assembly': {
                                data: [
                                    '10_DOC1837673 Revision Number',
                                    '100_KTD103644INS / Pkt 2.1: Reservoir KNF-Assy. auf Base-Plate montieren',
                                    '110_Verwendeten Drehmomentschraubendreher eingeben'
                                ],
                                partNumbers: {
                                    '10_DOC1837673 Revision Number': {
                                        data: ['KTI301671']
                                    },
                                    '100_KTD103644INS / Pkt 2.1: Reservoir KNF-Assy. auf Base-Plate montieren': {
                                        data: ['KTI301671']
                                    },
                                    '110_Verwendeten Drehmomentschraubendreher eingeben': {
                                        data: ['KTI301671']
                                    }
                                }
                            },
                            'UAP_HLA_Labeling Check': {
                                data: [
                                    '10_Labelset KTD105362 und CoC KTD103645 ausgedruckt und auf Vollständigkeit und Korrektheit verifiziert',
                                    '100_KTD103691INS/Pkt. 4: Positionierung der Flexe',
                                    '110_KTD103691INS/Pkt. 5: Flexe und Stecker mit Luftpolstertaschen und ESD-Sack verpacken'
                                ]
                            },
                            UAP_HLA_Rework: {
                                data: []
                            }
                        }
                    },
                    'UAP_Probe Assembly External_V2.0': {
                        data: [
                            'UAP_Assembly',
                            'UAP_Final Test',
                            'UAP_Labelling Check'
                        ],
                        lineNumberAndInputPrompts: {
                            UAP_Assembly: {
                                data: [
                                    '10_Import der Seriennummern mit CSV File durchführen',
                                    '20_Assembly auf Übereinstimmung mit CoC überprüfen',
                                    '50_Prüfen ob Begleitdokument &quot;Schallkopf Eingangsmessung&quot; vorhanden'
                                ],
                                partNumbers: {
                                    '10_Import der Seriennummern mit CSV File durchführen': {
                                        data: [
                                            '5670079',
                                            'KTI156847',
                                            'KTI300263'
                                        ]
                                    },
                                    '20_Assembly auf Übereinstimmung mit CoC überprüfen': {
                                        data: [
                                            '5670079',
                                            'KTI156847',
                                            'KTI300263'
                                        ]
                                    },
                                    '50_Prüfen ob Begleitdokument &quot;Schallkopf Eingangsmessung&quot; vorhanden': {
                                        data: [
                                            '5670079',
                                            'KTI156847',
                                            'KTI300263',
                                            'KTI303072'
                                        ]
                                    }
                                }
                            },
                            'UAP_Final Test': {
                                data: ['']
                            },
                            'UAP_Labelling Check': {
                                data: ['']
                            }
                        }
                    },
                    'UAP_Probe Assembly Internal_V2.0': {
                        data: [
                            'UAP_Assembly',
                            'UAP_Final Test',
                            'UAP_Labelling Check'
                        ],
                        lineNumberAndInputPrompts: {
                            UAP_Assembly: {},
                            'UAP_Final Test': {},
                            'UAP_Labelling Check': {}
                        }
                    }
                }
            },
            CAW: {
                data: [
                    'CAW_CAB_Integration',
                    'CAW_MAG_Product',
                    'CAW_TAB_Integration'
                ],
                operations: {
                    CAW_CAB_Integration: {
                        data: [
                            'CAW_CAB_Assembly',
                            'CAW_CAB_Covers & Labeling',
                            'CAW_CAB_FAR'
                        ],
                        lineNumberAndInputPrompts: {
                            CAW_CAB_Assembly: {},
                            'CAW_CAB_Covers & Labeling': {},
                            CAW_CAB_FAR: {}
                        }
                    },
                    CAW_MAG_Product: {
                        data: [
                            'CAW_MAG_FAR',
                            'CAW_MAG_FQC',
                            'CAW_MAG_He_Top-off_and_Labelling'
                        ],
                        lineNumberAndInputPrompts: {
                            CAW_MAG_FAR: {},
                            CAW_MAG_FQC: {},
                            'CAW_MAG_He_Top-off_and_Labelling': {}
                        }
                    },
                    CAW_TAB_Integration: {
                        data: [
                            'CAW_TAB_Assembly',
                            'CAW_TAB_FAR',
                            'CAW_TAB_FQC'
                        ],
                        lineNumberAndInputPrompts: {
                            CAW_TAB_Assembly: {},
                            CAW_TAB_FAR: {},
                            CAW_TAB_FQC: {}
                        }
                    }
                }
            },
            HLP: {
                data: ['HLP_Nova_route', 'HLP_SubAssy_Route'],
                operations: {
                    HLP_Nova_route: {
                        data: [
                            'HLP_Nova_Main_1',
                            'HLP_Nova_Main_2',
                            'HLP_Nova_Main_3'
                        ],
                        lineNumberAndInputPrompts: {
                            HLP_Nova_Main_1: {
                                data: []
                            },
                            HLP_Nova_Main_2: {
                                data: []
                            },
                            HLP_Nova_Main_3: {
                                data: []
                            }
                        }
                    },
                    HLP_SubAssy_Route: {
                        data: ['HLP_RI', 'HLP_Sub_Assy'],
                        lineNumberAndInputPrompts: {
                            HLP_RI: {
                                data: []
                            },
                            HLP_Sub_Assy: {
                                data: []
                            }
                        }
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

    @SubscribeMessage('dcp')
    onDCP(client, message) {
        const event = 'dcp';
        const data = !message['plantKey']
            ? { key: 'plantKeys', data: this.root.data }
            : this.getRoutes(
                  message,
                  message['plantKey'],
                  this.root.routes[message['plantKey']]
              );

        return of({ event, data }).pipe(delay(1000));
    }

    getRoutes(message, key: string, data: any) {
        return !message['route']
            ? { key: 'routes', data: data.data }
            : this.getOperations(
                  message,
                  message['route'],
                  data.operations[message['route']]
              );
    }

    getOperations(message, key: string, data: any) {
        return !message['operation']
            ? { key: 'operations', data: data.data }
            : this.getLineNumberAndInputPrompts(
                  message,
                  message['operation'],
                  data.lineNumberAndInputPrompts[message['operation']]
              );
    }

    getLineNumberAndInputPrompts(message, key: string, data: any) {
        return !message['lineNumberAndInputPrompt']
            ? { key: 'lineNumberAndInputPrompts', data: data.data }
            : this.getPartNumbers(
                  message,
                  message['lineNumberAndInputPrompt'],
                  data.partNumbers[message['lineNumberAndInputPrompt']]
              );
    }

    getPartNumbers(message, key: string, data: any) {
        return { key: 'partNumbers', data: data.data }
    }
}
