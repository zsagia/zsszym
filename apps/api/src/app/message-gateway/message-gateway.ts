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

    private readonly dcpData = {
        root: ['UAP', 'CAW', 'HLP'],
        UAP: [
            'UAP_HLA Assembly',
            'UAP_Probe Assembly External_V2.0',
            'UAP_Probe Assembly Internal_V2.0'
        ],
        'UAP_UAP_HLA Assembly': [
            'UAP_HLA_Assembly',
            'UAP_HLA_Labeling Check',
            'UAP_HLA_Rework'
        ],
        'UAP_UAP_HLA Assembly_UAP_HLA_Assembly': [
            {
                part_number: 'KTI301671',
                data_type: 'DateTimePickerDateTime',
                line_number: '450',
                input_prompt:
                    'KTD103650TPR / Pkt 3.2: Pr\u00fcfung Leistungsaufnahme Pumpe und Ventilator - Start'
            },
            {
                part_number: 'KTI301671',
                data_type: 'Float',
                line_number: '430',
                input_prompt:
                    'KTD103650TPR / Pkt 2.2: Pr\u00fcfung K\u00fchleistung nach >30min (<= 17.5\u00b0C)'
            },
            {
                part_number: 'KTI301671',
                data_type: 'Equipment ID',
                line_number: '240',
                input_prompt: 'Verwendete F\u00fcllvorrichtung eingeben'
            },
            {
                part_number: 'KTI301672',
                data_type: 'DateTimePickerDateTime',
                line_number: '450',
                input_prompt:
                    'KTD103650TPR / Pkt 3.2: Pr\u00fcfung Leistungsaufnahme Pumpe und Ventilator - Start'
            },
            {
                part_number: 'KTI301671',
                data_type: 'Text',
                line_number: '130',
                input_prompt:
                    'KTD103644INS / Pkt 2.3: Vibration Damper am Reservoir KNF-Assy. anbringen'
            },
            {
                part_number: 'KTI301671',
                line_number: 320,
                input_prompt: 'Verwendetes Thermometer eingeben (497, 949300)',
                data_type: 'Equipment ID'
            }
        ],
        'UAP_UAP_HLA Assembly_UAP_HLA_Labeling Check': [
            {
                part_number: 'KTI301671',
                line_number: 110,
                input_prompt:
                    'KTD103691INS/Pkt. 5: Flexe und Stecker mit Luftpolstertaschen und ESD-Sack verpacken',
                data_type: 'Text'
            },
            {
                part_number: 'KTI301671',
                line_number: 70,
                input_prompt:
                    'KTD103691INS/Pkt. 2: Seriennummernschild aufkleben',
                data_type: 'Text'
            },
            {
                part_number: 'KTI301671',
                line_number: 20,
                input_prompt:
                    'Entsprechendes jpg-File des ausgedruckten Labelsets attachen (GEMEDAMERICA+tckre01\\Print labels)',
                data_type: 'Text'
            }
        ],
        'UAP_UAP_HLA Assembly_UAP_HLA_Rework': [
            {
                part_number: 'KTI301671',
                line_number: '80',
                input_prompt:
                    'Wurden irgendwelche Nebenwirkungen/Beeintr\u00e4chtigungen festgestellt ?\n',
                data_type: 'Text'
            },
            {
                part_number: 'KTI301671',
                line_number: '100',
                input_prompt: 'Fehlerdokumentation in eDMS eingegeben ?\n',
                data_type: 'Text'
            },
            {
                part_number: 'KTI301671',
                line_number: '110',
                input_prompt:
                    'Laut 7S405 wieder in den Fertigungsprozess einsteuern',
                data_type: 'Text'
            },
            {
                part_number: 'KTI301671',
                line_number: '10',
                input_prompt: 'Flexrevision feststellen',
                data_type: 'Float'
            }
        ],
        'UAP_UAP_Probe Assembly External_V2.0': [
            'UAP_Assembly',
            'UAP_Final Test',
            'UAP_Labelling Check'
        ],
        'UAP_UAP_Probe Assembly External_V2.0_UAP_Assembly': [
            {
                part_number: 'KTI301671',
                line_number: '80',
                input_prompt:
                    'Wurden irgendwelche Nebenwirkungen/Beeintr\u00e4chtigungen festgestellt ?\n',
                data_type: 'Text'
            },
            {
                part_number: 'KTI300263',
                line_number: 5,
                input_prompt: 'DOC1837673 Revision Number:',
                data_type: 'Text'
            },
            {
                part_number: 'KTI156917',
                line_number: 10,
                input_prompt:
                    'Import der Seriennummern mit CSV File durchf\u00fchren',
                data_type: 'Text'
            },
            {
                part_number: 'KTI156987',
                line_number: 80,
                input_prompt: 'Gescannte Begleitdokumente attachen',
                data_type: 'Text'
            },
            {
                part_number: 'KTI157008',
                line_number: 80,
                input_prompt: 'Gescannte Begleitdokumente attachen',
                data_type: 'Text'
            }
        ],
        'UAP_UAP_Probe Assembly External_V2.0_UAP_Final Test': [
            {
                part_number: '5670079',
                line_number: '160',
                input_prompt:
                    '5670079TPR/Pkt.4.5 Gesamtbreite aller Schatten < 5mm',
                data_type: 'Float'
            },
            {
                part_number: 'KTI156847',
                line_number: '80',
                input_prompt: '7Q526TPR / Pkt 2.1: Pr\u00fcfung Sondencode',
                data_type: 'Text'
            },
            {
                part_number: 'KTI156848',
                line_number: '80',
                input_prompt: '7Q526TPR / Pkt 2.1: Pr\u00fcfung Sondencode',
                data_type: 'Text'
            },
            {
                part_number: 'KTI157023',
                line_number: '100',
                input_prompt: '7R921TPR / Pkt 3.4: Pr\u00fcfung B-Bild',
                data_type: 'Text'
            },
            {
                part_number: 'KTI195894',
                line_number: '90',
                input_prompt:
                    'KTD100650TPR / Pkt 3.2: Pr\u00fcfung Reihenfolge aller Elemente',
                data_type: 'Text'
            }
        ],
        'UAP_UAP_Probe Assembly External_V2.0_UAP_Labelling Check': [
            {
                part_number: '5670079',
                line_number: 160,
                input_prompt:
                    '5670079TPR/Pkt.4.5 Gesamtbreite aller Schatten < 5mm',
                data_type: 'Float'
            },
            {
                part_number: 'KTI156847',
                line_number: 80,
                input_prompt: '7Q526TPR / Pkt 2.1: Pr\u00fcfung Sondencode',
                data_type: 'Text'
            },
            {
                part_number: 'KTI156848',
                line_number: 80,
                input_prompt: '7Q526TPR / Pkt 2.1: Pr\u00fcfung Sondencode',
                data_type: 'Text'
            }
        ],
        'UAP_UAP_Probe Assembly Internal_V2.0': [
            'UAP_Assembly',
            'UAP_Final Test',
            'UAP_Labelling Check'
        ],
        'UAP_UAP_Probe Assembly Internal_V2.0_UAP_Assembly': [
            {
                part_number: 'KTI156995',
                line_number: 870,
                input_prompt:
                    '4N427INS: Name Label am Steckergeh\u00e4use anbringen',
                data_type: 'Text'
            }
        ],
        'UAP_UAP_Probe Assembly Internal_V2.0_UAP_Final Test': [
            {
                part_number: 'GP000053',
                line_number: 110,
                input_prompt: 'hv_GP400_HV_POS_Medium',
                data_type: 'Float'
            },
            {
                part_number: 'KTI302457',
                line_number: 100,
                input_prompt:
                    'KTD105627TPR Pkt 4.2: Pr\u00fcfung Bildartefakte - PW Doppler St\u00f6rung: Verifizierung',
                data_type: 'Text'
            }
        ],
        'UAP_UAP_Probe Assembly Internal_V2.0_UAP_Labelling Check': [
            {
                part_number: 'KTI302457',
                line_number: 20,
                input_prompt:
                    'DOC1886838/Pkt.7.1.1 Labelset, Certificate of Compliance V Probe und Instruction for Field Engineers for Installation of System DVD \u00fcber eDHR ausdrucken',
                data_type: 'Text'
            },
            {
                part_number: 'KTI156995',
                line_number: 80,
                input_prompt:
                    'DOC1886838/Pkt.11.1.6 Revision der beigelegten Care Card KTI106089',
                data_type: 'Text'
            }
        ],
        CAW: ['CAW_CAB_Integration', 'CAW_MAG_Product', 'CAW_TAB_Integration'],
        CAW_CAW_CAB_Integration: ['CAW_CAB_Packing', 'CAW_CAB_PDI'],
        CAW_CAW_CAB_Integration_CAW_CAB_Packing: [
            {
                part_number: '5323286-200',
                line_number: '50',
                input_prompt:
                    'Paste Tilt watch on the packing box as shown in SOP',
                data_type: 'Text'
            },
            {
                part_number: 'M50022AS',
                line_number: '10',
                input_prompt: 'I have verified prechecks as per SOP',
                data_type: 'Text'
            },
            {
                part_number: 'M50022AS',
                line_number: '45',
                input_prompt:
                    'Fix the corner bracket using screws at 12 locations (3 corners/side x 4 sides) by using Screw driver/Power tool',
                data_type: 'Text'
            },
            {
                part_number: 'M50022AS',
                line_number: '40',
                input_prompt:
                    'Fix wooden blocks on the EPE foam and close the top cover with clamp and edge protector.',
                data_type: 'Text'
            },
            {
                part_number: '5323286-200',
                line_number: '15',
                input_prompt:
                    'I have verified availability accessories as per SOP',
                data_type: 'Text'
            },
            {
                part_number: '5323286-200',
                line_number: '45',
                input_prompt:
                    'Fix the corner bracket using screws at 12 locations (3 corners/side x 4 sides) by using Screw driver/Power tool',
                data_type: 'Text'
            }
        ],
        CAW_CAW_CAB_Integration_CAW_CAB_PDI: [
            {
                part_number: 'M50022AR',
                line_number: '15',
                input_prompt:
                    'I have ensured that the Product Part/Serial no. matches with DHR and ICD card',
                data_type: 'Text'
            },
            {
                part_number: '5323286-200',
                line_number: '35',
                input_prompt:
                    'Record the latest revision of Mulan OM Booklet in multi-language P/N 6339125-199',
                data_type: 'Text'
            },
            {
                part_number: 'M50022AR',
                line_number: '5',
                input_prompt: 'Refer SOP DOC2158326',
                data_type: 'Text'
            },
            {
                part_number: 'M50022AS',
                line_number: '35',
                input_prompt:
                    'Record the latest revision of Mulan OM Booklet in multi-language P/N 6339125-199',
                data_type: 'Text'
            }
        ],
        CAW_CAW_MAG_Product: ['CAW_MAG_Ramp down', 'CAW_MAG_FQC'],
        'CAW_CAW_MAG_Product_CAW_MAG_Ramp down': [
            {
                part_number: 'G50023CE',
                line_number: '1000',
                input_prompt:
                    'Record the current after adjusting the voltage to -1.40V as per ramp down profile___A.',
                data_type: 'Float'
            },
            {
                part_number: 'G50023CE',
                line_number: '1200',
                input_prompt:
                    'Record the pressure inside the magnet before ramp lead removal___psi',
                data_type: 'Float'
            },
            {
                part_number: 'G50023CE',
                line_number: '304',
                input_prompt: 'Record the Dewar pressure____psig.',
                data_type: 'Float'
            },
            {
                part_number: 'G5005GT',
                line_number: '600',
                input_prompt:
                    'Record the current after adjusting the voltage to -0.30V as per ramp down profile___A.',
                data_type: 'Float'
            }
        ],
        CAW_CAW_MAG_Product_CAW_MAG_FQC: [
            {
                part_number: 'G5005GT',
                line_number: '5',
                input_prompt:
                    'I confirm that I have not been involved in the test or build of the product/component/device',
                data_type: 'Text'
            },
            {
                part_number: 'G5005GT',
                line_number: '30',
                input_prompt:
                    'SHIPMENT AUTHORIZATION: I have ensured the information in the Device History Record has been reviewed, verified for completeness and acceptability, and approved, thereby authorizing this product for shipment.  All nonconformance\u2019s are confirmed Resolved and Closed.  All Concessions listed in the DHR are applicable and not expired.  The Shipment Authorization Form has been applied to the product',
                data_type: 'Text'
            }
        ],
        CAW_CAW_TAB_Integration: ['CAW_TAB_Testing', 'CAW_TAB_FQC'],
        CAW_CAW_TAB_Integration_CAW_TAB_Testing: [
            {
                part_number: 'M50022LL',
                line_number: '15',
                input_prompt:
                    'I have ensured Coil ID test is completed as per SOP',
                data_type: 'Text'
            },
            {
                part_number: '5777777-2',
                line_number: '20',
                input_prompt:
                    'I have verified the serial number against eDHR/DHR and attached the Coil & table report',
                data_type: 'Text'
            },
            {
                part_number: '5777777-2',
                line_number: '10',
                input_prompt: 'Record the code of sensitivity fixture',
                data_type: 'Equipment ID'
            },
            {
                part_number: 'M50022LL',
                line_number: '20',
                input_prompt:
                    'I have verified the serial number against eDHR/DHR and attached the Coil & table report',
                data_type: 'Text'
            }
        ],
        CAW_CAW_TAB_Integration_CAW_TAB_FQC: [
            {
                part_number: 'M50022LL',
                line_number: '30',
                input_prompt:
                    'SHIPMENT AUTHORIZATION : I have ensured the information in the Device History Record has been reviewed, verified for completeness and acceptability, and approved, thereby authorizing this product for shipment.\u00a0 All nonconformances are confirmed Resolved and Closed.\u00a0 All Concessions listed in the DHR are applicable and not expired.\u00a0 The Shipment Authorization Form has been applied to the product.',
                data_type: 'Text'
            },
            {
                part_number: 'M50022LL',
                line_number: '5',
                input_prompt:
                    'I confirm I have not been involved in the test or build of the product/componenet/device\n',
                data_type: 'Text'
            },
            {
                part_number: '5777777-2',
                line_number: '5',
                input_prompt:
                    'I confirm I have not been involved in the test or build of the product/componenet/device\n',
                data_type: 'Text'
            }
        ],
        HLP: ['HLP_Nova_route', 'HLP_SubAssy_Route'],
        HLP_HLP_Nova_route: ['HLP_System_Test_2', 'HLP_RI'],
        HLP_HLP_Nova_route_HLP_System_Test_2: [
            {
                part_number: '5809423',
                line_number: 290,
                input_prompt: '[100_Dicing作業確認 // Start dice_5305759',
                data_type: 'Text'
            },
            {
                part_number: '5809423',
                line_number: 240,
                input_prompt:
                    '[X<U+5C04><U+7EBF><U+7BA1><U+8BBE><U+5907><U+6F0F><U+5C04><U+7EBF><U+91CF>]<U+9762><U+5BF9> Gantry<U+6B63><U+9762>,<U+8F93><U+5165><U+4ECE> Tube Head<U+5F00><U+59CB><U+6D4B><U+91CF><U+7684><U+6D4B><U+91CF><U+503C>(100[mR/Hr]<U+4EE5><U+4E0B>)',
                data_type: 'Float'
            }
        ],
        HLP_HLP_Nova_route_HLP_RI: [
            {
                part_number: '5809423',
                line_number: 10,
                input_prompt:
                    '<U+68C0><U+67E5><U+786E><U+8BA4>DHR<U+65E0><U+8D85><U+5DEE><U+9879>/<U+7A7A><U+9879>',
                data_type: 'Text'
            },
            {
                part_number: '5809423',
                line_number: 5,
                input_prompt: 'DOC2182840_CS_HLP_RI  Rev1',
                data_type: 'Text'
            }
        ],
        HLP_HLP_SubAssy_Route: ['HLP_RI', 'HLP_Sub_Assy'],
        HLP_HLP_SubAssy_Route_HLP_RI: [
            {
                part_number: '5809423-S4',
                line_number: 10,
                input_prompt:
                    '<U+68C0><U+67E5><U+786E><U+8BA4>DHR<U+65E0><U+8D85><U+5DEE><U+9879>/<U+7A7A><U+9879>',
                data_type: 'Text'
            },
            {
                part_number: '5809423-S1',
                line_number: 5,
                input_prompt: 'DOC2182840_CS_HLP_RI  Rev1',
                data_type: 'Text'
            },
            {
                part_number: '5809423-S1',
                line_number: 10,
                input_prompt:
                    '<U+68C0><U+67E5><U+786E><U+8BA4>DHR<U+65E0><U+8D85><U+5DEE><U+9879>/<U+7A7A><U+9879>',
                data_type: 'Text'
            },
            {
                part_number: '5809423-S3',
                line_number: 5,
                input_prompt: 'DOC2182840_CS_HLP_RI  Rev1',
                data_type: 'Text'
            }
        ],
        HLP_HLP_SubAssy_Route_HLP_Sub_Assy: [
            {
                part_number: '5809423-S2',
                line_number: 170,
                input_prompt:
                    '[C-ARM PART ASSEMBLING] <U+786E><U+8BA4><U+5B89><U+88C5><U+65F6><U+4F7F><U+7528><U+7684><U+87BA><U+9489><U+4E3A>4<U+4E2A>5567597,<U+578B><U+53F7><U+4E3A>M4<U+5185><U+516D><U+89D2>,<U+957F><U+5EA6><U+4E3A>16mm,<U+5F3A><U+5EA6><U+4E3A>A2-70; <U+87BA><U+6BCD><U+4E3A>4<U+4E2A>5567616,<U+578B><U+53F7><U+4E3A>M4',
                data_type: 'Text'
            },
            {
                part_number: '5809423-S1',
                line_number: 330,
                input_prompt:
                    '<U+786E><U+8BA4>PB WEIGHT BALANCE MODULE ASSY<U+7EC4><U+88C5><U+5B8C><U+6210>',
                data_type: 'Text'
            }
        ]
    };

    private readonly visualizationData1 = [
        {
            objectName: 'JBR101369',
            creationTime: 1571817389000,
            inputValue: 0.0194,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101545',
            creationTime: 1575995289000,
            inputValue: 0.0129,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101254',
            creationTime: 1568232963000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101333',
            creationTime: 1571194040000,
            inputValue: 0.0197,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101626',
            creationTime: 1578107836000,
            inputValue: 0.0384,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100580',
            creationTime: 1549531188000,
            inputValue: 0.0249,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100544',
            creationTime: 1547829362000,
            inputValue: 0.0182,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101331',
            creationTime: 1570801404000,
            inputValue: 0.0173,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101406',
            creationTime: 1572471744000,
            inputValue: 0.0083,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101263',
            creationTime: 1568343676000,
            inputValue: 0.0181,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101239',
            creationTime: 1568023804000,
            inputValue: 0.0181,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101432',
            creationTime: 1573787795000,
            inputValue: 0.0187,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101086',
            creationTime: 1563235766000,
            inputValue: 0.0235,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101274',
            creationTime: 1568492493000,
            inputValue: 0.017,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101645',
            creationTime: 1579016769000,
            inputValue: 0.0117,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101290',
            creationTime: 1568704937000,
            inputValue: 0.0285,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101193',
            creationTime: 1565761403000,
            inputValue: 0.0206,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101128',
            creationTime: 1564475299000,
            inputValue: 0.023,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101536',
            creationTime: 1575775909000,
            inputValue: 0.0146,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100953',
            creationTime: 1559920664000,
            inputValue: 0.0275,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101497',
            creationTime: 1575303919000,
            inputValue: null,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100900',
            creationTime: 1559076746000,
            inputValue: 0.0213,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101415',
            creationTime: 1572850699000,
            inputValue: 0.0105,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101628',
            creationTime: 1578295300000,
            inputValue: 0.0168,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100748',
            creationTime: 1555084150000,
            inputValue: 0.0176,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101029',
            creationTime: 1561643421000,
            inputValue: 0.0174,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100609',
            creationTime: 1550777702000,
            inputValue: 0.0146,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100506',
            creationTime: 1546861227000,
            inputValue: 0.0231,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100646',
            creationTime: 1551687106000,
            inputValue: 0.0278,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100983',
            creationTime: 1560639678000,
            inputValue: 0.0108,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100530',
            creationTime: 1547602394000,
            inputValue: 0.0188,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100535',
            creationTime: 1547696587000,
            inputValue: 0.023,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100890',
            creationTime: 1558695373000,
            inputValue: 0.05,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100981',
            creationTime: 1560607590000,
            inputValue: 0.0202,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100508',
            creationTime: 1546971343000,
            inputValue: 0.0167,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100885',
            creationTime: 1558649160000,
            inputValue: 0.0307,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101542',
            creationTime: 1575934391000,
            inputValue: 0.0172,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100763',
            creationTime: 1555672670000,
            inputValue: 0.0178,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101636',
            creationTime: 1578708322000,
            inputValue: 0.036,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100714',
            creationTime: 1554416571000,
            inputValue: 0.0178,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101590',
            creationTime: 1577344391000,
            inputValue: 0.0219,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101350',
            creationTime: 1571256002000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101160',
            creationTime: 1565019796000,
            inputValue: 0.0201,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100531',
            creationTime: 1547650300000,
            inputValue: 0.0229,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101001',
            creationTime: 1560998115000,
            inputValue: 0.0226,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100596',
            creationTime: 1550215258000,
            inputValue: 0.0202,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101644',
            creationTime: 1578996681000,
            inputValue: 0.024,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101191',
            creationTime: 1565734667000,
            inputValue: 0.0187,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100682',
            creationTime: 1552689099000,
            inputValue: 0.0221,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101417',
            creationTime: 1572883626000,
            inputValue: 0.0111,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100930',
            creationTime: 1559735740000,
            inputValue: 0.0337,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100606',
            creationTime: 1550740684000,
            inputValue: 0.0371,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100566',
            creationTime: 1549334232000,
            inputValue: 0.023,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100660',
            creationTime: 1552344783000,
            inputValue: 0.0117,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100719',
            creationTime: 1554708679000,
            inputValue: 0.0183,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100543',
            creationTime: 1547823470000,
            inputValue: 0.0249,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101604',
            creationTime: 1577689403000,
            inputValue: 0.0332,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101493',
            creationTime: 1574842365000,
            inputValue: 0.0168,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101078',
            creationTime: 1562980297000,
            inputValue: 0.0183,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101155',
            creationTime: 1564983300000,
            inputValue: 0.0232,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100956',
            creationTime: 1560146548000,
            inputValue: 0.0187,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100960',
            creationTime: 1560265746000,
            inputValue: 0.0193,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101258',
            creationTime: 1568272516000,
            inputValue: 0.0173,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100679',
            creationTime: 1552662376000,
            inputValue: 0.0153,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101251',
            creationTime: 1568145608000,
            inputValue: 0.0203,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100979',
            creationTime: 1560539850000,
            inputValue: 0.018,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101314',
            creationTime: 1570047377000,
            inputValue: 0.0175,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101008',
            creationTime: 1561075603000,
            inputValue: 0.0053,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101371',
            creationTime: 1571855098000,
            inputValue: 0.0157,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100932',
            creationTime: 1559752665000,
            inputValue: 0.0165,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100910',
            creationTime: 1559174569000,
            inputValue: 0.02,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101558',
            creationTime: 1576197501000,
            inputValue: 0.0149,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100808',
            creationTime: 1556633483000,
            inputValue: 0.016,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100846',
            creationTime: 1557785618000,
            inputValue: 0.023,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101393',
            creationTime: 1572146035000,
            inputValue: 0.0173,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100997',
            creationTime: 1560957124000,
            inputValue: 0.0181,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101188',
            creationTime: 1565682663000,
            inputValue: 0.0189,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100901',
            creationTime: 1559082940000,
            inputValue: 0.0275,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101269',
            creationTime: 1568441218000,
            inputValue: 0.0191,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100996',
            creationTime: 1560942654000,
            inputValue: 0.0134,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100652',
            creationTime: 1552285262000,
            inputValue: 0.0134,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100894',
            creationTime: 1558730559000,
            inputValue: 0.04,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101540',
            creationTime: 1575907546000,
            inputValue: 0.0161,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100850',
            creationTime: 1557826397000,
            inputValue: 0.0201,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101408',
            creationTime: 1572504190000,
            inputValue: 0.0195,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101111',
            creationTime: 1563971439000,
            inputValue: 0.0212,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100783',
            creationTime: 1556201393000,
            inputValue: 0.015,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101257',
            creationTime: 1568261911000,
            inputValue: 0.0194,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100582',
            creationTime: 1549553371000,
            inputValue: 0.0239,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101168',
            creationTime: 1565163258000,
            inputValue: 0.035,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100740',
            creationTime: 1555005346000,
            inputValue: 0.0133,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100873',
            creationTime: 1558502392000,
            inputValue: 0.0149,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100571',
            creationTime: 1549424765000,
            inputValue: 0.0237,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100891',
            creationTime: 1558710452000,
            inputValue: 0.0223,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101473',
            creationTime: 1574434207000,
            inputValue: 0.0157,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101649',
            creationTime: 1579135394000,
            inputValue: 0.0121,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100605',
            creationTime: 1550746234000,
            inputValue: 0.0225,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100501',
            creationTime: 1546568965000,
            inputValue: 0.026,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101380',
            creationTime: 1572001179000,
            inputValue: 0.014,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101500',
            creationTime: 1575312010000,
            inputValue: 0.0158,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101202',
            creationTime: 1566291924000,
            inputValue: 0.064,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101423',
            creationTime: 1573319477000,
            inputValue: 0.0133,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101439',
            creationTime: 1573872702000,
            inputValue: 0.0206,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100870',
            creationTime: 1558446431000,
            inputValue: 0.0106,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100554',
            creationTime: 1548781507000,
            inputValue: 0.0166,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100988',
            creationTime: 1560847764000,
            inputValue: 0.0163,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100920',
            creationTime: 1559382957000,
            inputValue: 0.0195,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101574',
            creationTime: 1576547784000,
            inputValue: 0.0135,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100958',
            creationTime: 1560162923000,
            inputValue: 0.0168,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101043',
            creationTime: 1562180504000,
            inputValue: 0.0159,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101463',
            creationTime: 1574316959000,
            inputValue: 0.0085,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101427',
            creationTime: 1573698837000,
            inputValue: 0.019,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101352',
            creationTime: 1571321948000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100866',
            creationTime: 1558365256000,
            inputValue: 0.0176,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101646',
            creationTime: 1579014990000,
            inputValue: 0.0124,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101648',
            creationTime: 1579126896000,
            inputValue: 0.028,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100612',
            creationTime: 1550804644000,
            inputValue: 0.0231,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100653',
            creationTime: 1551869258000,
            inputValue: 0.0135,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100752',
            creationTime: 1555343222000,
            inputValue: 0.0209,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101053',
            creationTime: 1562426981000,
            inputValue: 0.0386,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101150',
            creationTime: 1564739631000,
            inputValue: 0.0468,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100924',
            creationTime: 1559314814000,
            inputValue: 0.0201,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100516',
            creationTime: 1547196114000,
            inputValue: 0.0214,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101205',
            creationTime: 1566327175000,
            inputValue: 0.0203,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101089',
            creationTime: 1563291136000,
            inputValue: 0.0232,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100817',
            creationTime: 1556850863000,
            inputValue: 0.0294,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101579',
            creationTime: 1576657373000,
            inputValue: 0.0358,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101405',
            creationTime: 1572445087000,
            inputValue: 0.0167,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101452',
            creationTime: 1574190938000,
            inputValue: 0.0199,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100898',
            creationTime: 1559060068000,
            inputValue: 0.0786,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101419',
            creationTime: 1572885789000,
            inputValue: 0.0109,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100567',
            creationTime: 1549398633000,
            inputValue: 0.0251,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101063',
            creationTime: 1562636956000,
            inputValue: 0.0163,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100509',
            creationTime: 1547002107000,
            inputValue: 0.0317,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101519',
            creationTime: 1575504054000,
            inputValue: 0.0161,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101102',
            creationTime: 1563861910000,
            inputValue: 0.0116,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101317',
            creationTime: 1570183004000,
            inputValue: 0.0179,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100710',
            creationTime: 1554190071000,
            inputValue: 0.0156,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101556',
            creationTime: 1576165570000,
            inputValue: 0.0109,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBRENG021',
            creationTime: 1565219806000,
            inputValue: 0.0177,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101355',
            creationTime: 1571323509000,
            inputValue: 0.0116,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101243',
            creationTime: 1568072435000,
            inputValue: 0.0186,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101032',
            creationTime: 1562087023000,
            inputValue: 0.0204,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101121',
            creationTime: 1564190250000,
            inputValue: 0.016,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100952',
            creationTime: 1559875267000,
            inputValue: 0.0187,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101147',
            creationTime: 1564702001000,
            inputValue: 0.0156,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101543',
            creationTime: 1575957911000,
            inputValue: 0.0156,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101376',
            creationTime: 1571947021000,
            inputValue: 0.0079,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101289',
            creationTime: 1568708561000,
            inputValue: 0.0186,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101340',
            creationTime: 1571145004000,
            inputValue: null,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101354',
            creationTime: 1571299729000,
            inputValue: 0.0167,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101151',
            creationTime: 1564754560000,
            inputValue: 0.0477,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100576',
            creationTime: 1549492806000,
            inputValue: 0.0249,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100684',
            creationTime: 1552770504000,
            inputValue: 0.0242,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100704',
            creationTime: 1553846040000,
            inputValue: 0.0181,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101267',
            creationTime: 1568398836000,
            inputValue: 0.019,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100511',
            creationTime: 1547040751000,
            inputValue: 0.0228,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100821',
            creationTime: 1556892731000,
            inputValue: 0.0152,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101095',
            creationTime: 1563786012000,
            inputValue: 0.0192,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101347',
            creationTime: 1571240022000,
            inputValue: 0.0166,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100762',
            creationTime: 1555627516000,
            inputValue: 0.018,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101276',
            creationTime: 1568510568000,
            inputValue: 0.016,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101212',
            creationTime: 1566399017000,
            inputValue: 0.0167,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101134',
            creationTime: 1564543442000,
            inputValue: 0.0162,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100545',
            creationTime: 1547836437000,
            inputValue: null,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101610',
            creationTime: 1577774958000,
            inputValue: 0.0427,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100727',
            creationTime: 1554841717000,
            inputValue: 0.0162,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100662',
            creationTime: 1552365282000,
            inputValue: 0.0207,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101421',
            creationTime: 1573248896000,
            inputValue: 0.0133,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101356',
            creationTime: 1571342574000,
            inputValue: 0.0182,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100756',
            creationTime: 1555455133000,
            inputValue: 0.0229,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100592',
            creationTime: 1549883293000,
            inputValue: 0.0226,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101345',
            creationTime: 1571237836000,
            inputValue: 0.018,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101062',
            creationTime: 1562602801000,
            inputValue: 0.015,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101533',
            creationTime: 1575722781000,
            inputValue: 0.0154,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101583',
            creationTime: 1576743202000,
            inputValue: 0.0369,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101438',
            creationTime: 1573870616000,
            inputValue: 0.0181,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100826',
            creationTime: 1556953244000,
            inputValue: 0.0209,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101170',
            creationTime: 1565199330000,
            inputValue: 0.0195,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100734',
            creationTime: 1554947226000,
            inputValue: 0.0216,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101411',
            creationTime: 1572591804000,
            inputValue: 0.0077,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101396',
            creationTime: 1572254812000,
            inputValue: 0.0153,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101309',
            creationTime: 1569892007000,
            inputValue: 0.0163,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100770',
            creationTime: 1555947042000,
            inputValue: 0.019,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101531',
            creationTime: 1575711788000,
            inputValue: 0.0072,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101315',
            creationTime: 1570112996000,
            inputValue: 0.0162,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101248',
            creationTime: 1568123215000,
            inputValue: 0.0201,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101011',
            creationTime: 1561139975000,
            inputValue: 0.0359,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101538',
            creationTime: 1575891713000,
            inputValue: 0.0133,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101311',
            creationTime: 1569995634000,
            inputValue: 0.0195,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100806',
            creationTime: 1556549334000,
            inputValue: 0.0201,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100661',
            creationTime: 1552362298000,
            inputValue: 0.0236,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100967',
            creationTime: 1560329458000,
            inputValue: 0.0196,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101566',
            creationTime: 1576302153000,
            inputValue: 0.0211,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100907',
            creationTime: 1559141758000,
            inputValue: 0.0188,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101474',
            creationTime: 1574502230000,
            inputValue: 0.0201,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101321',
            creationTime: 1570219671000,
            inputValue: 0.0153,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101148',
            creationTime: 1564724561000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101285',
            creationTime: 1568674206000,
            inputValue: 0.0148,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100893',
            creationTime: 1558725617000,
            inputValue: 0.0171,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100904',
            creationTime: 1559115995000,
            inputValue: 0.0212,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100934',
            creationTime: 1559632052000,
            inputValue: 0.0245,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100674',
            creationTime: 1552524707000,
            inputValue: 0.0251,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101428',
            creationTime: 1573713049000,
            inputValue: 0.0071,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100602',
            creationTime: 1550903650000,
            inputValue: 0.0275,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100845',
            creationTime: 1557763317000,
            inputValue: 0.0179,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101553',
            creationTime: 1576128940000,
            inputValue: 0.0139,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101501',
            creationTime: 1575312027000,
            inputValue: 0.016,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100667',
            creationTime: 1552454368000,
            inputValue: 0.0187,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101638',
            creationTime: 1578956850000,
            inputValue: null,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101002',
            creationTime: 1561018497000,
            inputValue: 0.0202,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101353',
            creationTime: 1571279451000,
            inputValue: 0.0209,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100649',
            creationTime: 1551727738000,
            inputValue: 0.011,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100669',
            creationTime: 1552470161000,
            inputValue: 0.0261,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101336',
            creationTime: 1571210975000,
            inputValue: 0.0232,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101472',
            creationTime: 1574413882000,
            inputValue: 0.0197,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100872',
            creationTime: 1558482213000,
            inputValue: 0.0201,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100844',
            creationTime: 1557763252000,
            inputValue: 0.0288,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100699',
            creationTime: 1553005314000,
            inputValue: 0.0152,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100532',
            creationTime: 1547651838000,
            inputValue: 0.0262,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101051',
            creationTime: 1562421592000,
            inputValue: 0.0208,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100782',
            creationTime: 1556199437000,
            inputValue: 0.0182,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101187',
            creationTime: 1565677351000,
            inputValue: 0.0303,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100842',
            creationTime: 1557410725000,
            inputValue: 0.0203,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100991',
            creationTime: 1560884191000,
            inputValue: 0.0268,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101337',
            creationTime: 1571175824000,
            inputValue: 0.0166,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101065',
            creationTime: 1562725781000,
            inputValue: 0.0208,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101096',
            creationTime: 1563803788000,
            inputValue: 0.0159,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100698',
            creationTime: 1552981544000,
            inputValue: 0.016,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101052',
            creationTime: 1562438262000,
            inputValue: 0.0184,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101183',
            creationTime: 1565641057000,
            inputValue: 0.0352,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100495',
            creationTime: 1546489352000,
            inputValue: 0.0201,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101318',
            creationTime: 1570191565000,
            inputValue: 0.019,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101140',
            creationTime: 1564630631000,
            inputValue: 0.0141,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100500',
            creationTime: 1546556114000,
            inputValue: 0.0247,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101260',
            creationTime: 1568298896000,
            inputValue: 0.0193,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101529',
            creationTime: 1575686554000,
            inputValue: 0.0191,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101560',
            creationTime: 1576220519000,
            inputValue: 0.0142,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100493',
            creationTime: 1546467817000,
            inputValue: 0.0228,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100677',
            creationTime: 1552643943000,
            inputValue: 0.0188,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100867',
            creationTime: 1558396032000,
            inputValue: 0.0225,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100819',
            creationTime: 1556869962000,
            inputValue: 0.0176,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101313',
            creationTime: 1570028609000,
            inputValue: 0.0206,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100831',
            creationTime: 1557153912000,
            inputValue: 0.0133,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101046',
            creationTime: 1562388584000,
            inputValue: 0.0209,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100843',
            creationTime: 1557427677000,
            inputValue: 0.0185,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101534',
            creationTime: 1575774271000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100527',
            creationTime: 1547564218000,
            inputValue: 0.0228,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101021',
            creationTime: 1561527867000,
            inputValue: 0.0192,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100572',
            creationTime: 1549439741000,
            inputValue: 0.0209,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100788',
            creationTime: 1556274140000,
            inputValue: 0.0199,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101418',
            creationTime: 1572864931000,
            inputValue: 0.0158,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101171',
            creationTime: 1565198077000,
            inputValue: 0.0152,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101621',
            creationTime: 1578035396000,
            inputValue: 0.0212,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101596',
            creationTime: 1577404117000,
            inputValue: 0.023,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100941',
            creationTime: 1559787619000,
            inputValue: 0.0153,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100880',
            creationTime: 1558594371000,
            inputValue: 0.0168,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100701',
            creationTime: 1553022626000,
            inputValue: 0.0121,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100926',
            creationTime: 1559365626000,
            inputValue: 0.0216,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100626',
            creationTime: 1550966949000,
            inputValue: 0.0199,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100705',
            creationTime: 1553843600000,
            inputValue: 0.0242,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100896',
            creationTime: 1559038545000,
            inputValue: 0.016,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100642',
            creationTime: 1551437274000,
            inputValue: 0.0182,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101485',
            creationTime: 1574726034000,
            inputValue: 0.0185,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101445',
            creationTime: 1574110764000,
            inputValue: 0.0226,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101040',
            creationTime: 1562154691000,
            inputValue: 0.0111,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101335',
            creationTime: 1571169024000,
            inputValue: 0.0186,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100650',
            creationTime: 1551788221000,
            inputValue: 0.0108,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101366',
            creationTime: 1571664640000,
            inputValue: 0.019,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101235',
            creationTime: 1567720612000,
            inputValue: 0.017,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100709',
            creationTime: 1554169069000,
            inputValue: 0.0175,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101178',
            creationTime: 1565583905000,
            inputValue: 0.0121,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101512',
            creationTime: 1575442121000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100995',
            creationTime: 1560937649000,
            inputValue: 0.0177,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101373',
            creationTime: 1571887906000,
            inputValue: 0.0173,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100707',
            creationTime: 1553894727000,
            inputValue: 0.0219,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100598',
            creationTime: 1550238136000,
            inputValue: 0.0191,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100515',
            creationTime: 1547183591000,
            inputValue: 0.023,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100639',
            creationTime: 1551356321000,
            inputValue: 0.0158,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101031',
            creationTime: 1561708323000,
            inputValue: 0.0206,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100965',
            creationTime: 1560320726000,
            inputValue: 0.0209,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100754',
            creationTime: 1555371969000,
            inputValue: 0.0203,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100522',
            creationTime: 1547496077000,
            inputValue: 0.0173,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101085',
            creationTime: 1563231589000,
            inputValue: 0.0267,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101300',
            creationTime: 1568963263000,
            inputValue: 0.0103,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101275',
            creationTime: 1568501101000,
            inputValue: 0.0201,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101505',
            creationTime: 1575356325000,
            inputValue: 0.0188,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100793',
            creationTime: 1556330402000,
            inputValue: 0.0207,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100914',
            creationTime: 1559274856000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101455',
            creationTime: 1574235616000,
            inputValue: 0.0177,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101159',
            creationTime: 1565018400000,
            inputValue: 0.0207,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101592',
            creationTime: 1577374894000,
            inputValue: 0.0319,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100593',
            creationTime: 1549899734000,
            inputValue: 0.0148,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101456',
            creationTime: 1574260588000,
            inputValue: 0.0139,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100700',
            creationTime: 1553006488000,
            inputValue: 0.0186,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101217',
            creationTime: 1566454316000,
            inputValue: 0.0203,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101523',
            creationTime: 1575588238000,
            inputValue: 0.0196,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101072',
            creationTime: 1562886404000,
            inputValue: 0.0222,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100815',
            creationTime: 1556834055000,
            inputValue: 0.0185,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100555',
            creationTime: 1548800036000,
            inputValue: 0.0137,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101305',
            creationTime: 1569315186000,
            inputValue: 0.0204,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101076',
            creationTime: 1562944091000,
            inputValue: 0.0123,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101038',
            creationTime: 1562146912000,
            inputValue: 0.0138,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101403',
            creationTime: 1572411133000,
            inputValue: 0.0144,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101093',
            creationTime: 1563463872000,
            inputValue: 0.0156,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101422',
            creationTime: 1573303464000,
            inputValue: 0.0168,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101475',
            creationTime: 1574503382000,
            inputValue: 0.0167,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101420',
            creationTime: 1573248192000,
            inputValue: 0.014,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100972',
            creationTime: 1560377476000,
            inputValue: 0.0149,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101622',
            creationTime: 1578033452000,
            inputValue: 0.0287,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101526',
            creationTime: 1575625441000,
            inputValue: 0.0098,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101444',
            creationTime: 1574106811000,
            inputValue: 0.018,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100906',
            creationTime: 1559137680000,
            inputValue: 0.0595,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101516',
            creationTime: 1575486158000,
            inputValue: 0.0197,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100975',
            creationTime: 1561555420000,
            inputValue: 0.0194,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100836',
            creationTime: 1557244744000,
            inputValue: 0.0193,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101320',
            creationTime: 1570212828000,
            inputValue: 0.0137,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101549',
            creationTime: 1576031259000,
            inputValue: 0.0127,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100961',
            creationTime: 1560204590000,
            inputValue: 0.0262,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101316',
            creationTime: 1570167557000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100805',
            creationTime: 1556535999000,
            inputValue: 0.0143,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101084',
            creationTime: 1563218713000,
            inputValue: 0.0279,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101382',
            creationTime: 1572034070000,
            inputValue: 0.0167,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100990',
            creationTime: 1560847248000,
            inputValue: 0.0199,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101201',
            creationTime: 1566287946000,
            inputValue: 0.0181,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101207',
            creationTime: 1566344882000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101033',
            creationTime: 1562096022000,
            inputValue: 0.0146,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100853',
            creationTime: 1557893001000,
            inputValue: 0.0199,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101233',
            creationTime: 1567698277000,
            inputValue: 0.0187,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100937',
            creationTime: 1559655281000,
            inputValue: 0.0291,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101261',
            creationTime: 1568318049000,
            inputValue: 0.0217,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101348',
            creationTime: 1571252706000,
            inputValue: 0.0215,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100503',
            creationTime: 1546594924000,
            inputValue: 0.0202,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100974',
            creationTime: 1560450417000,
            inputValue: 0.0175,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101225',
            creationTime: 1566540481000,
            inputValue: 0.0156,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101370',
            creationTime: 1571839369000,
            inputValue: 0.0267,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100869',
            creationTime: 1558427862000,
            inputValue: 0.0243,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101514',
            creationTime: 1575472245000,
            inputValue: 0.0177,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101023',
            creationTime: 1561555523000,
            inputValue: 0.0296,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100809',
            creationTime: 1556695154000,
            inputValue: 0.0199,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100800',
            creationTime: 1556415371000,
            inputValue: 0.0164,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101511',
            creationTime: 1575427816000,
            inputValue: 0.0183,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100672',
            creationTime: 1552505721000,
            inputValue: 0.0198,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101265',
            creationTime: 1568396912000,
            inputValue: 0.0167,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100589',
            creationTime: 1549665553000,
            inputValue: 0.0226,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101326',
            creationTime: 1570448021000,
            inputValue: 0.0161,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101460',
            creationTime: 1574278632000,
            inputValue: 0.0274,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101304',
            creationTime: 1569357762000,
            inputValue: 0.0233,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100686',
            creationTime: 1552786789000,
            inputValue: 0.0198,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100854',
            creationTime: 1557905853000,
            inputValue: 0.0192,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100871',
            creationTime: 1558462050000,
            inputValue: 0.03,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101019',
            creationTime: 1561491050000,
            inputValue: 0.0123,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100931',
            creationTime: 1559746463000,
            inputValue: 0.0199,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100569',
            creationTime: 1549407984000,
            inputValue: 0.0201,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101600',
            creationTime: 1577463263000,
            inputValue: 0.0482,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100657',
            creationTime: 1552318219000,
            inputValue: 0.0163,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100664',
            creationTime: 1552378961000,
            inputValue: 0.0256,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101319',
            creationTime: 1571286364000,
            inputValue: 0.0144,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100536',
            creationTime: 1547694511000,
            inputValue: 0.0186,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101284',
            creationTime: 1568653845000,
            inputValue: 0.0171,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101301',
            creationTime: 1569230956000,
            inputValue: 0.0219,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100676',
            creationTime: 1552638386000,
            inputValue: 0.0185,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101634',
            creationTime: 1578392336000,
            inputValue: 0.0483,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101245',
            creationTime: 1568095100000,
            inputValue: 0.0177,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101491',
            creationTime: 1574814304000,
            inputValue: 0.0145,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100574',
            creationTime: 1549465657000,
            inputValue: 0.0253,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101342',
            creationTime: 1571083832000,
            inputValue: 0.0188,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100725',
            creationTime: 1554805750000,
            inputValue: 0.0341,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101617',
            creationTime: 1577954418000,
            inputValue: 0.0285,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100917',
            creationTime: 1559591415000,
            inputValue: 0.0158,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101068',
            creationTime: 1562839137000,
            inputValue: 0.038,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100803',
            creationTime: 1556517810000,
            inputValue: 0.0674,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100488',
            creationTime: 1546269650000,
            inputValue: 0.0196,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100708',
            creationTime: 1554170308000,
            inputValue: 0.0189,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100621',
            creationTime: 1550920404000,
            inputValue: 0.0184,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100553',
            creationTime: 1548705925000,
            inputValue: 0.0186,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101237',
            creationTime: 1568007419000,
            inputValue: 0.0132,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100736',
            creationTime: 1554966601000,
            inputValue: 0.0186,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101616',
            creationTime: 1577952152000,
            inputValue: 0.0207,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100949',
            creationTime: 1559857419000,
            inputValue: 0.0247,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100549',
            creationTime: 1548093249000,
            inputValue: 0.0217,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101580',
            creationTime: 1576686268000,
            inputValue: 0.0331,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101363',
            creationTime: 1571453636000,
            inputValue: 0.0143,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101094',
            creationTime: 1563783536000,
            inputValue: 0.0159,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101372',
            creationTime: 1571871067000,
            inputValue: 0.016,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101122',
            creationTime: 1564380452000,
            inputValue: 0.018,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101036',
            creationTime: 1562121908000,
            inputValue: 0.0221,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101062',
            creationTime: 1562605881000,
            inputValue: 0.015,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101016',
            creationTime: 1561470906000,
            inputValue: 0.0123,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101182',
            creationTime: 1565620086000,
            inputValue: 0.0219,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101322',
            creationTime: 1570233685000,
            inputValue: 0.0165,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101392',
            creationTime: 1572129467000,
            inputValue: null,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100886',
            creationTime: 1558655006000,
            inputValue: 0.0307,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101506',
            creationTime: 1575380749000,
            inputValue: 0.0175,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101219',
            creationTime: 1566477130000,
            inputValue: 0.0208,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100957',
            creationTime: 1560148093000,
            inputValue: 0.0317,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100902',
            creationTime: 1559095873000,
            inputValue: 0.0246,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101164',
            creationTime: 1565129863000,
            inputValue: 0.0122,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101145',
            creationTime: 1564686408000,
            inputValue: 0.0173,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100868',
            creationTime: 1558415260000,
            inputValue: 0.0239,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101241',
            creationTime: 1568055196000,
            inputValue: 0.0193,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100715',
            creationTime: 1554418766000,
            inputValue: 0.0127,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100560',
            creationTime: 1549054195000,
            inputValue: 0.0149,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100603',
            creationTime: 1550707712000,
            inputValue: 0.033,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101581',
            creationTime: 1576699980000,
            inputValue: 0.0508,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100673',
            creationTime: 1552512318000,
            inputValue: 0.0275,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101573',
            creationTime: 1576529440000,
            inputValue: 0.0252,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101454',
            creationTime: 1574224379000,
            inputValue: 0.02,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100738',
            creationTime: 1554986594000,
            inputValue: 0.0143,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101487',
            creationTime: 1574752800000,
            inputValue: 0.0154,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101329',
            creationTime: 1570783327000,
            inputValue: 0.0178,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101328',
            creationTime: 1570780569000,
            inputValue: 0.0207,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101047',
            creationTime: 1562205448000,
            inputValue: 0.0235,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101479',
            creationTime: 1574550433000,
            inputValue: 0.0176,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101045',
            creationTime: 1562198788000,
            inputValue: 0.0132,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101116',
            creationTime: 1564150054000,
            inputValue: 0.029,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101252',
            creationTime: 1568159890000,
            inputValue: 0.0181,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100798',
            creationTime: 1556367581000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101197',
            creationTime: 1565877052000,
            inputValue: 0.0194,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101409',
            creationTime: 1572603593000,
            inputValue: 0.0151,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100587',
            creationTime: 1549643101000,
            inputValue: 0.0135,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100764',
            creationTime: 1555679281000,
            inputValue: 0.0168,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101358',
            creationTime: 1571359882000,
            inputValue: 0.0156,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101272',
            creationTime: 1568472946000,
            inputValue: 0.0164,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101521',
            creationTime: 1575529843000,
            inputValue: 0.012,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100761',
            creationTime: 1555625542000,
            inputValue: 0.0099,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100913',
            creationTime: 1559286869000,
            inputValue: 0.028,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100769',
            creationTime: 1555953158000,
            inputValue: 0.0171,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100722',
            creationTime: 1554726636000,
            inputValue: 0.0162,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100938',
            creationTime: 1559716414000,
            inputValue: 0.0206,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101450',
            creationTime: 1574181611000,
            inputValue: 0.018,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100568',
            creationTime: 1549381282000,
            inputValue: 0.0244,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101325',
            creationTime: 1570444112000,
            inputValue: 0.0133,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101149',
            creationTime: 1564739489000,
            inputValue: 0.0205,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101585',
            creationTime: 1576767825000,
            inputValue: 0.0391,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100807',
            creationTime: 1556553268000,
            inputValue: 0.0302,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101351',
            creationTime: 1571269457000,
            inputValue: 0.0161,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101075',
            creationTime: 1562920686000,
            inputValue: 0.0203,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100629',
            creationTime: 1551096635000,
            inputValue: 0.0163,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101469',
            creationTime: 1574391712000,
            inputValue: 0.0175,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101308',
            creationTime: 1569364776000,
            inputValue: 0.0184,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101430',
            creationTime: 1573738178000,
            inputValue: 0.0136,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101360',
            creationTime: 1571388978000,
            inputValue: 0.0134,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101104',
            creationTime: 1563889793000,
            inputValue: 0.0179,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101586',
            creationTime: 1576796324000,
            inputValue: 0.0166,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100992',
            creationTime: 1560912987000,
            inputValue: 0.0218,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100851',
            creationTime: 1557845944000,
            inputValue: 0.0214,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100637',
            creationTime: 1551339779000,
            inputValue: 0.0095,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101221',
            creationTime: 1566499094000,
            inputValue: 0.0198,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101064',
            creationTime: 1562695832000,
            inputValue: 0.0143,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100877',
            creationTime: 1558568047000,
            inputValue: null,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101344',
            creationTime: 1571183645000,
            inputValue: 0.0176,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100683',
            creationTime: 1552695273000,
            inputValue: 0.0284,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101012',
            creationTime: 1561359982000,
            inputValue: 0.0269,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100778',
            creationTime: 1556157396000,
            inputValue: 0.013,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100780',
            creationTime: 1556179998000,
            inputValue: 0.0144,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101587',
            creationTime: 1576798237000,
            inputValue: 0.0219,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101107',
            creationTime: 1563926328000,
            inputValue: 0.0194,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101105',
            creationTime: 1563908401000,
            inputValue: 0.0215,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100601',
            creationTime: 1550668163000,
            inputValue: 0.0235,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101071',
            creationTime: 1562880470000,
            inputValue: 0.0165,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101022',
            creationTime: 1561546773000,
            inputValue: 0.0157,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100512',
            creationTime: 1547056816000,
            inputValue: 0.0211,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101613',
            creationTime: 1577808994000,
            inputValue: 0.0431,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100757',
            creationTime: 1555483944000,
            inputValue: 0.0117,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100779',
            creationTime: 1556158732000,
            inputValue: 0.0172,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100570',
            creationTime: 1549416760000,
            inputValue: 0.0314,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101028',
            creationTime: 1561633162000,
            inputValue: 0.0191,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101125',
            creationTime: 1564410644000,
            inputValue: 0.024,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101459',
            creationTime: 1574279628000,
            inputValue: 0.024,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101196',
            creationTime: 1565861436000,
            inputValue: 0.0224,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100777',
            creationTime: 1556128304000,
            inputValue: 0.0214,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101435',
            creationTime: 1573816693000,
            inputValue: 0.0272,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101381',
            creationTime: 1571988884000,
            inputValue: 0.0088,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101099',
            creationTime: 1563821985000,
            inputValue: 0.0209,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100909',
            creationTime: 1559157246000,
            inputValue: 0.0144,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101247',
            creationTime: 1568112434000,
            inputValue: 0.0187,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101273',
            creationTime: 1568490075000,
            inputValue: 0.0122,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100618',
            creationTime: 1550884141000,
            inputValue: 0.0135,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100584',
            creationTime: 1549609231000,
            inputValue: 0.0316,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101181',
            creationTime: 1565602929000,
            inputValue: 0.0179,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100718',
            creationTime: 1554484837000,
            inputValue: 0.019,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101447',
            creationTime: 1574128231000,
            inputValue: 0.0186,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101288',
            creationTime: 1568689833000,
            inputValue: 0.0128,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100973',
            creationTime: 1560436311000,
            inputValue: 0.051,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101489',
            creationTime: 1574779236000,
            inputValue: 0.0179,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101303',
            creationTime: 1569303991000,
            inputValue: 0.0213,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101296',
            creationTime: 1568796290000,
            inputValue: 0.0139,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100947',
            creationTime: 1559841420000,
            inputValue: 0.0331,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101027',
            creationTime: 1561626853000,
            inputValue: 0.0325,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101400',
            creationTime: 1572323699000,
            inputValue: 0.013,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101141',
            creationTime: 1564647630000,
            inputValue: 0.034,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101517',
            creationTime: 1577380470000,
            inputValue: null,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100640',
            creationTime: 1551371358000,
            inputValue: 0.0196,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100781',
            creationTime: 1556184736000,
            inputValue: 0.0175,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100955',
            creationTime: 1559975183000,
            inputValue: 0.0316,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100767',
            creationTime: 1555914856000,
            inputValue: 0.0091,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100903',
            creationTime: 1559101402000,
            inputValue: 0.0268,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100823',
            creationTime: 1556919241000,
            inputValue: 0.0171,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101249',
            creationTime: 1568128074000,
            inputValue: 0.0186,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101010',
            creationTime: 1561363381000,
            inputValue: 0.0141,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101163',
            creationTime: 1565059617000,
            inputValue: 0.0136,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101006',
            creationTime: 1561057723000,
            inputValue: 0.0227,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101000',
            creationTime: 1561015939000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101080',
            creationTime: 1563186067000,
            inputValue: 0.0174,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101124',
            creationTime: 1564410253000,
            inputValue: 0.0154,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101413',
            creationTime: 1572620472000,
            inputValue: 0.016,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100720',
            creationTime: 1554703034000,
            inputValue: 0.0189,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100499',
            creationTime: 1546551840000,
            inputValue: 0.0262,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101510',
            creationTime: 1575419628000,
            inputValue: 0.0177,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101498',
            creationTime: 1575294451000,
            inputValue: 0.0165,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100758',
            creationTime: 1555481775000,
            inputValue: 0.018,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101240',
            creationTime: 1568042073000,
            inputValue: 0.0214,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101112',
            creationTime: 1563984869000,
            inputValue: 0.0283,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101204',
            creationTime: 1566308566000,
            inputValue: 0.0188,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101341',
            creationTime: 1571081549000,
            inputValue: 0.0197,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101268',
            creationTime: 1568420283000,
            inputValue: 0.0185,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100827',
            creationTime: 1556954919000,
            inputValue: 0.0159,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101214',
            creationTime: 1566426685000,
            inputValue: 0.0147,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101232',
            creationTime: 1567001815000,
            inputValue: 0.0198,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101507',
            creationTime: 1575383345000,
            inputValue: 0.0183,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101388',
            creationTime: 1572096973000,
            inputValue: 0.017,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100928',
            creationTime: 1559415702000,
            inputValue: 0.0294,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100786',
            creationTime: 1556239859000,
            inputValue: 0.0386,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101283',
            creationTime: 1568647880000,
            inputValue: 0.0157,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101619',
            creationTime: 1578012392000,
            inputValue: 0.0324,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100556',
            creationTime: 1548877868000,
            inputValue: 0.0164,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100916',
            creationTime: 1559236822000,
            inputValue: 0.0174,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100825',
            creationTime: 1556939404000,
            inputValue: 0.0163,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101623',
            creationTime: 1578067227000,
            inputValue: 0.0807,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100908',
            creationTime: 1559156062000,
            inputValue: 0.0172,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101609',
            creationTime: 1577755934000,
            inputValue: 0.0128,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100524',
            creationTime: 1547523461000,
            inputValue: 0.023,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101231',
            creationTime: 1566593396000,
            inputValue: 0.0158,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100616',
            creationTime: 1550854050000,
            inputValue: 0.0221,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101067',
            creationTime: 1562823057000,
            inputValue: 0.0119,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100830',
            creationTime: 1557150330000,
            inputValue: 0.0205,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100856',
            creationTime: 1558057152000,
            inputValue: 0.0151,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101117',
            creationTime: 1564149012000,
            inputValue: 0.0207,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101190',
            creationTime: 1565710662000,
            inputValue: 0.0313,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101082',
            creationTime: 1563201486000,
            inputValue: 0.0215,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100687',
            creationTime: 1552889366000,
            inputValue: 0.0386,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101058',
            creationTime: 1562566914000,
            inputValue: 0.0152,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101280',
            creationTime: 1568590043000,
            inputValue: 0.0209,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101496',
            creationTime: 1574868596000,
            inputValue: 0.0192,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101494',
            creationTime: 1574885209000,
            inputValue: 0.0171,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100490',
            creationTime: 1546435226000,
            inputValue: 0.0186,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100706',
            creationTime: 1553891519000,
            inputValue: 0.017,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100861',
            creationTime: 1558138183000,
            inputValue: 0.0214,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101608',
            creationTime: 1577751913000,
            inputValue: 0.0365,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101504',
            creationTime: 1575348846000,
            inputValue: 0.0196,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101223',
            creationTime: 1566517139000,
            inputValue: 0.0189,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101446',
            creationTime: 1574123098000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101198',
            creationTime: 1565895483000,
            inputValue: 0.0163,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101532',
            creationTime: 1575705525000,
            inputValue: 0.0051,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101208',
            creationTime: 1566358402000,
            inputValue: 0.0206,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101113',
            creationTime: 1564093854000,
            inputValue: 0.0233,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100696',
            creationTime: 1552964169000,
            inputValue: 0.0147,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100569',
            creationTime: 1549425813000,
            inputValue: 0.0201,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101525',
            creationTime: 1575590025000,
            inputValue: 0.0175,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100528',
            creationTime: 1547577223000,
            inputValue: 0.0207,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100742',
            creationTime: 1555056049000,
            inputValue: 0.0196,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101100',
            creationTime: 1563844977000,
            inputValue: 0.0192,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101385',
            creationTime: 1572068699000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101330',
            creationTime: 1570824442000,
            inputValue: 0.0209,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101153',
            creationTime: 1564785393000,
            inputValue: 0.0224,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101606',
            creationTime: 1577718472000,
            inputValue: 0.0213,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101024',
            creationTime: 1561562930000,
            inputValue: 0.02,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100749',
            creationTime: 1555310566000,
            inputValue: 0.0204,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100963',
            creationTime: 1560262706000,
            inputValue: 0.0373,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100558',
            creationTime: 1549021402000,
            inputValue: 0.0127,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101565',
            creationTime: 1576291099000,
            inputValue: 0.0722,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100838',
            creationTime: 1557324090000,
            inputValue: 0.019,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100935',
            creationTime: 1559634075000,
            inputValue: 0.0448,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101129',
            creationTime: 1564486892000,
            inputValue: 0.0153,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100538',
            creationTime: 1547717714000,
            inputValue: 0.026,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100857',
            creationTime: 1558074474000,
            inputValue: 0.0288,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100915',
            creationTime: 1559582933000,
            inputValue: 0.0189,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100702',
            creationTime: 1553209825000,
            inputValue: 0.0245,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100828',
            creationTime: 1557122898000,
            inputValue: 0.0154,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100882',
            creationTime: 1558619266000,
            inputValue: 0.0243,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100799',
            creationTime: 1556412313000,
            inputValue: 0.0129,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101004',
            creationTime: 1561037054000,
            inputValue: 0.0157,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100577',
            creationTime: 1549494096000,
            inputValue: 0.0214,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100804',
            creationTime: 1556530623000,
            inputValue: 0.014,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101601',
            creationTime: 1577465087000,
            inputValue: 0.0202,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100497',
            creationTime: 1546530906000,
            inputValue: 0.0218,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100730',
            creationTime: 1554906582000,
            inputValue: 0.02,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101307',
            creationTime: 1569338171000,
            inputValue: 0.0185,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100534',
            creationTime: 1547669727000,
            inputValue: 0.0202,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101206',
            creationTime: 1566337138000,
            inputValue: 0.0168,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100548',
            creationTime: 1548072039000,
            inputValue: 0.0211,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100892',
            creationTime: 1558712147000,
            inputValue: 0.0219,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101555',
            creationTime: 1576167127000,
            inputValue: 0.0209,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100671',
            creationTime: 1552487039000,
            inputValue: 0.0103,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100745',
            creationTime: 1555066651000,
            inputValue: 0.019,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101433',
            creationTime: 1573795931000,
            inputValue: 0.0183,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100918',
            creationTime: 1559672043000,
            inputValue: 0.0209,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101327',
            creationTime: 1570461922000,
            inputValue: 0.0186,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100591',
            creationTime: 1549881087000,
            inputValue: 0.0212,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101074',
            creationTime: 1562906727000,
            inputValue: 0.0246,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101390',
            creationTime: 1572116365000,
            inputValue: 0.0138,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101508',
            creationTime: 1575396433000,
            inputValue: 0.0114,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100597',
            creationTime: 1550218361000,
            inputValue: 0.031,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100668',
            creationTime: 1552464221000,
            inputValue: 0.0194,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101297',
            creationTime: 1568858238000,
            inputValue: 0.0231,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101090',
            creationTime: 1563363258000,
            inputValue: 0.0149,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101172',
            creationTime: 1565227250000,
            inputValue: 0.0191,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101253',
            creationTime: 1568180228000,
            inputValue: 0.0209,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101138',
            creationTime: 1564603644000,
            inputValue: 0.0207,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101383',
            creationTime: 1572050401000,
            inputValue: 0.0082,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100768',
            creationTime: 1555930233000,
            inputValue: 0.0119,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100750',
            creationTime: 1555326455000,
            inputValue: 0.0172,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100772',
            creationTime: 1556028332000,
            inputValue: 0.0155,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100784',
            creationTime: 1556220868000,
            inputValue: 0.0296,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101282',
            creationTime: 1568635148000,
            inputValue: 0.0133,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100787',
            creationTime: 1556244288000,
            inputValue: 0.0287,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101025',
            creationTime: 1561604468000,
            inputValue: 0.0192,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100659',
            creationTime: 1552347415000,
            inputValue: 0.0186,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101098',
            creationTime: 1563820593000,
            inputValue: 0.0149,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101137',
            creationTime: 1564577832000,
            inputValue: 0.0117,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100737',
            creationTime: 1554978296000,
            inputValue: 0.0237,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100575',
            creationTime: 1549476819000,
            inputValue: 0.0202,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101109',
            creationTime: 1563951933000,
            inputValue: 0.0174,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101224',
            creationTime: 1566538358000,
            inputValue: 0.0178,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100775',
            creationTime: 1556086168000,
            inputValue: 0.0116,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100656',
            creationTime: 1552302337000,
            inputValue: 0.0174,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101395',
            creationTime: 1572241324000,
            inputValue: 0.0119,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101230',
            creationTime: 1566590005000,
            inputValue: 0.0183,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101346',
            creationTime: 1571236069000,
            inputValue: 0.019,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100521',
            creationTime: 1547480554000,
            inputValue: 0.0242,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101130',
            creationTime: 1564501643000,
            inputValue: 0.0466,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101594',
            creationTime: 1577390501000,
            inputValue: 0.0529,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100619',
            creationTime: 1550903739000,
            inputValue: 0.0188,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101228',
            creationTime: 1566572934000,
            inputValue: 0.0178,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101389',
            creationTime: 1572102221000,
            inputValue: 0.0167,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101377',
            creationTime: 1571963278000,
            inputValue: 0.0125,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100929',
            creationTime: 1559701751000,
            inputValue: 0.028,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101364',
            creationTime: 1571534760000,
            inputValue: 0.0156,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101442',
            creationTime: 1573918299000,
            inputValue: 0.0264,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101119',
            creationTime: 1564168616000,
            inputValue: 0.0247,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100887',
            creationTime: 1558676577000,
            inputValue: 0.0186,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101332',
            creationTime: 1570819905000,
            inputValue: 0.0209,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101362',
            creationTime: 1571407264000,
            inputValue: 0.0176,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101546',
            creationTime: 1575995644000,
            inputValue: 0.0176,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101537',
            creationTime: 1575889535000,
            inputValue: 0.0063,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101570',
            creationTime: 1576361402000,
            inputValue: 0.02,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100519',
            creationTime: 1547451430000,
            inputValue: 0.0168,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100689',
            creationTime: 1552891922000,
            inputValue: 0.0299,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101079',
            creationTime: 1562989046000,
            inputValue: 0.0193,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100716',
            creationTime: 1554445531000,
            inputValue: 0.0078,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101238',
            creationTime: 1568017732000,
            inputValue: 0.0184,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100666',
            creationTime: 1552443596000,
            inputValue: 0.0117,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101131',
            creationTime: 1564507342000,
            inputValue: 0.0123,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101599',
            creationTime: 1577445180000,
            inputValue: 0.0561,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101499',
            creationTime: 1575294749000,
            inputValue: 0.0187,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101467',
            creationTime: 1574371539000,
            inputValue: 0.014,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100889',
            creationTime: 1558693397000,
            inputValue: 0.0357,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100655',
            creationTime: 1552287189000,
            inputValue: 0.013,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101018',
            creationTime: 1561489349000,
            inputValue: 0.0198,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101449',
            creationTime: 1574150202000,
            inputValue: 0.0168,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101492',
            creationTime: 1574822887000,
            inputValue: 0.0141,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101375',
            creationTime: 1571929316000,
            inputValue: 0.0195,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101384',
            creationTime: 1572054385000,
            inputValue: 0.0116,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100818',
            creationTime: 1556865518000,
            inputValue: 0.0236,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101054',
            creationTime: 1562442582000,
            inputValue: 0.0198,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100658',
            creationTime: 1552320350000,
            inputValue: 0.0171,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100564',
            creationTime: 1549308448000,
            inputValue: 0.0182,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101200',
            creationTime: 1566273102000,
            inputValue: 0.0192,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101154',
            creationTime: 1564783339000,
            inputValue: 0.0128,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101088',
            creationTime: 1563317917000,
            inputValue: 0.0305,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101630',
            creationTime: 1578333842000,
            inputValue: 0.0462,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101110',
            creationTime: 1563966680000,
            inputValue: 0.0385,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101044',
            creationTime: 1562188062000,
            inputValue: 0.0261,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101210',
            creationTime: 1566368680000,
            inputValue: 0.0173,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101277',
            creationTime: 1568527143000,
            inputValue: 0.0159,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100550',
            creationTime: 1548187211000,
            inputValue: 0.0127,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100648',
            creationTime: 1551724879000,
            inputValue: 0.0111,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101092',
            creationTime: 1563432654000,
            inputValue: 0.014,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101292',
            creationTime: 1568735525000,
            inputValue: 0.0161,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101641',
            creationTime: 1578979168000,
            inputValue: 0.0107,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100685',
            creationTime: 1552771885000,
            inputValue: 0.0217,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101378',
            creationTime: 1571972637000,
            inputValue: 0.0146,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100728',
            creationTime: 1554859096000,
            inputValue: 0.0162,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101517',
            creationTime: 1575482050000,
            inputValue: 0.0086,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100994',
            creationTime: 1560926128000,
            inputValue: 0.0233,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101524',
            creationTime: 1575557062000,
            inputValue: 0.0192,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101401',
            creationTime: 1572341199000,
            inputValue: 0.0208,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100795',
            creationTime: 1556347294000,
            inputValue: 0.0184,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100939',
            creationTime: 1559722621000,
            inputValue: 0.0197,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100878',
            creationTime: 1558577003000,
            inputValue: 0.0157,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100959',
            creationTime: 1560180852000,
            inputValue: 0.0206,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100862',
            creationTime: 1558332827000,
            inputValue: 0.0202,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101554',
            creationTime: 1576137531000,
            inputValue: 0.015,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101158',
            creationTime: 1565001866000,
            inputValue: 0.0203,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100638',
            creationTime: 1551341933000,
            inputValue: 0.0158,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101050',
            creationTime: 1562407290000,
            inputValue: 0.0338,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100608',
            creationTime: 1550763020000,
            inputValue: 0.0185,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100613',
            creationTime: 1550820599000,
            inputValue: 0.0222,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100964',
            creationTime: 1560298130000,
            inputValue: 0.0177,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101073',
            creationTime: 1562901185000,
            inputValue: 0.0168,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100945',
            creationTime: 1559824474000,
            inputValue: 0.0228,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101633',
            creationTime: 1578363726000,
            inputValue: 0.0228,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101571',
            creationTime: 1576363399000,
            inputValue: 0.0201,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101575',
            creationTime: 1576627021000,
            inputValue: 0.0226,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101359',
            creationTime: 1571368974000,
            inputValue: 0.016,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100717',
            creationTime: 1554461286000,
            inputValue: 0.0141,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100875',
            creationTime: 1558539507000,
            inputValue: 0.0466,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101120',
            creationTime: 1564186836000,
            inputValue: 0.0196,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101270',
            creationTime: 1568442883000,
            inputValue: 0.0172,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100811',
            creationTime: 1556776717000,
            inputValue: 0.0201,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101387',
            creationTime: 1572085222000,
            inputValue: 0.0174,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100510',
            creationTime: 1547022034000,
            inputValue: 0.0226,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101081',
            creationTime: 1563194924000,
            inputValue: 0.0407,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101465',
            creationTime: 1574347049000,
            inputValue: 0.0163,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100695',
            creationTime: 1552961626000,
            inputValue: 0.0134,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101070',
            creationTime: 1562859926000,
            inputValue: 0.0137,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101551',
            creationTime: 1576045239000,
            inputValue: 0.0095,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101003',
            creationTime: 1561034057000,
            inputValue: 0.0202,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100703',
            creationTime: 1553211425000,
            inputValue: 0.0207,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100774',
            creationTime: 1556062059000,
            inputValue: 0.0152,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100970',
            creationTime: 1560356941000,
            inputValue: 0.0153,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101264',
            creationTime: 1568360878000,
            inputValue: 0.0198,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101440',
            creationTime: 1573895417000,
            inputValue: 0.0178,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101483',
            creationTime: 1574695181000,
            inputValue: 0.0101,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100839',
            creationTime: 1557325345000,
            inputValue: 0.0115,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101607',
            creationTime: 1577720474000,
            inputValue: 0.0504,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101470',
            creationTime: 1574391046000,
            inputValue: 0.0186,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101451',
            creationTime: 1574174884000,
            inputValue: 0.0209,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101017',
            creationTime: 1561469919000,
            inputValue: 0.0303,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101060',
            creationTime: 1562591524000,
            inputValue: 0.0204,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100820',
            creationTime: 1556880953000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100693',
            creationTime: 1552931303000,
            inputValue: 0.0219,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100692',
            creationTime: 1552923938000,
            inputValue: 0.0207,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100733',
            creationTime: 1554967734000,
            inputValue: 0.0141,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101339',
            creationTime: 1570844138000,
            inputValue: 0.016,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101057',
            creationTime: 1562460354000,
            inputValue: 0.0202,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100688',
            creationTime: 1552788267000,
            inputValue: 0.0182,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100623',
            creationTime: 1550937783000,
            inputValue: 0.0193,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101629',
            creationTime: 1578327233000,
            inputValue: 0.0178,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101195',
            creationTime: 1565810009000,
            inputValue: 0.0371,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100579',
            creationTime: 1549510999000,
            inputValue: 0.0232,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101213',
            creationTime: 1566478644000,
            inputValue: 0.02,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100919',
            creationTime: 1559674810000,
            inputValue: 0.0257,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101407',
            creationTime: 1572486976000,
            inputValue: 0.0141,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101437',
            creationTime: 1573855783000,
            inputValue: 0.0176,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101639',
            creationTime: 1578971617000,
            inputValue: 0.0153,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100547',
            creationTime: 1548055835000,
            inputValue: 0.0207,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101426',
            creationTime: 1573669085000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101106',
            creationTime: 1563921080000,
            inputValue: 0.035,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101490',
            creationTime: 1574797781000,
            inputValue: 0.0113,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101632',
            creationTime: 1578343611000,
            inputValue: null,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100796',
            creationTime: 1558355279000,
            inputValue: 0.0187,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100948',
            creationTime: 1559843412000,
            inputValue: 0.0267,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101582',
            creationTime: 1576716235000,
            inputValue: 0.0413,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101564',
            creationTime: 1576273525000,
            inputValue: 0.0337,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100732',
            creationTime: 1554925869000,
            inputValue: 0.0213,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101598',
            creationTime: 1577428144000,
            inputValue: 0.0342,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100615',
            creationTime: 1550851081000,
            inputValue: 0.0202,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100978',
            creationTime: 1560522695000,
            inputValue: 0.0186,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101132',
            creationTime: 1564521912000,
            inputValue: 0.0185,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100643',
            creationTime: 1551442234000,
            inputValue: 0.0158,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100986',
            creationTime: 1560831956000,
            inputValue: 0.0182,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100797',
            creationTime: 1556364570000,
            inputValue: 0.0165,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100694',
            creationTime: 1552938876000,
            inputValue: 0.0202,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100634',
            creationTime: 1551255026000,
            inputValue: 0.0131,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101425',
            creationTime: 1573672161000,
            inputValue: 0.0121,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101572',
            creationTime: 1576525622000,
            inputValue: 0.0478,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100985',
            creationTime: 1560785858000,
            inputValue: 0.015,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100525',
            creationTime: 1547541873000,
            inputValue: 0.0242,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101287',
            creationTime: 1568686557000,
            inputValue: 0.0168,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100622',
            creationTime: 1550934268000,
            inputValue: 0.0174,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100665',
            creationTime: 1552435142000,
            inputValue: 0.0233,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101118',
            creationTime: 1564166714000,
            inputValue: 0.0166,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101175',
            creationTime: 1565293930000,
            inputValue: 0.0168,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101244',
            creationTime: 1568079040000,
            inputValue: 0.019,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101488',
            creationTime: 1574781271000,
            inputValue: 0.0167,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101009',
            creationTime: 1561086234000,
            inputValue: 0.0188,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101034',
            creationTime: 1562104674000,
            inputValue: 0.0214,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101169',
            creationTime: 1565165321000,
            inputValue: 0.0182,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101502',
            creationTime: 1575329124000,
            inputValue: 0.0205,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101139',
            creationTime: 1564631744000,
            inputValue: 0.0191,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101126',
            creationTime: 1564432099000,
            inputValue: 0.0104,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101563',
            creationTime: 1576274983000,
            inputValue: 0.0273,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100691',
            creationTime: 1552912772000,
            inputValue: 0.0211,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100849',
            creationTime: 1557806508000,
            inputValue: 0.0325,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101448',
            creationTime: 1574148029000,
            inputValue: 0.0194,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100520',
            creationTime: 1547453432000,
            inputValue: 0.0249,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100848',
            creationTime: 1557818732000,
            inputValue: 0.0161,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100998',
            creationTime: 1560978577000,
            inputValue: 0.0215,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101162',
            creationTime: 1565045775000,
            inputValue: 0.0159,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101186',
            creationTime: 1565663710000,
            inputValue: 0.0189,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100812',
            creationTime: 1556793602000,
            inputValue: 0.0183,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100737',
            creationTime: 1554982353000,
            inputValue: 0.0237,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101457',
            creationTime: 1574252319000,
            inputValue: 0.0185,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100513',
            creationTime: 1547157202000,
            inputValue: 0.0261,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101518',
            creationTime: 1575507912000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101414',
            creationTime: 1572615535000,
            inputValue: 0.0136,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100951',
            creationTime: 1559859203000,
            inputValue: 0.0231,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100635',
            creationTime: 1551292460000,
            inputValue: 0.0209,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101480',
            creationTime: 1574664034000,
            inputValue: 0.019,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100911',
            creationTime: 1559201198000,
            inputValue: 0.0231,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101471',
            creationTime: 1574412250000,
            inputValue: 0.0217,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101250',
            creationTime: 1568141116000,
            inputValue: 0.0201,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100834',
            creationTime: 1557226479000,
            inputValue: 0.014,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100822',
            creationTime: 1556898194000,
            inputValue: 0.0164,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100611',
            creationTime: 1550802736000,
            inputValue: 0.0276,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101227',
            creationTime: 1566556565000,
            inputValue: 0.013,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101614',
            creationTime: 1577819929000,
            inputValue: 0.0247,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100881',
            creationTime: 1558609613000,
            inputValue: 0.0178,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100562',
            creationTime: 1549074631000,
            inputValue: 0.0173,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101576',
            creationTime: 1576636082000,
            inputValue: 0.0253,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101037',
            creationTime: 1562131230000,
            inputValue: 0.0147,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100760',
            creationTime: 1555502668000,
            inputValue: 0.0166,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101199',
            creationTime: 1566270151000,
            inputValue: 0.0193,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101218',
            creationTime: 1566482597000,
            inputValue: 0.015,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100936',
            creationTime: 1559657291000,
            inputValue: 0.0183,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101302',
            creationTime: 1569236513000,
            inputValue: 0.0219,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100670',
            creationTime: 1552486217000,
            inputValue: 0.0154,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100557',
            creationTime: 1548938936000,
            inputValue: 0.0129,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101165',
            creationTime: 1565131153000,
            inputValue: 0.0171,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101424',
            creationTime: 1573320840000,
            inputValue: 0.0167,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100739',
            creationTime: 1555003470000,
            inputValue: 0.0129,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100864',
            creationTime: 1558349392000,
            inputValue: 0.0304,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101101',
            creationTime: 1563843162000,
            inputValue: 0.0212,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101394',
            creationTime: 1572142297000,
            inputValue: 0.0116,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100943',
            creationTime: 1559808039000,
            inputValue: 0.0173,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101229',
            creationTime: 1566574551000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100895',
            creationTime: 1559026086000,
            inputValue: 0.0183,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100631',
            creationTime: 1551118264000,
            inputValue: 0.0166,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101562',
            creationTime: 1576507495000,
            inputValue: 0.0128,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101640',
            creationTime: 1578977194000,
            inputValue: 0.0139,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100790',
            creationTime: 1556291500000,
            inputValue: 0.0147,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100496',
            creationTime: 1546509019000,
            inputValue: 0.0217,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100494',
            creationTime: 1546473054000,
            inputValue: 0.0181,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100492',
            creationTime: 1546455217000,
            inputValue: 0.0259,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101157',
            creationTime: 1565000212000,
            inputValue: 0.0154,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101402',
            creationTime: 1572388687000,
            inputValue: 0.0209,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101114',
            creationTime: 1564121314000,
            inputValue: 0.0258,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101481',
            creationTime: 1574665994000,
            inputValue: 0.0166,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101203',
            creationTime: 1566313100000,
            inputValue: 0.0189,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101561',
            creationTime: 1576219528000,
            inputValue: 0.0217,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100586',
            creationTime: 1549632868000,
            inputValue: 0.0234,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100968',
            creationTime: 1560337785000,
            inputValue: 0.0157,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100585',
            creationTime: 1549627587000,
            inputValue: 0.0251,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101035',
            creationTime: 1562113712000,
            inputValue: 0.0188,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101547',
            creationTime: 1576012175000,
            inputValue: 0.0172,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100641',
            creationTime: 1551376854000,
            inputValue: 0.0176,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100644',
            creationTime: 1551454267000,
            inputValue: 0.0101,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101588',
            creationTime: 1576882943000,
            inputValue: 0.0284,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101477',
            creationTime: 1574519701000,
            inputValue: 0.0191,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100517',
            creationTime: 1547224330000,
            inputValue: 0.0235,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100620',
            creationTime: 1550907728000,
            inputValue: 0.0107,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101226',
            creationTime: 1566553619000,
            inputValue: 0.0106,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101589',
            creationTime: 1576884673000,
            inputValue: 0.0101,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100858',
            creationTime: 1558077717000,
            inputValue: 0.0207,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101323',
            creationTime: 1570240248000,
            inputValue: 0.018,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100859',
            creationTime: 1558090719000,
            inputValue: 0.0236,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101552',
            creationTime: 1576111995000,
            inputValue: 0.0391,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101379',
            creationTime: 1571983385000,
            inputValue: 0.0123,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100594',
            creationTime: 1549893965000,
            inputValue: 0.0243,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101167',
            creationTime: 1565146482000,
            inputValue: 0.0323,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101123',
            creationTime: 1564382675000,
            inputValue: 0.0129,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101135',
            creationTime: 1564536662000,
            inputValue: 0.017,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101166',
            creationTime: 1565143268000,
            inputValue: 0.0188,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100922',
            creationTime: 1559299169000,
            inputValue: 0.02,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101637',
            creationTime: 1578952160000,
            inputValue: 0.0276,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101569',
            creationTime: 1576331703000,
            inputValue: 0.024,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100876',
            creationTime: 1558549320000,
            inputValue: 0.0197,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101007',
            creationTime: 1561071147000,
            inputValue: 0.0111,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100984',
            creationTime: 1560759327000,
            inputValue: 0.0213,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100651',
            creationTime: 1551792620000,
            inputValue: 0.015,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101222',
            creationTime: 1566519732000,
            inputValue: 0.0198,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100712',
            creationTime: 1554398868000,
            inputValue: 0.0252,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101055',
            creationTime: 1562454412000,
            inputValue: 0.0181,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100874',
            creationTime: 1558523568000,
            inputValue: 0.0198,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101179',
            creationTime: 1565360322000,
            inputValue: 0.0134,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101091',
            creationTime: 1563402676000,
            inputValue: 0.0158,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100950',
            creationTime: 1559873054000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100729',
            creationTime: 1554880279000,
            inputValue: 0.0155,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100832',
            creationTime: 1557209829000,
            inputValue: 0.0125,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100559',
            creationTime: 1549045746000,
            inputValue: 0.015,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101412',
            creationTime: 1572597543000,
            inputValue: 0.0063,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101578',
            creationTime: 1576553523000,
            inputValue: 0.0217,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100552',
            creationTime: 1548699042000,
            inputValue: 0.0159,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100565',
            creationTime: 1549333801000,
            inputValue: 0.0213,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100599',
            creationTime: 1550231951000,
            inputValue: 0.0232,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100526',
            creationTime: 1547543181000,
            inputValue: 0.0143,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101464',
            creationTime: 1574325850000,
            inputValue: 0.0141,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101620',
            creationTime: 1578022622000,
            inputValue: 0.0349,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101568',
            creationTime: 1576330184000,
            inputValue: 0.0373,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101550',
            creationTime: 1576117540000,
            inputValue: 0.015,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101441',
            creationTime: 1573898608000,
            inputValue: 0.017,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101357',
            creationTime: 1571347064000,
            inputValue: 0.0145,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101144',
            creationTime: 1564674411000,
            inputValue: 0.0147,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101527',
            creationTime: 1575643195000,
            inputValue: 0.0177,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101334',
            creationTime: 1571206038000,
            inputValue: 0.0184,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100507',
            creationTime: 1546862677000,
            inputValue: 0.0231,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100751',
            creationTime: 1555341356000,
            inputValue: 0.0187,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101324',
            creationTime: 1570429385000,
            inputValue: 0.0195,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101020',
            creationTime: 1561532060000,
            inputValue: 0.027,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101026',
            creationTime: 1561605594000,
            inputValue: 0.0125,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100731',
            creationTime: 1554923680000,
            inputValue: 0.0215,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100969',
            creationTime: 1560353425000,
            inputValue: 0.0147,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100541',
            creationTime: 1547777476000,
            inputValue: 0.0144,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100502',
            creationTime: 1546574041000,
            inputValue: 0.043,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101262',
            creationTime: 1568343035000,
            inputValue: 0.0253,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100999',
            creationTime: 1560996733000,
            inputValue: 0.0245,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100636',
            creationTime: 1551298188000,
            inputValue: 0.0171,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101559',
            creationTime: 1576205720000,
            inputValue: 0.0259,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101014',
            creationTime: 1561430432000,
            inputValue: 0.0184,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101041',
            creationTime: 1562164038000,
            inputValue: 0.015,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100789',
            creationTime: 1556286368000,
            inputValue: 0.0151,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101557',
            creationTime: 1576186879000,
            inputValue: 0.0123,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100713',
            creationTime: 1554397682000,
            inputValue: 0.0136,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101577',
            creationTime: 1576653476000,
            inputValue: 0.0222,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101434',
            creationTime: 1573805912000,
            inputValue: 0.0173,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101368',
            creationTime: 1571770548000,
            inputValue: 0.0188,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100724',
            creationTime: 1554794606000,
            inputValue: 0.0211,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100792',
            creationTime: 1556307842000,
            inputValue: 0.0187,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101605',
            creationTime: 1577691178000,
            inputValue: 0.0181,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101087',
            creationTime: 1563249724000,
            inputValue: 0.0175,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101299',
            creationTime: 1568890449000,
            inputValue: 0.0181,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100927',
            creationTime: 1559399990000,
            inputValue: 0.0227,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101457',
            creationTime: 1574257454000,
            inputValue: 0.0185,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101281',
            creationTime: 1568620660000,
            inputValue: 0.0064,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100897',
            creationTime: 1559049004000,
            inputValue: 0.0227,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100604',
            creationTime: 1550709645000,
            inputValue: 0.0234,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101236',
            creationTime: 1567731047000,
            inputValue: 0.0171,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101615',
            creationTime: 1577950416000,
            inputValue: 0.0585,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100847',
            creationTime: 1557788436000,
            inputValue: 0.0211,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100905',
            creationTime: 1559123701000,
            inputValue: 0.0226,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101466',
            creationTime: 1574349657000,
            inputValue: 0.0158,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101192',
            creationTime: 1565735152000,
            inputValue: 0.024,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101127',
            creationTime: 1564467009000,
            inputValue: 0.0185,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101013',
            creationTime: 1561428811000,
            inputValue: 0.0185,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100595',
            creationTime: 1549988849000,
            inputValue: 0.0251,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101059',
            creationTime: 1562563851000,
            inputValue: 0.0178,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101271',
            creationTime: 1568472071000,
            inputValue: 0.0178,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101293',
            creationTime: 1568759048000,
            inputValue: 0.0177,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101513',
            creationTime: 1575448173000,
            inputValue: 0.0198,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101591',
            creationTime: 1577351459000,
            inputValue: 0.0211,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101174',
            creationTime: 1565283710000,
            inputValue: 0.0158,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101211',
            creationTime: 1566400243000,
            inputValue: 0.0179,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100759',
            creationTime: 1555498126000,
            inputValue: 0.0172,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101242',
            creationTime: 1568059744000,
            inputValue: 0.0158,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100863',
            creationTime: 1558335512000,
            inputValue: 0.0224,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100645',
            creationTime: 1551463205000,
            inputValue: 0.0216,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101367',
            creationTime: 1571753927000,
            inputValue: 0.0195,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100741',
            creationTime: 1555036394000,
            inputValue: 0.0175,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101177',
            creationTime: 1565331420000,
            inputValue: 0.0179,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100940',
            creationTime: 1559780768000,
            inputValue: 0.0223,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100537',
            creationTime: 1547713124000,
            inputValue: 0.0251,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100814',
            creationTime: 1556830505000,
            inputValue: 0.0183,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100773',
            creationTime: 1556062231000,
            inputValue: 0.0181,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100925',
            creationTime: 1559348527000,
            inputValue: 0.0456,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100614',
            creationTime: 1550824953000,
            inputValue: 0.0118,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101083',
            creationTime: 1563211524000,
            inputValue: 0.0323,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101618',
            creationTime: 1578011500000,
            inputValue: 0.0244,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101530',
            creationTime: 1575683648000,
            inputValue: 0.0166,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100813',
            creationTime: 1556810318000,
            inputValue: 0.0246,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101539',
            creationTime: 1575909375000,
            inputValue: 0.0067,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100982',
            creationTime: 1560623055000,
            inputValue: 0.0179,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101453',
            creationTime: 1574197749000,
            inputValue: 0.0182,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101624',
            creationTime: 1578070490000,
            inputValue: 0.0314,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100610',
            creationTime: 1550780386000,
            inputValue: 0.0362,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101136',
            creationTime: 1564560064000,
            inputValue: 0.023,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101374',
            creationTime: 1571910574000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101482',
            creationTime: 1574694124000,
            inputValue: 0.0124,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100794',
            creationTime: 1556329289000,
            inputValue: 0.021,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101295',
            creationTime: 1568796776000,
            inputValue: 0.0183,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100681',
            creationTime: 1552679821000,
            inputValue: 0.0166,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101143',
            creationTime: 1564668734000,
            inputValue: 0.0189,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101535',
            creationTime: 1575751710000,
            inputValue: 0.02,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101291',
            creationTime: 1568730645000,
            inputValue: 0.0162,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101310',
            creationTime: 1569973619000,
            inputValue: 0.0176,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100581',
            creationTime: 1549546477000,
            inputValue: 0.0225,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101216',
            creationTime: 1566457934000,
            inputValue: 0.0208,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100551',
            creationTime: 1548246049000,
            inputValue: 0.0271,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101391',
            creationTime: 1572126247000,
            inputValue: 0.0159,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101180',
            creationTime: 1565583300000,
            inputValue: 0.0197,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100766',
            creationTime: 1555912989000,
            inputValue: 0.0183,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100573',
            creationTime: 1549445526000,
            inputValue: 0.0168,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101495',
            creationTime: 1575289789000,
            inputValue: 0.0202,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100840',
            creationTime: 1557341193000,
            inputValue: 0.0183,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101108',
            creationTime: 1563940785000,
            inputValue: 0.0247,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100841',
            creationTime: 1557410648000,
            inputValue: 0.0281,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100921',
            creationTime: 1559689382000,
            inputValue: 0.0359,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100607',
            creationTime: 1550761652000,
            inputValue: 0.0139,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100542',
            creationTime: 1547799342000,
            inputValue: 0.0308,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100690',
            creationTime: 1552906708000,
            inputValue: 0.0241,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101627',
            creationTime: 1578299025000,
            inputValue: 0.0207,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101061',
            creationTime: 1562583621000,
            inputValue: 0.0255,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101397',
            creationTime: 1572260616000,
            inputValue: 0.0185,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101635',
            creationTime: 1578382838000,
            inputValue: 0.0173,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101215',
            creationTime: 1566440038000,
            inputValue: 0.0233,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100563',
            creationTime: 1549307900000,
            inputValue: 0.0157,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100954',
            creationTime: 1559977369000,
            inputValue: 0.0168,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101103',
            creationTime: 1563862608000,
            inputValue: 0.0323,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101476',
            creationTime: 1574518404000,
            inputValue: 0.017,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101056',
            creationTime: 1562632249000,
            inputValue: 0.0194,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100491',
            creationTime: 1546433628000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101522',
            creationTime: 1575558567000,
            inputValue: 0.0158,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101541',
            creationTime: 1575935488000,
            inputValue: 0.018,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101256',
            creationTime: 1568253755000,
            inputValue: 0.0176,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101042',
            creationTime: 1562171081000,
            inputValue: 0.0236,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101173',
            creationTime: 1565225937000,
            inputValue: 0.0192,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100980',
            creationTime: 1560558387000,
            inputValue: 0.0136,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101286',
            creationTime: 1568668431000,
            inputValue: 0.0195,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101410',
            creationTime: 1572616416000,
            inputValue: 0.014,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100678',
            creationTime: 1552653558000,
            inputValue: 0.0168,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101152',
            creationTime: 1564755825000,
            inputValue: 0.0146,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100721',
            creationTime: 1554720692000,
            inputValue: 0.0192,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101399',
            creationTime: 1572286203000,
            inputValue: 0.017,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100837',
            creationTime: 1557295996000,
            inputValue: 0.0165,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100899',
            creationTime: 1559065423000,
            inputValue: 0.0161,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101259',
            creationTime: 1568296870000,
            inputValue: 0.0198,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100912',
            creationTime: 1559214212000,
            inputValue: 0.0364,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101593',
            creationTime: 1577374268000,
            inputValue: 0.0106,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101520',
            creationTime: 1575532239000,
            inputValue: 0.0182,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100791',
            creationTime: 1556305321000,
            inputValue: 0.0199,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100755',
            creationTime: 1555452382000,
            inputValue: 0.0223,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100879',
            creationTime: 1558591096000,
            inputValue: 0.0183,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100498',
            creationTime: 1546533364000,
            inputValue: 0.0235,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101142',
            creationTime: 1564649393000,
            inputValue: 0.0239,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101049',
            creationTime: 1562405256000,
            inputValue: 0.0233,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101595',
            creationTime: 1577752287000,
            inputValue: 0.0292,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101612',
            creationTime: 1577807351000,
            inputValue: 0.0202,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101077',
            creationTime: 1562965972000,
            inputValue: 0.0236,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100753',
            creationTime: 1555404652000,
            inputValue: 0.022,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101185',
            creationTime: 1565657738000,
            inputValue: 0.0205,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100617',
            creationTime: 1550890720000,
            inputValue: 0.0132,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101066',
            creationTime: 1562728089000,
            inputValue: 0.015,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100746',
            creationTime: 1555073968000,
            inputValue: 0.0184,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100539',
            creationTime: 1547750528000,
            inputValue: 0.0288,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100944',
            creationTime: 1559813585000,
            inputValue: 0.0232,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101486',
            creationTime: 1574757172000,
            inputValue: 0.019,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101643',
            creationTime: 1578994553000,
            inputValue: 0.017,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100723',
            creationTime: 1554783687000,
            inputValue: 0.016,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100533',
            creationTime: 1547666850000,
            inputValue: 0.0257,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101611',
            creationTime: 1577776788000,
            inputValue: 0.0646,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100833',
            creationTime: 1557208339000,
            inputValue: 0.0193,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101361',
            creationTime: 1571389875000,
            inputValue: 0.0139,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100966',
            creationTime: 1560311788000,
            inputValue: 0.0186,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101156',
            creationTime: 1564984226000,
            inputValue: 0.0257,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101602',
            creationTime: 1577495794000,
            inputValue: 0.0168,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101194',
            creationTime: 1565806201000,
            inputValue: 0.0222,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100514',
            creationTime: 1547172680000,
            inputValue: 0.0162,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100663',
            creationTime: 1552379135000,
            inputValue: 0.0193,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101005',
            creationTime: 1561054436000,
            inputValue: 0.012,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101069',
            creationTime: 1562841954000,
            inputValue: 0.0142,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100697',
            creationTime: 1552979342000,
            inputValue: 0.0177,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101298',
            creationTime: 1568855663000,
            inputValue: 0.0194,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100933',
            creationTime: 1559762122000,
            inputValue: 0.0199,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101647',
            creationTime: 1579039487000,
            inputValue: 0.0129,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101391',
            creationTime: 1572275352000,
            inputValue: 0.0159,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100883',
            creationTime: 1558625399000,
            inputValue: 0.0166,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100824',
            creationTime: 1556936414000,
            inputValue: 0.0235,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100583',
            creationTime: 1549612377000,
            inputValue: 0.0273,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101234',
            creationTime: 1567712559000,
            inputValue: 0.0131,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101294',
            creationTime: 1568776985000,
            inputValue: 0.0196,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101544',
            creationTime: 1575963691000,
            inputValue: 0.0084,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101503',
            creationTime: 1575330965000,
            inputValue: 0.0168,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100865',
            creationTime: 1558360614000,
            inputValue: 0.0193,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101509',
            creationTime: 1575399079000,
            inputValue: 0.0131,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100578',
            creationTime: 1549510330000,
            inputValue: 0.0268,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101404',
            creationTime: 1572427589000,
            inputValue: 0.016,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101484',
            creationTime: 1574724290000,
            inputValue: 0.0171,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101048',
            creationTime: 1562390337000,
            inputValue: 0.0168,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100785',
            creationTime: 1556222583000,
            inputValue: 0.0136,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101567',
            creationTime: 1576317102000,
            inputValue: 0.024,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101279',
            creationTime: 1568598599000,
            inputValue: 0.0194,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100735',
            creationTime: 1554946095000,
            inputValue: 0.0124,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100518',
            creationTime: 1547226369000,
            inputValue: 0.0367,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101220',
            creationTime: 1566496834000,
            inputValue: 0.0183,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101548',
            creationTime: 1576027390000,
            inputValue: 0.0191,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100852',
            creationTime: 1557877188000,
            inputValue: 0.0166,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101146',
            creationTime: 1564698397000,
            inputValue: 0.0211,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100726',
            creationTime: 1554823188000,
            inputValue: 0.0142,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100765',
            creationTime: 1555658389000,
            inputValue: 0.0143,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101625',
            creationTime: 1578093633000,
            inputValue: 0.0135,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100529',
            creationTime: 1547684940000,
            inputValue: 0.022,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101255',
            creationTime: 1568233907000,
            inputValue: 0.0146,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101115',
            creationTime: 1564121398000,
            inputValue: 0.0149,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100810',
            creationTime: 1556729993000,
            inputValue: 0.0162,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100884',
            creationTime: 1558638091000,
            inputValue: 0.0212,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101209',
            creationTime: 1566374106000,
            inputValue: 0.0156,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100711',
            creationTime: 1554192198000,
            inputValue: 0.0192,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100753',
            creationTime: 1555395661000,
            inputValue: 0.022,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101184',
            creationTime: 1565640825000,
            inputValue: 0.0183,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100816',
            creationTime: 1556846132000,
            inputValue: 0.0183,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100923',
            creationTime: 1559330604000,
            inputValue: 0.0221,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101416',
            creationTime: 1572863036000,
            inputValue: 0.008,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100632',
            creationTime: 1551265356000,
            inputValue: 0.0151,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100962',
            creationTime: 1560277790000,
            inputValue: 0.0216,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100633',
            creationTime: 1551255113000,
            inputValue: 0.0243,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100993',
            creationTime: 1560906726000,
            inputValue: 0.0185,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101306',
            creationTime: 1569320928000,
            inputValue: 0.0063,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101528',
            creationTime: 1575626911000,
            inputValue: 0.0191,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100989',
            creationTime: 1560865732000,
            inputValue: 0.0248,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100590',
            creationTime: 1549665274000,
            inputValue: 0.0185,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100588',
            creationTime: 1549653277000,
            inputValue: 0.0249,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100628',
            creationTime: 1551081128000,
            inputValue: 0.0135,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100942',
            creationTime: 1559801469000,
            inputValue: 0.0203,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101468',
            creationTime: 1574370318000,
            inputValue: 0.0144,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100835',
            creationTime: 1557238070000,
            inputValue: 0.0152,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101189',
            creationTime: 1565717011000,
            inputValue: 0.0428,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100987',
            creationTime: 1560832021000,
            inputValue: 0.0171,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101176',
            creationTime: 1565334476000,
            inputValue: 0.0168,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100977',
            creationTime: 1560494086000,
            inputValue: 0.0197,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100647',
            creationTime: 1551706934000,
            inputValue: 0.0155,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100971',
            creationTime: 1560357476000,
            inputValue: 0.0177,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100600',
            creationTime: 1550676787000,
            inputValue: 0.0254,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100624',
            creationTime: 1550950060000,
            inputValue: 0.0244,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101246',
            creationTime: 1568100961000,
            inputValue: 0.0172,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100776',
            creationTime: 1556097462000,
            inputValue: 0.01,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101462',
            creationTime: 1574308284000,
            inputValue: 0.0161,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101030',
            creationTime: 1561706499000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101461',
            creationTime: 1574299503000,
            inputValue: 0.0135,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101039',
            creationTime: 1562139081000,
            inputValue: 0.0125,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101597',
            creationTime: 1577441105000,
            inputValue: 0.0207,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101398',
            creationTime: 1572272435000,
            inputValue: 0.0172,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101133',
            creationTime: 1564557282000,
            inputValue: 0.0263,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101312',
            creationTime: 1570011836000,
            inputValue: 0.0207,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101015',
            creationTime: 1561156416000,
            inputValue: 0.0171,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101097',
            creationTime: 1563805116000,
            inputValue: 0.0189,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100680',
            creationTime: 1552673919000,
            inputValue: 0.0142,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100747',
            creationTime: 1555309313000,
            inputValue: 0.0181,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101443',
            creationTime: 1573915574000,
            inputValue: 0.0192,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100627',
            creationTime: 1550975689000,
            inputValue: 0.0156,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100504',
            creationTime: 1546620930000,
            inputValue: 0.0216,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101365',
            creationTime: 1571644381000,
            inputValue: 0.0188,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100675',
            creationTime: 1552531574000,
            inputValue: 0.0228,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100561',
            creationTime: 1549068006000,
            inputValue: 0.0141,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100546',
            creationTime: 1547849031000,
            inputValue: 0.0298,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101603',
            creationTime: 1577494881000,
            inputValue: 0.0101,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100489',
            creationTime: 1546273101000,
            inputValue: 0.0234,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101386',
            creationTime: 1572072157000,
            inputValue: 0.0118,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100888',
            creationTime: 1558678769000,
            inputValue: 0.0252,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101278',
            creationTime: 1568529973000,
            inputValue: 0.0076,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100860',
            creationTime: 1558102718000,
            inputValue: 0.0534,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100625',
            creationTime: 1550960085000,
            inputValue: 0.0187,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101431',
            creationTime: 1573743733000,
            inputValue: 0.0272,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101515',
            creationTime: 1575469527000,
            inputValue: 0.0178,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101161',
            creationTime: 1565043997000,
            inputValue: 0.0193,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101133',
            creationTime: 1564517789000,
            inputValue: null,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101631',
            creationTime: 1578352534000,
            inputValue: 0.0356,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100505',
            creationTime: 1546624392000,
            inputValue: 0.026,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100829',
            creationTime: 1557131464000,
            inputValue: 0.0128,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101584',
            creationTime: 1576744920000,
            inputValue: 0.0208,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101642',
            creationTime: 1578990014000,
            inputValue: 0.0167,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100744',
            creationTime: 1555034579000,
            inputValue: 0.0189,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100976',
            creationTime: 1560476906000,
            inputValue: 0.02,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101338',
            creationTime: 1570839127000,
            inputValue: 0.0207,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101266',
            creationTime: 1568418860000,
            inputValue: 0.0198,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100540',
            creationTime: 1547767603000,
            inputValue: 0.0188,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100523',
            creationTime: 1547522520000,
            inputValue: 0.0248,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101478',
            creationTime: 1574548784000,
            inputValue: 0.0198,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100630',
            creationTime: 1551165422000,
            inputValue: 0.0128,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100771',
            creationTime: 1556030274000,
            inputValue: 0.025,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101429',
            creationTime: 1573725132000,
            inputValue: 0.0133,
            lsl: 0.0,
            usl: 0.2
        }
    ];

    private readonly visualizationData2 = [
        [1555919040000, 9],
        [1555932480000, 2],
        [1555933380000, 3],
        [1555933560000, 1],
        [1555933920000, 5],
        [1555934100000, 4],
        [1555934280000, 6],
        [1555935120000, 7],
        [1555935180000, 8],
        [1555935420000, 9],
        [1555935540000, 11],
        [1555936140000, 12],
        [1555943700000, 7],
        [1555943940000, 8],
        [1555944060000, 9],
        [1555944240000, 13],
        [1555944360000, 11],
        [1555944420000, 12],
        [1555961400000, 1],
        [1555961820000, 2],
        [1555962180000, 3],
        [1555962420000, 4],
        [1555962660000, 6],
        [1555962720000, 5],
        [1555967700000, 2],
        [1555968240000, 1],
        [1555968540000, 4],
        [1555968720000, 3],
        [1555968900000, 5],
        [1555969080000, 6],
        [1555970100000, 7],
        [1555970280000, 8],
        [1555975320000, 9],
        [1555975560000, 11],
        [1555975800000, 13],
        [1556004540000, 1],
        [1556004720000, 2],
        [1556004960000, 4],
        [1556005020000, 3],
        [1556006160000, 6],
        [1556006400000, 2],
        [1556006640000, 1],
        [1556007120000, 3],
        [1556008260000, 7],
        [1556008380000, 8],
        [1556008620000, 11],
        [1556008740000, 12],
        [1556010180000, 13],
        [1556019900000, null],
        [1556020260000, null],
        [1556020500000, 1],
        [1556020620000, 2],
        [1556020800000, 3],
        [1556020860000, 7],
        [1556021040000, null],
        [1556021220000, 8],
        [1556022240000, 1],
        [1556022600000, 3],
        [1556022780000, 2],
        [1556023020000, 4],
        [1556023020000, 5],
        [1556023560000, 6],
        [1556031540000, 8],
        [1556031600000, 7],
        [1556031780000, 9],
        [1556031960000, 11],
        [1556032200000, 12],
        [1556032620000, 13],
        [1556033220000, 1],
        [1556033520000, 2],
        [1556033640000, 3],
        [1556033760000, 4],
        [1556034000000, 6],
        [1556034900000, 5],
        [1556047020000, 12],
        [1556050800000, 7],
        [1556050860000, 8],
        [1556051340000, 11],
        [1556052660000, 9],
        [1556053140000, 12],
        [1556053260000, 13],
        [1556091660000, 7],
        [1556091840000, 8],
        [1556091960000, 9],
        [1556092080000, 11],
        [1556092260000, 13],
        [1556104380000, 1],
        [1556104620000, 2],
        [1556104680000, 3],
        [1556104800000, 5],
        [1556104860000, 6],
        [1556104980000, 3],
        [1556105640000, 2],
        [1556105700000, 1],
        [1556106960000, 4],
        [1556107080000, 5],
        [1556107380000, 6],
        [1556108760000, 9],
        [1556109180000, 7],
        [1556109360000, 8],
        [1556109420000, 11],
        [1556109600000, 12],
        [1556116980000, 7],
        [1556116980000, null],
        [1556117220000, 8],
        [1556117700000, 9],
        [1556117760000, 11],
        [1556118300000, 12],
        [1556118300000, 13],
        [1556133960000, 7],
        [1556134260000, 8],
        [1556134320000, 9],
        [1556134680000, 11],
        [1556134740000, 12],
        [1556134980000, 13],
        [1556136720000, 4],
        [1556141340000, 7],
        [1556141460000, 8],
        [1556142060000, 11],
        [1556142360000, 12],
        [1556142480000, 13],
        [1556142900000, 9],
        [1556178060000, 7],
        [1556178240000, 8],
        [1556178300000, 9],
        [1556178420000, 11],
        [1556178480000, 12],
        [1556178600000, 13],
        [1556180940000, 2],
        [1556181060000, 1],
        [1556183100000, 3],
        [1556183220000, 6],
        [1556183340000, 4],
        [1556183520000, 5],
        [1556183640000, 1],
        [1556183760000, 2],
        [1556183880000, 3],
        [1556184000000, 5],
        [1556184300000, 4],
        [1556184300000, 6],
        [1556191800000, 1],
        [1556191980000, 3],
        [1556192160000, 2],
        [1556192400000, 5],
        [1556193300000, 4],
        [1556193480000, 6],
        [1556195100000, 7],
        [1556195340000, 8],
        [1556195580000, 11],
        [1556195640000, 9],
        [1556195760000, 12],
        [1556202060000, 7],
        [1556203380000, 8],
        [1556203680000, 11],
        [1556203920000, 12],
        [1556204160000, 13],
        [1556204220000, 9],
        [1556220660000, 1],
        [1556220660000, 2],
        [1556221380000, 4],
        [1556221560000, 3],
        [1556221920000, 6],
        [1556221980000, 5],
        [1556223000000, 7],
        [1556223060000, 8],
        [1556223540000, 11],
        [1556223600000, 9],
        [1556223960000, 13],
        [1556224200000, 12],
        [1557215400000, 7],
        [1557215400000, 8],
        [1557215640000, 9],
        [1557215760000, 11],
        [1557216060000, 12],
        [1557216300000, 13],
        [1557216660000, 1],
        [1557216900000, 2],
        [1557217020000, 4],
        [1557217320000, 5],
        [1557217920000, 6],
        [1557221280000, 7],
        [1557222780000, 3],
        [1557222960000, 4],
        [1557223020000, 1],
        [1557227460000, 5],
        [1557227580000, 6],
        [1557229560000, 6],
        [1557229740000, 2],
        [1557230100000, 1],
        [1557230280000, 4],
        [1557230400000, 3],
        [1557230640000, 5],
        [1557231360000, 7],
        [1557231780000, 8],
        [1557231840000, 9],
        [1557232140000, 11],
        [1557240000000, 8],
        [1557240060000, 7],
        [1557240120000, 9],
        [1557240240000, 11],
        [1557240300000, 12],
        [1557240420000, 13],
        [1557241020000, 8],
        [1557242760000, 7],
        [1557242880000, 9],
        [1557243000000, 12],
        [1557243060000, 11],
        [1557243300000, 13],
        [1557257820000, 7],
        [1557257880000, 8],
        [1557258240000, 9],
        [1557258300000, 11],
        [1557258900000, 13],
        [1557258960000, 12],
        [1557263280000, 1],
        [1557263340000, 2],
        [1557264000000, 4],
        [1557264060000, 3],
        [1557264300000, 5],
        [1557264360000, 6],
        [1557300900000, 1],
        [1557301080000, 3],
        [1557301860000, 2],
        [1557302340000, 7],
        [1557302400000, 8],
        [1557302640000, 9],
        [1557307080000, 2],
        [1557307140000, 1],
        [1557307200000, 3],
        [1557307320000, 4],
        [1557307440000, 6],
        [1557307680000, 5],
        [1557309240000, 2],
        [1557309360000, 3],
        [1557313800000, 4],
        [1557313860000, 5],
        [1557314100000, 6],
        [1557325740000, 12],
        [1557325920000, 7],
        [1557326100000, 8],
        [1557326640000, 9],
        [1557327060000, 11],
        [1557328140000, 13],
        [1557343920000, 7],
        [1557344280000, 8],
        [1557344760000, 9],
        [1557344760000, 11],
        [1557345120000, 12],
        [1557345120000, 13],
        [1557345960000, 7],
        [1557346080000, 8],
        [1557346440000, 11],
        [1557346740000, 9],
        [1557346980000, 12],
        [1557346980000, 13],
        [1557349200000, 1],
        [1557349260000, 2],
        [1557349620000, 5],
        [1557349800000, 4],
        [1557350100000, 3],
        [1557350100000, 6],
        [1557392760000, 1],
        [1557392880000, 3],
        [1557393300000, 3],
        [1557393360000, null],
        [1557394260000, null],
        [1557394440000, 8],
        [1557394740000, null],
        [1557394980000, 9],
        [1557401940000, 2],
        [1557402060000, 1],
        [1557402120000, 3],
        [1557402420000, 4],
        [1557402480000, 5],
        [1557402720000, 6],
        [1557409080000, 8],
        [1557409260000, 7],
        [1557409380000, 9],
        [1557409560000, 6],
        [1557409680000, 11],
        [1557409740000, 13],
        [1557411600000, 7],
        [1557411780000, 8],
        [1557411960000, 11],
        [1557412260000, 13],
        [1557412380000, 9],
        [1557412740000, 12],
        [1557413580000, 7],
        [1557414480000, 13],
        [1557414660000, 8],
        [1557414720000, 9],
        [1557414900000, 11],
        [1557415080000, 12],
        [1557431760000, 9],
        [1557432480000, 7],
        [1557432600000, 8],
        [1557433020000, 9],
        [1557433080000, 11],
        [1557433440000, 13],
        [1557473760000, 7],
        [1557473820000, 8],
        [1557473940000, 9],
        [1557474060000, 11],
        [1557474240000, 12],
        [1557474240000, 13],
        [1557474960000, 7],
        [1557476820000, 2],
        [1557476880000, 1],
        [1557477180000, 5],
        [1557477240000, 4],
        [1557477600000, 3],
        [1557477600000, 6],
        [1557489900000, 2],
        [1557489960000, 1],
        [1557490080000, 3],
        [1557490140000, 4],
        [1557490260000, 5],
        [1557490440000, 6],
        [1557491520000, 7],
        [1557491700000, 9],
        [1557492000000, 8],
        [1557492240000, 11],
        [1557492300000, 12],
        [1557492360000, 13],
        [1557498060000, 1],
        [1557498180000, 2],
        [1557498240000, 3],
        [1557498360000, 6],
        [1557498600000, 4],
        [1557498660000, 5],
        [1557500580000, 1],
        [1557500700000, 2],
        [1557500820000, 3],
        [1557500940000, 6],
        [1557501000000, 2],
        [1557501480000, 4],
        [1557501900000, 4],
        [1557501960000, 3],
        [1557502320000, 5],
        [1557502740000, 6],
        [1557516660000, 1],
        [1557516720000, 2],
        [1557517140000, 3],
        [1557517440000, 4],
        [1557517860000, 5],
        [1557517860000, 6],
        [1557523320000, null],
        [1557523380000, null],
        [1557523920000, 12],
        [1557523980000, 7],
        [1557524280000, 8],
        [1557524520000, 9],
        [1557734280000, 2],
        [1557734400000, 4],
        [1557734520000, 3],
        [1557734640000, 5],
        [1557734760000, 6],
        [1557741000000, 7],
        [1557741180000, 8],
        [1557745680000, 9],
        [1557746280000, 2],
        [1557746340000, 1],
        [1557747120000, 6],
        [1557747240000, 5],
        [1557747360000, 3],
        [1557747480000, 4],
        [1557758760000, 7],
        [1557758820000, 8],
        [1557759000000, 9],
        [1557759060000, 12],
        [1557759600000, 11],
        [1557759660000, 13],
        [1557759960000, 1],
        [1557760080000, 2],
        [1557760260000, 3],
        [1557760380000, 4],
        [1557760440000, 5],
        [1557760560000, 6],
        [1557777000000, 7],
        [1557777360000, 8],
        [1557777720000, 9],
        [1557778020000, 11],
        [1557778320000, 12],
        [1557778620000, 13],
        [1557781440000, 2],
        [1557781500000, 1],
        [1557782160000, 3],
        [1557782160000, 4],
        [1557782400000, 5],
        [1557782640000, 6],
        [1557818940000, 7],
        [1557819000000, 8],
        [1557819420000, 11],
        [1557819480000, 9],
        [1557819660000, 12],
        [1557819780000, 13],
        [1557820560000, 1],
        [1557820620000, 3],
        [1557820920000, 2],
        [1557827460000, 2],
        [1557827640000, 1],
        [1557827820000, 3],
        [1557827940000, 4],
        [1557832320000, 5],
        [1557832620000, 6],
        [1557833340000, 1],
        [1557833580000, 2],
        [1557834660000, 6],
        [1557834720000, 4],
        [1557834900000, 3],
        [1557835260000, 5],
        [1557835980000, 7],
        [1557836520000, 8],
        [1557844440000, 7],
        [1557844440000, 8],
        [1557845160000, 11],
        [1557845340000, 9],
        [1557845520000, 12],
        [1557845640000, 13],
        [1557846300000, 1],
        [1557846420000, 5],
        [1557846540000, 3],
        [1557846600000, 4],
        [1557846900000, 6],
        [1557862260000, 8],
        [1557864480000, 7],
        [1557865200000, 9],
        [1557865320000, 11],
        [1557865680000, 12],
        [1557865680000, 13],
        [1557877740000, 2],
        [1557877860000, 1],
        [1557878340000, 4],
        [1557878460000, 3],
        [1557878700000, 5],
        [1557878820000, 6],
        [1557905820000, 7],
        [1557906060000, 9],
        [1557906360000, 12],
        [1557906540000, 8],
        [1557906660000, 11],
        [1557906840000, 13],
        [1557909780000, 1],
        [1557909840000, 2],
        [1557910020000, 5],
        [1557910140000, 4],
        [1557911580000, 6],
        [1557914160000, 8],
        [1557918540000, 9],
        [1557918600000, 7],
        [1557918720000, 12],
        [1557918960000, 11],
        [1557919080000, 13],
        [1557922140000, 7],
        [1557922260000, 11],
        [1557922440000, 8],
        [1557922740000, 12],
        [1557922800000, 9],
        [1557922980000, 13],
        [1557923760000, 2],
        [1557924120000, 1],
        [1557930120000, 7],
        [1557930300000, 8],
        [1557930420000, 11],
        [1557930540000, 12],
        [1557930600000, 9],
        [1557948720000, 7],
        [1557948900000, 8],
        [1557949320000, 9],
        [1557949440000, 11],
        [1557950880000, 13],
        [1557955620000, 3],
        [1557955860000, 2],
        [1557956160000, 5],
        [1557956220000, 4],
        [1557956520000, 6],
        [1557992040000, 12],
        [1557992160000, 7],
        [1557992220000, 11],
        [1557992400000, 8],
        [1557992460000, 12],
        [1557992640000, 13],
        [1557992700000, 13],
        [1557993180000, 1],
        [1557996060000, null],
        [1557999540000, 1],
        [1557999780000, 2],
        [1557999900000, 3],
        [1557999960000, 5],
        [1558000140000, 4],
        [1558000500000, 6],
        [1558006260000, 2],
        [1558006380000, 3],
        [1558006620000, 1],
        [1558006860000, 4],
        [1558007760000, 5],
        [1558010400000, 7],
        [1558010460000, 9],
        [1558010640000, 8],
        [1558010820000, 12],
        [1558010880000, 11],
        [1558011000000, 13],
        [1558011060000, 7],
        [1558011240000, 8],
        [1558016340000, 7],
        [1558016520000, 8],
        [1558016760000, 11],
        [1558016880000, 12],
        [1558017480000, 9],
        [1558017840000, 13],
        [1558034820000, 7],
        [1558035060000, 12],
        [1558035300000, 5],
        [1558037220000, 7],
        [1558037280000, 8],
        [1558038120000, 11],
        [1558038540000, 12],
        [1558039980000, 9],
        [1558040220000, 13],
        [1558078920000, 7],
        [1558078980000, 9],
        [1558079100000, 8],
        [1558079220000, 11],
        [1558079460000, 12],
        [1558079640000, 13],
        [1558080300000, 1],
        [1558080480000, 2],
        [1558080540000, 3],
        [1558080900000, 6],
        [1558081080000, 4],
        [1558082460000, 1],
        [1558082700000, 2],
        [1558082880000, 4],
        [1558083000000, 3],
        [1558084140000, 6],
        [1558084680000, 5],
        [1558093860000, 2],
        [1558094040000, 1],
        [1558094160000, 7],
        [1558094340000, 4],
        [1558094400000, 3],
        [1558094580000, 5],
        [1558094640000, 7],
        [1558096080000, 8],
        [1558096260000, 7],
        [1558096380000, 9],
        [1558096620000, 11],
        [1558096740000, 12],
        [1558097040000, 13],
        [1558104000000, 7],
        [1558104060000, 8],
        [1558104180000, 11],
        [1558104240000, 9],
        [1558104420000, 13],
        [1558104480000, 12],
        [1558121340000, 8],
        [1558121460000, 7],
        [1558122000000, 9],
        [1558122060000, 11],
        [1558122300000, 13],
        [1558122660000, 12],
        [1558126500000, 7],
        [1558126560000, 8],
        [1558127040000, 11],
        [1558127100000, 9],
        [1558127880000, 12],
        [1558127880000, 13],
        [1558338060000, 1],
        [1558338360000, 2],
        [1558338360000, 4],
        [1558338720000, 5],
        [1558338840000, 3],
        [1558338900000, 6],
        [1558343940000, 7],
        [1558344000000, 2],
        [1558344240000, 8],
        [1558351920000, 1],
        [1558352280000, 2],
        [1558353000000, 3],
        [1558353060000, 4],
        [1558353180000, 1],
        [1558353240000, 5],
        [1558354800000, 1],
        [1558355040000, 2],
        [1558355280000, 3],
        [1558355340000, 5],
        [1558355460000, 5],
        [1558355580000, 6],
        [1558355700000, 7],
        [1558380720000, 7],
        [1558381140000, 9],
        [1558381260000, 8],
        [1558381680000, 11],
        [1558381680000, 12],
        [1558382220000, 13],
        [1558382820000, 3],
        [1558382940000, 5],
        [1558387560000, 1],
        [1558387980000, 3],
        [1558388040000, 2],
        [1558388520000, 5],
        [1558388700000, 4],
        [1558389120000, 6],
        [1558427400000, 1],
        [1558427880000, 2],
        [1558428000000, 3],
        [1558428180000, 5],
        [1558428480000, 4],
        [1558428600000, 6],
        [1558438380000, 2],
        [1558439340000, 1],
        [1558439460000, 4],
        [1558439520000, 5],
        [1558439700000, 6],
        [1558441500000, 7],
        [1558441560000, 8],
        [1558441680000, 9],
        [1558441740000, 11],
        [1558441860000, 12],
        [1558442220000, 13],
        [1558467480000, 8],
        [1558467540000, 7],
        [1558467900000, 9],
        [1558468080000, 11],
        [1558468380000, 12],
        [1558468380000, 13],
        [1561331700000, null],
        [1561331820000, null],
        [1561331940000, null],
        [1561332060000, null],
        [1561332180000, null],
        [1561332660000, null],
        [1561336800000, null],
        [1561336920000, null],
        [1561336980000, null],
        [1561337100000, null],
        [1561337340000, null],
        [1561337400000, null],
        [1561345680000, null],
        [1561345860000, null],
        [1561346100000, null],
        [1561346160000, null],
        [1561346520000, null],
        [1561346640000, null],
        [1561347540000, null],
        [1561347600000, null],
        [1561347900000, null],
        [1561347960000, null],
        [1561348200000, null],
        [1561348320000, null],
        [1561353600000, null],
        [1561353660000, null],
        [1561371540000, 7],
        [1561371840000, 8],
        [1561371960000, 8],
        [1561372260000, 12],
        [1561372380000, 11],
        [1561375320000, 1],
        [1561375620000, 2],
        [1561375740000, 3],
        [1561377240000, 4],
        [1561377540000, 5],
        [1561378500000, 7],
        [1561378800000, 8],
        [1561378980000, 9],
        [1561379220000, 11],
        [1561379220000, 12],
        [1561379640000, 13],
        [1561416780000, 7],
        [1561416840000, 8],
        [1561417080000, 12],
        [1561417260000, 11],
        [1561417500000, 13],
        [1561421820000, 2],
        [1561422120000, 1],
        [1561422240000, 6],
        [1561422420000, 3],
        [1561422600000, 5],
        [1561422660000, 4],
        [1561429860000, null],
        [1561430100000, null],
        [1561430160000, 7],
        [1561433400000, 1],
        [1561433460000, 2],
        [1561433700000, 5],
        [1561433760000, 4],
        [1561434000000, 3],
        [1561434240000, 1],
        [1561434360000, 9],
        [1561434420000, 8],
        [1561434600000, 11],
        [1561434660000, 12],
        [1561458480000, 8],
        [1561458540000, 7],
        [1561459020000, 9],
        [1561459200000, 11],
        [1561459740000, 13],
        [1561459860000, 12],
        [1561460280000, 8],
        [1561460340000, 7],
        [1561460700000, 9],
        [1561460880000, 11],
        [1561461840000, 12],
        [1561466700000, 2],
        [1561466760000, 1],
        [1561467120000, 3],
        [1561467240000, 4],
        [1561467480000, 5],
        [1561471380000, 6],
        [1561504680000, 1],
        [1561504740000, 2],
        [1561504800000, 3],
        [1561505040000, 4],
        [1561505160000, 5],
        [1561505460000, 6],
        [1561517340000, 1],
        [1561517460000, null],
        [1561517580000, 2],
        [1561517640000, 3],
        [1561517820000, 5],
        [1561517880000, 4],
        [1561519740000, 8],
        [1561519800000, 7],
        [1561520040000, 11],
        [1561520100000, 9],
        [1561520580000, 12],
        [1561526820000, 7],
        [1561527000000, 8],
        [1561527120000, 11],
        [1561527360000, 12],
        [1561549740000, 7],
        [1561550040000, 8],
        [1561550580000, 11],
        [1561550760000, 9],
        [1561551120000, 12],
        [1561552140000, 8],
        [1561552260000, 7],
        [1561552680000, 9],
        [1561552740000, 11],
        [1561553460000, 12],
        [1561553460000, 13],
        [1561936440000, 2],
        [1561936740000, 1],
        [1561936860000, 3],
        [1561936920000, 4],
        [1561937220000, 5],
        [1561937340000, 6],
        [1561941600000, 1],
        [1561941720000, 2],
        [1561941960000, 3],
        [1561942020000, 4],
        [1561942380000, 5],
        [1561948500000, 2],
        [1561948620000, 1],
        [1561948800000, 3],
        [1561948980000, 6],
        [1561949100000, 5],
        [1561949220000, 4],
        [1561951080000, 7],
        [1561951200000, 9],
        [1561951380000, 11],
        [1561951440000, 12],
        [1561951740000, 8],
        [1561959180000, 8],
        [1561959360000, 7],
        [1561959600000, 11],
        [1561959780000, 9],
        [1561960020000, 12],
        [1561978200000, 7],
        [1561978260000, 8],
        [1561978620000, 9],
        [1561978680000, 11],
        [1561979100000, 12],
        [1561979580000, 1],
        [1561979880000, 3],
        [1561980000000, 2],
        [1561980300000, 5],
        [1561980420000, 4],
        [1562020560000, 7],
        [1562020620000, 8],
        [1562020860000, 9],
        [1562020920000, 11],
        [1562021340000, 13],
        [1562021460000, 12],
        [1562024580000, 1],
        [1562024640000, 2],
        [1562024880000, 3],
        [1562024940000, 4],
        [1562026320000, 5],
        [1562026620000, 6],
        [1562034420000, 3],
        [1562034960000, 1],
        [1562035860000, 2],
        [1562036100000, 4],
        [1562036400000, 6],
        [1562036520000, 7],
        [1562036760000, 8],
        [1562037060000, 5],
        [1562037120000, 9],
        [1562046180000, 7],
        [1562046480000, 8],
        [1562046600000, 9],
        [1562046720000, 11],
        [1562046960000, 12],
        [1562047080000, 13],
        [1562066520000, 7],
        [1562066580000, 9],
        [1562066940000, 8],
        [1562068440000, 11],
        [1562069100000, 13],
        [1562069280000, 12],
        [1562069940000, 8],
        [1562070000000, 11],
        [1562070360000, 9],
        [1562070480000, 7],
        [1562070840000, 12],
        [1562071080000, 13],
        [1562071380000, 1],
        [1562071620000, 2],
        [1562071860000, 3],
        [1562071920000, 4],
        [1562072220000, 5],
        [1562108160000, 7],
        [1562108280000, 9],
        [1562108400000, 11],
        [1562108640000, 12],
        [1562108700000, 13],
        [1562110080000, 3],
        [1562110260000, 2],
        [1562110740000, 4],
        [1562110860000, 5],
        [1562110980000, 6],
        [1562115300000, 6],
        [1562121000000, 1],
        [1562121900000, 3],
        [1562122020000, 2],
        [1562122140000, 4],
        [1562122320000, 5],
        [1562123100000, 7],
        [1562123340000, 8],
        [1562123520000, 9],
        [1562130960000, 7],
        [1562131080000, 8],
        [1562131500000, 9],
        [1562131740000, 11],
        [1562131860000, 13],
        [1562132100000, 12],
        [1562151540000, 7],
        [1562151600000, 8],
        [1562151960000, 9],
        [1562152020000, 11],
        [1562152620000, 13],
        [1562152680000, 12],
        [1562153100000, 8],
        [1562153220000, 7],
        [1562155320000, 11],
        [1562155440000, 9],
        [1562156040000, 12],
        [1562156100000, 13],
        [1562156580000, 1],
        [1562156700000, 2],
        [1562157120000, 3],
        [1562157180000, 4],
        [1562157540000, 5],
        [1562157660000, 6],
        [1562194020000, 7],
        [1562194320000, 8],
        [1562194500000, 9],
        [1562194680000, 11],
        [1562194920000, 12],
        [1562194980000, 13],
        [1562199360000, 8],
        [1562200740000, 7],
        [1562208960000, 1],
        [1562209020000, 2],
        [1562209260000, 3],
        [1562209320000, 5],
        [1562209440000, 4],
        [1562209560000, 6],
        [1562212380000, 7],
        [1562212620000, 8],
        [1562212800000, 9],
        [1562212920000, 11],
        [1562215260000, 13],
        [1562216700000, 12],
        [1562219460000, 8],
        [1562219580000, 7],
        [1562219940000, 11],
        [1562220000000, 9],
        [1562220180000, 12],
        [1562220300000, 13],
        [1562236200000, 7],
        [1562236260000, 8],
        [1562236620000, 9],
        [1562236740000, 11],
        [1562237100000, 12],
        [1562237220000, 13],
        [1562237520000, 1],
        [1562237640000, 2],
        [1562238180000, 4],
        [1562238240000, 3],
        [1562238420000, 5],
        [1562238600000, 6],
        [1562280240000, 9],
        [1562280300000, 7],
        [1562280480000, 11],
        [1562280540000, 12],
        [1562280960000, 13],
        [1562281380000, 11],
        [1562281620000, 12],
        [1562281860000, 13],
        [1562283660000, 2],
        [1562283840000, 3],
        [1562285340000, 4],
        [1562285580000, 5],
        [1562285640000, 6],
        [1562288100000, 2],
        [1562288220000, 1],
        [1562292600000, 4],
        [1562292720000, 3],
        [1562292780000, 6],
        [1562293020000, 5],
        [1562293860000, 7],
        [1562294160000, 8],
        [1562294220000, 9],
        [1562295060000, 11],
        [1562295480000, 13],
        [1562295540000, 12],
        [1562296800000, 7],
        [1562296980000, 8],
        [1562297100000, 9],
        [1562297160000, 11],
        [1562297400000, 12],
        [1562297460000, 13],
        [1562322480000, 7],
        [1562322840000, 8],
        [1562322960000, 9],
        [1562323320000, 11],
        [1562323380000, 12],
        [1562323920000, 7],
        [1562324040000, 8],
        [1562324580000, 13],
        [1562324700000, 9],
        [1562324820000, 11],
        [1562325060000, 12],
        [1562538720000, null],
        [1562539140000, null],
        [1562539320000, 9],
        [1562539440000, 6],
        [1562539800000, 8],
        [1562540460000, 1],
        [1562540520000, 2],
        [1562540760000, 3],
        [1562540880000, 5],
        [1562541300000, 6],
        [1562542140000, 7],
        [1562543160000, 1],
        [1562543820000, 2],
        [1562545260000, 4],
        [1562545380000, 3],
        [1562545560000, 5],
        [1562545680000, 6],
        [1562554380000, 2],
        [1562554440000, 1],
        [1562554560000, 3],
        [1562554680000, 4],
        [1562554740000, 6],
        [1562554920000, 5],
        [1562556300000, 8],
        [1562556360000, 7],
        [1562558340000, 7],
        [1562562360000, 8],
        [1562562540000, 9],
        [1562562720000, 11],
        [1562562900000, 13],
        [1562563140000, 12],
        [1562582100000, 7],
        [1562582220000, 8],
        [1562582640000, 9],
        [1562582700000, 11],
        [1562583180000, 12],
        [1562583240000, 13],
        [1562583660000, 1],
        [1562583720000, 2],
        [1562584140000, 3],
        [1562584200000, 4],
        [1562584500000, 6],
        [1562584560000, 5],
        [1562625120000, 7],
        [1562625180000, 8],
        [1562625420000, 9],
        [1562625480000, 11],
        [1562625780000, 12],
        [1562625840000, 13],
        [1562626560000, 2],
        [1562626980000, 4],
        [1562627040000, 3],
        [1562627280000, 5],
        [1562627400000, 6],
        [1562639220000, 2],
        [1562639460000, 3],
        [1562639700000, 5],
        [1562640060000, 4],
        [1562641500000, 9],
        [1562641620000, 8],
        [1562641680000, 7],
        [1562641980000, 12],
        [1562642040000, 11],
        [1562649060000, 8],
        [1562649300000, 7],
        [1562649420000, 9],
        [1562649540000, 11],
        [1562649660000, 12],
        [1562649960000, 13],
        [1562671440000, 7],
        [1562671740000, 9],
        [1562673000000, 8],
        [1562673240000, 11],
        [1562673780000, 8],
        [1562673900000, 12],
        [1562674200000, 13],
        [1562674320000, 7],
        [1562674740000, 9],
        [1562675100000, 11],
        [1562675100000, 12],
        [1562676540000, 13],
        [1562713080000, 1],
        [1562713200000, 4],
        [1562713320000, 2],
        [1562713380000, 3],
        [1562713500000, 6],
        [1562714580000, 2],
        [1562715240000, 3],
        [1562715300000, 4],
        [1562715720000, 6],
        [1562715840000, 5],
        [1562755680000, 7],
        [1562756040000, 9],
        [1562756340000, 8],
        [1562756760000, 11],
        [1562756880000, 12],
        [1562757180000, 7],
        [1562757540000, 9],
        [1562757600000, 11],
        [1562758080000, 13],
        [1562758140000, 8],
        [1562759700000, 12],
        [1562759940000, 9],
        [1562760660000, 6],
        [1562760720000, 2],
        [1562760960000, 3],
        [1562761140000, 4],
        [1562780340000, 4],
        [1562798520000, 2],
        [1562798580000, 1],
        [1562798940000, 4],
        [1562799000000, 3],
        [1562799240000, 6],
        [1562799660000, 5],
        [1562800620000, 9],
        [1562800920000, 11],
        [1562801100000, 12],
        [1562801400000, 8],
        [1562801460000, 13],
        [1562802840000, 2],
        [1562804700000, 3],
        [1562804820000, 1],
        [1562805300000, 5],
        [1562805420000, 6],
        [1562813280000, 7],
        [1562813520000, 8],
        [1562813700000, 9],
        [1562814240000, 11],
        [1562814420000, 12],
        [1562815020000, 13],
        [1562846460000, 2],
        [1562847000000, 3],
        [1562884680000, 6],
        [1562886300000, 2],
        [1562886600000, 4],
        [1562886660000, 1],
        [1562886780000, 3],
        [1562886960000, 5],
        [1562887140000, 6],
        [1562903760000, 2],
        [1562904180000, 4],
        [1562908800000, 1],
        [1562909040000, 3],
        [1562909220000, 5],
        [1562909460000, 6],
        [1562926560000, 9],
        [1562926800000, 8],
        [1562927220000, 7],
        [1562927340000, 11],
        [1562928000000, 7],
        [1562928060000, 8],
        [1562928420000, 8],
        [1562928540000, 12],
        [1562929320000, 9],
        [1562929620000, 12],
        [1562929980000, 13],
        [1562930040000, 11],
        [1563232320000, 2],
        [1563232500000, 5],
        [1563232620000, 1],
        [1563232920000, 6],
        [1563232980000, 3],
        [1563233400000, 1],
        [1563246060000, 5],
        [1563246120000, 1],
        [1563246240000, 2],
        [1563246420000, 3],
        [1563246480000, 4],
        [1563246720000, 6],
        [1563275880000, 8],
        [1563276300000, 9],
        [1563277800000, 7],
        [1563278520000, 12],
        [1563279000000, 11],
        [1563279900000, 13],
        [1563316080000, 8],
        [1563316680000, 9],
        [1563317040000, 12],
        [1563318120000, 13],
        [1563318300000, 7],
        [1563318660000, 11],
        [1563319620000, 2],
        [1563321240000, 1],
        [1563322440000, 3],
        [1563322500000, 4],
        [1563322680000, 5],
        [1563322740000, 6],
        [1563331920000, null],
        [1563331980000, 1],
        [1563332460000, 2],
        [1563332520000, 3],
        [1563332700000, 4],
        [1563332820000, 5],
        [1563333720000, 8],
        [1563333780000, 7],
        [1563334920000, 9],
        [1563360900000, 7],
        [1563361200000, 9],
        [1563361380000, 8],
        [1563361620000, 11],
        [1563361680000, 12],
        [1563362160000, 13],
        [1563362460000, 8],
        [1563362580000, 7],
        [1563364440000, 11],
        [1563364560000, 9],
        [1563364920000, 13],
        [1563365040000, 12],
        [1563365400000, 7],
        [1563365520000, 8],
        [1563365820000, 12],
        [1563365880000, 9],
        [1563365940000, 11],
        [1563366360000, 13],
        [1563402660000, 5],
        [1563403200000, 2],
        [1563403320000, 1],
        [1563403680000, 3],
        [1563403680000, 4],
        [1563405060000, 6],
        [1563405900000, 1],
        [1563418500000, 8],
        [1563418560000, 9],
        [1563418860000, 11],
        [1563418920000, 7],
        [1563420720000, 6],
        [1563421020000, 1],
        [1563421140000, 2],
        [1563421680000, 3],
        [1563421740000, 4],
        [1563422040000, 5],
        [1563427620000, 7],
        [1563427740000, 9],
        [1563427980000, 8],
        [1563428160000, 11],
        [1563428280000, 13],
        [1563428460000, 12],
        [1563448620000, 7],
        [1563448920000, 9],
        [1563449340000, 11],
        [1563450660000, 12],
        [1563451080000, 13],
        [1563451620000, 8],
        [1563451740000, 7],
        [1563452160000, 9],
        [1563452580000, 11],
        [1563452640000, 12],
        [1563452940000, 8],
        [1563453120000, 13],
        [1563490560000, 7],
        [1563490680000, 8],
        [1563490800000, 9],
        [1563490920000, 11],
        [1563490920000, 12],
        [1563491160000, 13],
        [1563493020000, 1],
        [1563493080000, 2],
        [1563493140000, 3],
        [1563493260000, 4],
        [1563493320000, 5],
        [1563493440000, 6],
        [1563503220000, 2],
        [1563503280000, 1],
        [1563503520000, 3],
        [1563503580000, 4],
        [1563504000000, 6],
        [1563504060000, 5],
        [1563504360000, 7],
        [1563504420000, 8],
        [1563505440000, 9],
        [1563513540000, 12],
        [1563513840000, 7],
        [1563513900000, 8],
        [1563513960000, 9],
        [1563514200000, 11],
        [1563514440000, 13],
        [1563515640000, 8],
        [1563515700000, 7],
        [1563516060000, 9],
        [1563516060000, 11],
        [1563516420000, 12],
        [1563516480000, 13],
        [1563531480000, 11],
        [1563531540000, 7],
        [1563531900000, 8],
        [1563532140000, 9],
        [1563532500000, 12],
        [1563532680000, 13],
        [1563533040000, 1],
        [1563533100000, 2],
        [1563533460000, 3],
        [1563533520000, 4],
        [1563533940000, 5],
        [1563534120000, 6],
        [1563748500000, 1],
        [1563748860000, 2],
        [1563748920000, 6],
        [1563748980000, 3],
        [1563749340000, 5],
        [1563749580000, 4],
        [1563750060000, 8],
        [1563750300000, 11],
        [1563750360000, 9],
        [1563750600000, 12],
        [1563750720000, 13],
        [1563751740000, 1],
        [1563751920000, 3],
        [1563752220000, 4],
        [1563752220000, 5],
        [1563752580000, 6],
        [1563754440000, 7],
        [1563754560000, 8],
        [1563754680000, 9],
        [1563754860000, 11],
        [1563754980000, 12],
        [1563755400000, 13],
        [1563756300000, 1],
        [1563756480000, 3],
        [1563756600000, 4],
        [1563756720000, 5],
        [1563756900000, 6],
        [1563761340000, 2],
        [1563762540000, 7]
    ];

    private readonly visualizationData3 = [
        {
            objectName: 'JBR101369',
            creationTime: 1571817389000,
            inputValue: 0.0194,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101545',
            creationTime: 1575995289000,
            inputValue: 0.0129,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101254',
            creationTime: 1568232963000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101333',
            creationTime: 1571194040000,
            inputValue: 0.0197,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101626',
            creationTime: 1578107836000,
            inputValue: 0.0384,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100580',
            creationTime: 1549531188000,
            inputValue: 0.0249,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100544',
            creationTime: 1547829362000,
            inputValue: 0.0182,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101331',
            creationTime: 1570801404000,
            inputValue: 0.0173,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101406',
            creationTime: 1572471744000,
            inputValue: 0.0083,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101263',
            creationTime: 1568343676000,
            inputValue: 0.0181,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101239',
            creationTime: 1568023804000,
            inputValue: 0.0181,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101432',
            creationTime: 1573787795000,
            inputValue: 0.0187,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101086',
            creationTime: 1563235766000,
            inputValue: 0.0235,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101274',
            creationTime: 1568492493000,
            inputValue: 0.017,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101645',
            creationTime: 1579016769000,
            inputValue: 0.0117,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101290',
            creationTime: 1568704937000,
            inputValue: 0.0285,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101193',
            creationTime: 1565761403000,
            inputValue: 0.0206,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101128',
            creationTime: 1564475299000,
            inputValue: 0.023,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101536',
            creationTime: 1575775909000,
            inputValue: 0.0146,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100953',
            creationTime: 1559920664000,
            inputValue: 0.0275,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101497',
            creationTime: 1575303919000,
            inputValue: null,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100900',
            creationTime: 1559076746000,
            inputValue: 0.0213,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101415',
            creationTime: 1572850699000,
            inputValue: 0.0105,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101628',
            creationTime: 1578295300000,
            inputValue: 0.0168,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100748',
            creationTime: 1555084150000,
            inputValue: 0.0176,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101029',
            creationTime: 1561643421000,
            inputValue: 0.0174,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100609',
            creationTime: 1550777702000,
            inputValue: 0.0146,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100506',
            creationTime: 1546861227000,
            inputValue: 0.0231,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100646',
            creationTime: 1551687106000,
            inputValue: 0.0278,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100983',
            creationTime: 1560639678000,
            inputValue: 0.0108,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100530',
            creationTime: 1547602394000,
            inputValue: 0.0188,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100535',
            creationTime: 1547696587000,
            inputValue: 0.023,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100890',
            creationTime: 1558695373000,
            inputValue: 0.05,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100981',
            creationTime: 1560607590000,
            inputValue: 0.0202,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100508',
            creationTime: 1546971343000,
            inputValue: 0.0167,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100885',
            creationTime: 1558649160000,
            inputValue: 0.0307,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101542',
            creationTime: 1575934391000,
            inputValue: 0.0172,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100763',
            creationTime: 1555672670000,
            inputValue: 0.0178,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101636',
            creationTime: 1578708322000,
            inputValue: 0.036,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100714',
            creationTime: 1554416571000,
            inputValue: 0.0178,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101590',
            creationTime: 1577344391000,
            inputValue: 0.0219,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101350',
            creationTime: 1571256002000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101160',
            creationTime: 1565019796000,
            inputValue: 0.0201,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100531',
            creationTime: 1547650300000,
            inputValue: 0.0229,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101001',
            creationTime: 1560998115000,
            inputValue: 0.0226,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100596',
            creationTime: 1550215258000,
            inputValue: 0.0202,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101644',
            creationTime: 1578996681000,
            inputValue: 0.024,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101191',
            creationTime: 1565734667000,
            inputValue: 0.0187,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100682',
            creationTime: 1552689099000,
            inputValue: 0.0221,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101417',
            creationTime: 1572883626000,
            inputValue: 0.0111,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100930',
            creationTime: 1559735740000,
            inputValue: 0.0337,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100606',
            creationTime: 1550740684000,
            inputValue: 0.0371,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100566',
            creationTime: 1549334232000,
            inputValue: 0.023,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100660',
            creationTime: 1552344783000,
            inputValue: 0.0117,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100719',
            creationTime: 1554708679000,
            inputValue: 0.0183,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100543',
            creationTime: 1547823470000,
            inputValue: 0.0249,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101604',
            creationTime: 1577689403000,
            inputValue: 0.0332,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101493',
            creationTime: 1574842365000,
            inputValue: 0.0168,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101078',
            creationTime: 1562980297000,
            inputValue: 0.0183,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101155',
            creationTime: 1564983300000,
            inputValue: 0.0232,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100956',
            creationTime: 1560146548000,
            inputValue: 0.0187,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100960',
            creationTime: 1560265746000,
            inputValue: 0.0193,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101258',
            creationTime: 1568272516000,
            inputValue: 0.0173,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100679',
            creationTime: 1552662376000,
            inputValue: 0.0153,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101251',
            creationTime: 1568145608000,
            inputValue: 0.0203,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100979',
            creationTime: 1560539850000,
            inputValue: 0.018,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101314',
            creationTime: 1570047377000,
            inputValue: 0.0175,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101008',
            creationTime: 1561075603000,
            inputValue: 0.0053,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101371',
            creationTime: 1571855098000,
            inputValue: 0.0157,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100932',
            creationTime: 1559752665000,
            inputValue: 0.0165,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100910',
            creationTime: 1559174569000,
            inputValue: 0.02,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101558',
            creationTime: 1576197501000,
            inputValue: 0.0149,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100808',
            creationTime: 1556633483000,
            inputValue: 0.016,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100846',
            creationTime: 1557785618000,
            inputValue: 0.023,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101393',
            creationTime: 1572146035000,
            inputValue: 0.0173,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100997',
            creationTime: 1560957124000,
            inputValue: 0.0181,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101188',
            creationTime: 1565682663000,
            inputValue: 0.0189,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100901',
            creationTime: 1559082940000,
            inputValue: 0.0275,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101269',
            creationTime: 1568441218000,
            inputValue: 0.0191,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100996',
            creationTime: 1560942654000,
            inputValue: 0.0134,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100652',
            creationTime: 1552285262000,
            inputValue: 0.0134,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100894',
            creationTime: 1558730559000,
            inputValue: 0.04,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101540',
            creationTime: 1575907546000,
            inputValue: 0.0161,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100850',
            creationTime: 1557826397000,
            inputValue: 0.0201,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101408',
            creationTime: 1572504190000,
            inputValue: 0.0195,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101111',
            creationTime: 1563971439000,
            inputValue: 0.0212,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100783',
            creationTime: 1556201393000,
            inputValue: 0.015,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101257',
            creationTime: 1568261911000,
            inputValue: 0.0194,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100582',
            creationTime: 1549553371000,
            inputValue: 0.0239,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101168',
            creationTime: 1565163258000,
            inputValue: 0.035,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100740',
            creationTime: 1555005346000,
            inputValue: 0.0133,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100873',
            creationTime: 1558502392000,
            inputValue: 0.0149,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100571',
            creationTime: 1549424765000,
            inputValue: 0.0237,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100891',
            creationTime: 1558710452000,
            inputValue: 0.0223,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101473',
            creationTime: 1574434207000,
            inputValue: 0.0157,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101649',
            creationTime: 1579135394000,
            inputValue: 0.0121,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100605',
            creationTime: 1550746234000,
            inputValue: 0.0225,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100501',
            creationTime: 1546568965000,
            inputValue: 0.026,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101380',
            creationTime: 1572001179000,
            inputValue: 0.014,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101500',
            creationTime: 1575312010000,
            inputValue: 0.0158,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101202',
            creationTime: 1566291924000,
            inputValue: 0.064,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101423',
            creationTime: 1573319477000,
            inputValue: 0.0133,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101439',
            creationTime: 1573872702000,
            inputValue: 0.0206,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100870',
            creationTime: 1558446431000,
            inputValue: 0.0106,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100554',
            creationTime: 1548781507000,
            inputValue: 0.0166,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100988',
            creationTime: 1560847764000,
            inputValue: 0.0163,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100920',
            creationTime: 1559382957000,
            inputValue: 0.0195,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101574',
            creationTime: 1576547784000,
            inputValue: 0.0135,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100958',
            creationTime: 1560162923000,
            inputValue: 0.0168,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101043',
            creationTime: 1562180504000,
            inputValue: 0.0159,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101463',
            creationTime: 1574316959000,
            inputValue: 0.0085,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101427',
            creationTime: 1573698837000,
            inputValue: 0.019,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101352',
            creationTime: 1571321948000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100866',
            creationTime: 1558365256000,
            inputValue: 0.0176,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101646',
            creationTime: 1579014990000,
            inputValue: 0.0124,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101648',
            creationTime: 1579126896000,
            inputValue: 0.028,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100612',
            creationTime: 1550804644000,
            inputValue: 0.0231,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100653',
            creationTime: 1551869258000,
            inputValue: 0.0135,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100752',
            creationTime: 1555343222000,
            inputValue: 0.0209,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101053',
            creationTime: 1562426981000,
            inputValue: 0.0386,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101150',
            creationTime: 1564739631000,
            inputValue: 0.0468,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100924',
            creationTime: 1559314814000,
            inputValue: 0.0201,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100516',
            creationTime: 1547196114000,
            inputValue: 0.0214,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101205',
            creationTime: 1566327175000,
            inputValue: 0.0203,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101089',
            creationTime: 1563291136000,
            inputValue: 0.0232,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100817',
            creationTime: 1556850863000,
            inputValue: 0.0294,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101579',
            creationTime: 1576657373000,
            inputValue: 0.0358,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101405',
            creationTime: 1572445087000,
            inputValue: 0.0167,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101452',
            creationTime: 1574190938000,
            inputValue: 0.0199,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100898',
            creationTime: 1559060068000,
            inputValue: 0.0786,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101419',
            creationTime: 1572885789000,
            inputValue: 0.0109,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100567',
            creationTime: 1549398633000,
            inputValue: 0.0251,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101063',
            creationTime: 1562636956000,
            inputValue: 0.0163,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100509',
            creationTime: 1547002107000,
            inputValue: 0.0317,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101519',
            creationTime: 1575504054000,
            inputValue: 0.0161,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101102',
            creationTime: 1563861910000,
            inputValue: 0.0116,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101317',
            creationTime: 1570183004000,
            inputValue: 0.0179,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100710',
            creationTime: 1554190071000,
            inputValue: 0.0156,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101556',
            creationTime: 1576165570000,
            inputValue: 0.0109,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBRENG021',
            creationTime: 1565219806000,
            inputValue: 0.0177,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101355',
            creationTime: 1571323509000,
            inputValue: 0.0116,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101243',
            creationTime: 1568072435000,
            inputValue: 0.0186,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101032',
            creationTime: 1562087023000,
            inputValue: 0.0204,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101121',
            creationTime: 1564190250000,
            inputValue: 0.016,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100952',
            creationTime: 1559875267000,
            inputValue: 0.0187,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101147',
            creationTime: 1564702001000,
            inputValue: 0.0156,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101543',
            creationTime: 1575957911000,
            inputValue: 0.0156,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101376',
            creationTime: 1571947021000,
            inputValue: 0.0079,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101289',
            creationTime: 1568708561000,
            inputValue: 0.0186,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101340',
            creationTime: 1571145004000,
            inputValue: null,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101354',
            creationTime: 1571299729000,
            inputValue: 0.0167,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101151',
            creationTime: 1564754560000,
            inputValue: 0.0477,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100576',
            creationTime: 1549492806000,
            inputValue: 0.0249,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100684',
            creationTime: 1552770504000,
            inputValue: 0.0242,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100704',
            creationTime: 1553846040000,
            inputValue: 0.0181,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101267',
            creationTime: 1568398836000,
            inputValue: 0.019,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100511',
            creationTime: 1547040751000,
            inputValue: 0.0228,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100821',
            creationTime: 1556892731000,
            inputValue: 0.0152,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101095',
            creationTime: 1563786012000,
            inputValue: 0.0192,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101347',
            creationTime: 1571240022000,
            inputValue: 0.0166,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100762',
            creationTime: 1555627516000,
            inputValue: 0.018,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101276',
            creationTime: 1568510568000,
            inputValue: 0.016,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101212',
            creationTime: 1566399017000,
            inputValue: 0.0167,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101134',
            creationTime: 1564543442000,
            inputValue: 0.0162,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100545',
            creationTime: 1547836437000,
            inputValue: null,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101610',
            creationTime: 1577774958000,
            inputValue: 0.0427,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100727',
            creationTime: 1554841717000,
            inputValue: 0.0162,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100662',
            creationTime: 1552365282000,
            inputValue: 0.0207,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101421',
            creationTime: 1573248896000,
            inputValue: 0.0133,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101356',
            creationTime: 1571342574000,
            inputValue: 0.0182,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100756',
            creationTime: 1555455133000,
            inputValue: 0.0229,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100592',
            creationTime: 1549883293000,
            inputValue: 0.0226,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101345',
            creationTime: 1571237836000,
            inputValue: 0.018,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101062',
            creationTime: 1562602801000,
            inputValue: 0.015,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101533',
            creationTime: 1575722781000,
            inputValue: 0.0154,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101583',
            creationTime: 1576743202000,
            inputValue: 0.0369,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101438',
            creationTime: 1573870616000,
            inputValue: 0.0181,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100826',
            creationTime: 1556953244000,
            inputValue: 0.0209,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101170',
            creationTime: 1565199330000,
            inputValue: 0.0195,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100734',
            creationTime: 1554947226000,
            inputValue: 0.0216,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101411',
            creationTime: 1572591804000,
            inputValue: 0.0077,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101396',
            creationTime: 1572254812000,
            inputValue: 0.0153,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101309',
            creationTime: 1569892007000,
            inputValue: 0.0163,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100770',
            creationTime: 1555947042000,
            inputValue: 0.019,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101531',
            creationTime: 1575711788000,
            inputValue: 0.0072,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101315',
            creationTime: 1570112996000,
            inputValue: 0.0162,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101248',
            creationTime: 1568123215000,
            inputValue: 0.0201,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101011',
            creationTime: 1561139975000,
            inputValue: 0.0359,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101538',
            creationTime: 1575891713000,
            inputValue: 0.0133,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101311',
            creationTime: 1569995634000,
            inputValue: 0.0195,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100806',
            creationTime: 1556549334000,
            inputValue: 0.0201,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100661',
            creationTime: 1552362298000,
            inputValue: 0.0236,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100967',
            creationTime: 1560329458000,
            inputValue: 0.0196,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101566',
            creationTime: 1576302153000,
            inputValue: 0.0211,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100907',
            creationTime: 1559141758000,
            inputValue: 0.0188,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101474',
            creationTime: 1574502230000,
            inputValue: 0.0201,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101321',
            creationTime: 1570219671000,
            inputValue: 0.0153,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101148',
            creationTime: 1564724561000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101285',
            creationTime: 1568674206000,
            inputValue: 0.0148,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100893',
            creationTime: 1558725617000,
            inputValue: 0.0171,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100904',
            creationTime: 1559115995000,
            inputValue: 0.0212,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100934',
            creationTime: 1559632052000,
            inputValue: 0.0245,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100674',
            creationTime: 1552524707000,
            inputValue: 0.0251,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101428',
            creationTime: 1573713049000,
            inputValue: 0.0071,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100602',
            creationTime: 1550903650000,
            inputValue: 0.0275,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100845',
            creationTime: 1557763317000,
            inputValue: 0.0179,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101553',
            creationTime: 1576128940000,
            inputValue: 0.0139,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101501',
            creationTime: 1575312027000,
            inputValue: 0.016,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100667',
            creationTime: 1552454368000,
            inputValue: 0.0187,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101638',
            creationTime: 1578956850000,
            inputValue: null,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101002',
            creationTime: 1561018497000,
            inputValue: 0.0202,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101353',
            creationTime: 1571279451000,
            inputValue: 0.0209,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100649',
            creationTime: 1551727738000,
            inputValue: 0.011,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100669',
            creationTime: 1552470161000,
            inputValue: 0.0261,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101336',
            creationTime: 1571210975000,
            inputValue: 0.0232,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101472',
            creationTime: 1574413882000,
            inputValue: 0.0197,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100872',
            creationTime: 1558482213000,
            inputValue: 0.0201,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100844',
            creationTime: 1557763252000,
            inputValue: 0.0288,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100699',
            creationTime: 1553005314000,
            inputValue: 0.0152,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100532',
            creationTime: 1547651838000,
            inputValue: 0.0262,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101051',
            creationTime: 1562421592000,
            inputValue: 0.0208,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100782',
            creationTime: 1556199437000,
            inputValue: 0.0182,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101187',
            creationTime: 1565677351000,
            inputValue: 0.0303,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100842',
            creationTime: 1557410725000,
            inputValue: 0.0203,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100991',
            creationTime: 1560884191000,
            inputValue: 0.0268,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101337',
            creationTime: 1571175824000,
            inputValue: 0.0166,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101065',
            creationTime: 1562725781000,
            inputValue: 0.0208,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101096',
            creationTime: 1563803788000,
            inputValue: 0.0159,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100698',
            creationTime: 1552981544000,
            inputValue: 0.016,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101052',
            creationTime: 1562438262000,
            inputValue: 0.0184,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101183',
            creationTime: 1565641057000,
            inputValue: 0.0352,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100495',
            creationTime: 1546489352000,
            inputValue: 0.0201,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101318',
            creationTime: 1570191565000,
            inputValue: 0.019,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101140',
            creationTime: 1564630631000,
            inputValue: 0.0141,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100500',
            creationTime: 1546556114000,
            inputValue: 0.0247,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101260',
            creationTime: 1568298896000,
            inputValue: 0.0193,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101529',
            creationTime: 1575686554000,
            inputValue: 0.0191,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101560',
            creationTime: 1576220519000,
            inputValue: 0.0142,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100493',
            creationTime: 1546467817000,
            inputValue: 0.0228,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100677',
            creationTime: 1552643943000,
            inputValue: 0.0188,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100867',
            creationTime: 1558396032000,
            inputValue: 0.0225,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100819',
            creationTime: 1556869962000,
            inputValue: 0.0176,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101313',
            creationTime: 1570028609000,
            inputValue: 0.0206,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100831',
            creationTime: 1557153912000,
            inputValue: 0.0133,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101046',
            creationTime: 1562388584000,
            inputValue: 0.0209,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100843',
            creationTime: 1557427677000,
            inputValue: 0.0185,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101534',
            creationTime: 1575774271000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100527',
            creationTime: 1547564218000,
            inputValue: 0.0228,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101021',
            creationTime: 1561527867000,
            inputValue: 0.0192,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100572',
            creationTime: 1549439741000,
            inputValue: 0.0209,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100788',
            creationTime: 1556274140000,
            inputValue: 0.0199,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101418',
            creationTime: 1572864931000,
            inputValue: 0.0158,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101171',
            creationTime: 1565198077000,
            inputValue: 0.0152,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101621',
            creationTime: 1578035396000,
            inputValue: 0.0212,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101596',
            creationTime: 1577404117000,
            inputValue: 0.023,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100941',
            creationTime: 1559787619000,
            inputValue: 0.0153,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100880',
            creationTime: 1558594371000,
            inputValue: 0.0168,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100701',
            creationTime: 1553022626000,
            inputValue: 0.0121,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100926',
            creationTime: 1559365626000,
            inputValue: 0.0216,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100626',
            creationTime: 1550966949000,
            inputValue: 0.0199,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100705',
            creationTime: 1553843600000,
            inputValue: 0.0242,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100896',
            creationTime: 1559038545000,
            inputValue: 0.016,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100642',
            creationTime: 1551437274000,
            inputValue: 0.0182,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101485',
            creationTime: 1574726034000,
            inputValue: 0.0185,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101445',
            creationTime: 1574110764000,
            inputValue: 0.0226,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101040',
            creationTime: 1562154691000,
            inputValue: 0.0111,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101335',
            creationTime: 1571169024000,
            inputValue: 0.0186,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100650',
            creationTime: 1551788221000,
            inputValue: 0.0108,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101366',
            creationTime: 1571664640000,
            inputValue: 0.019,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101235',
            creationTime: 1567720612000,
            inputValue: 0.017,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100709',
            creationTime: 1554169069000,
            inputValue: 0.0175,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101178',
            creationTime: 1565583905000,
            inputValue: 0.0121,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101512',
            creationTime: 1575442121000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100995',
            creationTime: 1560937649000,
            inputValue: 0.0177,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101373',
            creationTime: 1571887906000,
            inputValue: 0.0173,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100707',
            creationTime: 1553894727000,
            inputValue: 0.0219,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100598',
            creationTime: 1550238136000,
            inputValue: 0.0191,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100515',
            creationTime: 1547183591000,
            inputValue: 0.023,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100639',
            creationTime: 1551356321000,
            inputValue: 0.0158,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101031',
            creationTime: 1561708323000,
            inputValue: 0.0206,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100965',
            creationTime: 1560320726000,
            inputValue: 0.0209,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100754',
            creationTime: 1555371969000,
            inputValue: 0.0203,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100522',
            creationTime: 1547496077000,
            inputValue: 0.0173,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101085',
            creationTime: 1563231589000,
            inputValue: 0.0267,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101300',
            creationTime: 1568963263000,
            inputValue: 0.0103,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101275',
            creationTime: 1568501101000,
            inputValue: 0.0201,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101505',
            creationTime: 1575356325000,
            inputValue: 0.0188,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100793',
            creationTime: 1556330402000,
            inputValue: 0.0207,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100914',
            creationTime: 1559274856000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101455',
            creationTime: 1574235616000,
            inputValue: 0.0177,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101159',
            creationTime: 1565018400000,
            inputValue: 0.0207,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101592',
            creationTime: 1577374894000,
            inputValue: 0.0319,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100593',
            creationTime: 1549899734000,
            inputValue: 0.0148,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101456',
            creationTime: 1574260588000,
            inputValue: 0.0139,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100700',
            creationTime: 1553006488000,
            inputValue: 0.0186,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101217',
            creationTime: 1566454316000,
            inputValue: 0.0203,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101523',
            creationTime: 1575588238000,
            inputValue: 0.0196,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101072',
            creationTime: 1562886404000,
            inputValue: 0.0222,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100815',
            creationTime: 1556834055000,
            inputValue: 0.0185,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100555',
            creationTime: 1548800036000,
            inputValue: 0.0137,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101305',
            creationTime: 1569315186000,
            inputValue: 0.0204,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101076',
            creationTime: 1562944091000,
            inputValue: 0.0123,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101038',
            creationTime: 1562146912000,
            inputValue: 0.0138,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101403',
            creationTime: 1572411133000,
            inputValue: 0.0144,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101093',
            creationTime: 1563463872000,
            inputValue: 0.0156,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101422',
            creationTime: 1573303464000,
            inputValue: 0.0168,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101475',
            creationTime: 1574503382000,
            inputValue: 0.0167,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101420',
            creationTime: 1573248192000,
            inputValue: 0.014,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100972',
            creationTime: 1560377476000,
            inputValue: 0.0149,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101622',
            creationTime: 1578033452000,
            inputValue: 0.0287,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101526',
            creationTime: 1575625441000,
            inputValue: 0.0098,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101444',
            creationTime: 1574106811000,
            inputValue: 0.018,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100906',
            creationTime: 1559137680000,
            inputValue: 0.0595,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101516',
            creationTime: 1575486158000,
            inputValue: 0.0197,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100975',
            creationTime: 1561555420000,
            inputValue: 0.0194,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100836',
            creationTime: 1557244744000,
            inputValue: 0.0193,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101320',
            creationTime: 1570212828000,
            inputValue: 0.0137,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101549',
            creationTime: 1576031259000,
            inputValue: 0.0127,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100961',
            creationTime: 1560204590000,
            inputValue: 0.0262,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101316',
            creationTime: 1570167557000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100805',
            creationTime: 1556535999000,
            inputValue: 0.0143,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101084',
            creationTime: 1563218713000,
            inputValue: 0.0279,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101382',
            creationTime: 1572034070000,
            inputValue: 0.0167,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100990',
            creationTime: 1560847248000,
            inputValue: 0.0199,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101201',
            creationTime: 1566287946000,
            inputValue: 0.0181,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101207',
            creationTime: 1566344882000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101033',
            creationTime: 1562096022000,
            inputValue: 0.0146,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100853',
            creationTime: 1557893001000,
            inputValue: 0.0199,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101233',
            creationTime: 1567698277000,
            inputValue: 0.0187,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100937',
            creationTime: 1559655281000,
            inputValue: 0.0291,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101261',
            creationTime: 1568318049000,
            inputValue: 0.0217,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101348',
            creationTime: 1571252706000,
            inputValue: 0.0215,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100503',
            creationTime: 1546594924000,
            inputValue: 0.0202,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100974',
            creationTime: 1560450417000,
            inputValue: 0.0175,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101225',
            creationTime: 1566540481000,
            inputValue: 0.0156,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101370',
            creationTime: 1571839369000,
            inputValue: 0.0267,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100869',
            creationTime: 1558427862000,
            inputValue: 0.0243,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101514',
            creationTime: 1575472245000,
            inputValue: 0.0177,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101023',
            creationTime: 1561555523000,
            inputValue: 0.0296,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100809',
            creationTime: 1556695154000,
            inputValue: 0.0199,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100800',
            creationTime: 1556415371000,
            inputValue: 0.0164,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101511',
            creationTime: 1575427816000,
            inputValue: 0.0183,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100672',
            creationTime: 1552505721000,
            inputValue: 0.0198,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101265',
            creationTime: 1568396912000,
            inputValue: 0.0167,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100589',
            creationTime: 1549665553000,
            inputValue: 0.0226,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101326',
            creationTime: 1570448021000,
            inputValue: 0.0161,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101460',
            creationTime: 1574278632000,
            inputValue: 0.0274,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101304',
            creationTime: 1569357762000,
            inputValue: 0.0233,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100686',
            creationTime: 1552786789000,
            inputValue: 0.0198,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100854',
            creationTime: 1557905853000,
            inputValue: 0.0192,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100871',
            creationTime: 1558462050000,
            inputValue: 0.03,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101019',
            creationTime: 1561491050000,
            inputValue: 0.0123,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100931',
            creationTime: 1559746463000,
            inputValue: 0.0199,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100569',
            creationTime: 1549407984000,
            inputValue: 0.0201,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101600',
            creationTime: 1577463263000,
            inputValue: 0.0482,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100657',
            creationTime: 1552318219000,
            inputValue: 0.0163,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100664',
            creationTime: 1552378961000,
            inputValue: 0.0256,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101319',
            creationTime: 1571286364000,
            inputValue: 0.0144,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100536',
            creationTime: 1547694511000,
            inputValue: 0.0186,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101284',
            creationTime: 1568653845000,
            inputValue: 0.0171,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101301',
            creationTime: 1569230956000,
            inputValue: 0.0219,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100676',
            creationTime: 1552638386000,
            inputValue: 0.0185,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101634',
            creationTime: 1578392336000,
            inputValue: 0.0483,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101245',
            creationTime: 1568095100000,
            inputValue: 0.0177,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101491',
            creationTime: 1574814304000,
            inputValue: 0.0145,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100574',
            creationTime: 1549465657000,
            inputValue: 0.0253,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101342',
            creationTime: 1571083832000,
            inputValue: 0.0188,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100725',
            creationTime: 1554805750000,
            inputValue: 0.0341,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101617',
            creationTime: 1577954418000,
            inputValue: 0.0285,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100917',
            creationTime: 1559591415000,
            inputValue: 0.0158,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101068',
            creationTime: 1562839137000,
            inputValue: 0.038,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100803',
            creationTime: 1556517810000,
            inputValue: 0.0674,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100488',
            creationTime: 1546269650000,
            inputValue: 0.0196,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100708',
            creationTime: 1554170308000,
            inputValue: 0.0189,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100621',
            creationTime: 1550920404000,
            inputValue: 0.0184,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100553',
            creationTime: 1548705925000,
            inputValue: 0.0186,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101237',
            creationTime: 1568007419000,
            inputValue: 0.0132,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100736',
            creationTime: 1554966601000,
            inputValue: 0.0186,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101616',
            creationTime: 1577952152000,
            inputValue: 0.0207,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100949',
            creationTime: 1559857419000,
            inputValue: 0.0247,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100549',
            creationTime: 1548093249000,
            inputValue: 0.0217,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101580',
            creationTime: 1576686268000,
            inputValue: 0.0331,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101363',
            creationTime: 1571453636000,
            inputValue: 0.0143,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101094',
            creationTime: 1563783536000,
            inputValue: 0.0159,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101372',
            creationTime: 1571871067000,
            inputValue: 0.016,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101122',
            creationTime: 1564380452000,
            inputValue: 0.018,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101036',
            creationTime: 1562121908000,
            inputValue: 0.0221,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101062',
            creationTime: 1562605881000,
            inputValue: 0.015,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101016',
            creationTime: 1561470906000,
            inputValue: 0.0123,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101182',
            creationTime: 1565620086000,
            inputValue: 0.0219,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101322',
            creationTime: 1570233685000,
            inputValue: 0.0165,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101392',
            creationTime: 1572129467000,
            inputValue: null,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100886',
            creationTime: 1558655006000,
            inputValue: 0.0307,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101506',
            creationTime: 1575380749000,
            inputValue: 0.0175,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101219',
            creationTime: 1566477130000,
            inputValue: 0.0208,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100957',
            creationTime: 1560148093000,
            inputValue: 0.0317,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100902',
            creationTime: 1559095873000,
            inputValue: 0.0246,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101164',
            creationTime: 1565129863000,
            inputValue: 0.0122,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101145',
            creationTime: 1564686408000,
            inputValue: 0.0173,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100868',
            creationTime: 1558415260000,
            inputValue: 0.0239,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101241',
            creationTime: 1568055196000,
            inputValue: 0.0193,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100715',
            creationTime: 1554418766000,
            inputValue: 0.0127,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100560',
            creationTime: 1549054195000,
            inputValue: 0.0149,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100603',
            creationTime: 1550707712000,
            inputValue: 0.033,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101581',
            creationTime: 1576699980000,
            inputValue: 0.0508,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100673',
            creationTime: 1552512318000,
            inputValue: 0.0275,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101573',
            creationTime: 1576529440000,
            inputValue: 0.0252,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101454',
            creationTime: 1574224379000,
            inputValue: 0.02,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100738',
            creationTime: 1554986594000,
            inputValue: 0.0143,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101487',
            creationTime: 1574752800000,
            inputValue: 0.0154,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101329',
            creationTime: 1570783327000,
            inputValue: 0.0178,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101328',
            creationTime: 1570780569000,
            inputValue: 0.0207,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101047',
            creationTime: 1562205448000,
            inputValue: 0.0235,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101479',
            creationTime: 1574550433000,
            inputValue: 0.0176,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101045',
            creationTime: 1562198788000,
            inputValue: 0.0132,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101116',
            creationTime: 1564150054000,
            inputValue: 0.029,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101252',
            creationTime: 1568159890000,
            inputValue: 0.0181,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100798',
            creationTime: 1556367581000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101197',
            creationTime: 1565877052000,
            inputValue: 0.0194,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101409',
            creationTime: 1572603593000,
            inputValue: 0.0151,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100587',
            creationTime: 1549643101000,
            inputValue: 0.0135,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100764',
            creationTime: 1555679281000,
            inputValue: 0.0168,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101358',
            creationTime: 1571359882000,
            inputValue: 0.0156,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101272',
            creationTime: 1568472946000,
            inputValue: 0.0164,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101521',
            creationTime: 1575529843000,
            inputValue: 0.012,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100761',
            creationTime: 1555625542000,
            inputValue: 0.0099,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100913',
            creationTime: 1559286869000,
            inputValue: 0.028,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100769',
            creationTime: 1555953158000,
            inputValue: 0.0171,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100722',
            creationTime: 1554726636000,
            inputValue: 0.0162,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100938',
            creationTime: 1559716414000,
            inputValue: 0.0206,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101450',
            creationTime: 1574181611000,
            inputValue: 0.018,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100568',
            creationTime: 1549381282000,
            inputValue: 0.0244,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101325',
            creationTime: 1570444112000,
            inputValue: 0.0133,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101149',
            creationTime: 1564739489000,
            inputValue: 0.0205,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101585',
            creationTime: 1576767825000,
            inputValue: 0.0391,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100807',
            creationTime: 1556553268000,
            inputValue: 0.0302,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101351',
            creationTime: 1571269457000,
            inputValue: 0.0161,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101075',
            creationTime: 1562920686000,
            inputValue: 0.0203,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100629',
            creationTime: 1551096635000,
            inputValue: 0.0163,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101469',
            creationTime: 1574391712000,
            inputValue: 0.0175,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101308',
            creationTime: 1569364776000,
            inputValue: 0.0184,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101430',
            creationTime: 1573738178000,
            inputValue: 0.0136,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101360',
            creationTime: 1571388978000,
            inputValue: 0.0134,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101104',
            creationTime: 1563889793000,
            inputValue: 0.0179,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101586',
            creationTime: 1576796324000,
            inputValue: 0.0166,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100992',
            creationTime: 1560912987000,
            inputValue: 0.0218,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100851',
            creationTime: 1557845944000,
            inputValue: 0.0214,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100637',
            creationTime: 1551339779000,
            inputValue: 0.0095,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101221',
            creationTime: 1566499094000,
            inputValue: 0.0198,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101064',
            creationTime: 1562695832000,
            inputValue: 0.0143,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100877',
            creationTime: 1558568047000,
            inputValue: null,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101344',
            creationTime: 1571183645000,
            inputValue: 0.0176,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100683',
            creationTime: 1552695273000,
            inputValue: 0.0284,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101012',
            creationTime: 1561359982000,
            inputValue: 0.0269,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100778',
            creationTime: 1556157396000,
            inputValue: 0.013,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100780',
            creationTime: 1556179998000,
            inputValue: 0.0144,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101587',
            creationTime: 1576798237000,
            inputValue: 0.0219,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101107',
            creationTime: 1563926328000,
            inputValue: 0.0194,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101105',
            creationTime: 1563908401000,
            inputValue: 0.0215,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100601',
            creationTime: 1550668163000,
            inputValue: 0.0235,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101071',
            creationTime: 1562880470000,
            inputValue: 0.0165,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101022',
            creationTime: 1561546773000,
            inputValue: 0.0157,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100512',
            creationTime: 1547056816000,
            inputValue: 0.0211,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101613',
            creationTime: 1577808994000,
            inputValue: 0.0431,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100757',
            creationTime: 1555483944000,
            inputValue: 0.0117,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100779',
            creationTime: 1556158732000,
            inputValue: 0.0172,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100570',
            creationTime: 1549416760000,
            inputValue: 0.0314,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101028',
            creationTime: 1561633162000,
            inputValue: 0.0191,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101125',
            creationTime: 1564410644000,
            inputValue: 0.024,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101459',
            creationTime: 1574279628000,
            inputValue: 0.024,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101196',
            creationTime: 1565861436000,
            inputValue: 0.0224,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100777',
            creationTime: 1556128304000,
            inputValue: 0.0214,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101435',
            creationTime: 1573816693000,
            inputValue: 0.0272,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101381',
            creationTime: 1571988884000,
            inputValue: 0.0088,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101099',
            creationTime: 1563821985000,
            inputValue: 0.0209,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100909',
            creationTime: 1559157246000,
            inputValue: 0.0144,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101247',
            creationTime: 1568112434000,
            inputValue: 0.0187,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101273',
            creationTime: 1568490075000,
            inputValue: 0.0122,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100618',
            creationTime: 1550884141000,
            inputValue: 0.0135,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100584',
            creationTime: 1549609231000,
            inputValue: 0.0316,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101181',
            creationTime: 1565602929000,
            inputValue: 0.0179,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100718',
            creationTime: 1554484837000,
            inputValue: 0.019,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101447',
            creationTime: 1574128231000,
            inputValue: 0.0186,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101288',
            creationTime: 1568689833000,
            inputValue: 0.0128,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100973',
            creationTime: 1560436311000,
            inputValue: 0.051,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101489',
            creationTime: 1574779236000,
            inputValue: 0.0179,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101303',
            creationTime: 1569303991000,
            inputValue: 0.0213,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101296',
            creationTime: 1568796290000,
            inputValue: 0.0139,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100947',
            creationTime: 1559841420000,
            inputValue: 0.0331,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101027',
            creationTime: 1561626853000,
            inputValue: 0.0325,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101400',
            creationTime: 1572323699000,
            inputValue: 0.013,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101141',
            creationTime: 1564647630000,
            inputValue: 0.034,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101517',
            creationTime: 1577380470000,
            inputValue: null,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100640',
            creationTime: 1551371358000,
            inputValue: 0.0196,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100781',
            creationTime: 1556184736000,
            inputValue: 0.0175,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100955',
            creationTime: 1559975183000,
            inputValue: 0.0316,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100767',
            creationTime: 1555914856000,
            inputValue: 0.0091,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100903',
            creationTime: 1559101402000,
            inputValue: 0.0268,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100823',
            creationTime: 1556919241000,
            inputValue: 0.0171,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101249',
            creationTime: 1568128074000,
            inputValue: 0.0186,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101010',
            creationTime: 1561363381000,
            inputValue: 0.0141,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101163',
            creationTime: 1565059617000,
            inputValue: 0.0136,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101006',
            creationTime: 1561057723000,
            inputValue: 0.0227,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101000',
            creationTime: 1561015939000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101080',
            creationTime: 1563186067000,
            inputValue: 0.0174,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101124',
            creationTime: 1564410253000,
            inputValue: 0.0154,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101413',
            creationTime: 1572620472000,
            inputValue: 0.016,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100720',
            creationTime: 1554703034000,
            inputValue: 0.0189,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100499',
            creationTime: 1546551840000,
            inputValue: 0.0262,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101510',
            creationTime: 1575419628000,
            inputValue: 0.0177,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101498',
            creationTime: 1575294451000,
            inputValue: 0.0165,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100758',
            creationTime: 1555481775000,
            inputValue: 0.018,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101240',
            creationTime: 1568042073000,
            inputValue: 0.0214,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101112',
            creationTime: 1563984869000,
            inputValue: 0.0283,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101204',
            creationTime: 1566308566000,
            inputValue: 0.0188,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101341',
            creationTime: 1571081549000,
            inputValue: 0.0197,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101268',
            creationTime: 1568420283000,
            inputValue: 0.0185,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100827',
            creationTime: 1556954919000,
            inputValue: 0.0159,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101214',
            creationTime: 1566426685000,
            inputValue: 0.0147,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101232',
            creationTime: 1567001815000,
            inputValue: 0.0198,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101507',
            creationTime: 1575383345000,
            inputValue: 0.0183,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101388',
            creationTime: 1572096973000,
            inputValue: 0.017,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100928',
            creationTime: 1559415702000,
            inputValue: 0.0294,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100786',
            creationTime: 1556239859000,
            inputValue: 0.0386,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101283',
            creationTime: 1568647880000,
            inputValue: 0.0157,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101619',
            creationTime: 1578012392000,
            inputValue: 0.0324,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100556',
            creationTime: 1548877868000,
            inputValue: 0.0164,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100916',
            creationTime: 1559236822000,
            inputValue: 0.0174,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100825',
            creationTime: 1556939404000,
            inputValue: 0.0163,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101623',
            creationTime: 1578067227000,
            inputValue: 0.0807,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100908',
            creationTime: 1559156062000,
            inputValue: 0.0172,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101609',
            creationTime: 1577755934000,
            inputValue: 0.0128,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100524',
            creationTime: 1547523461000,
            inputValue: 0.023,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101231',
            creationTime: 1566593396000,
            inputValue: 0.0158,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100616',
            creationTime: 1550854050000,
            inputValue: 0.0221,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101067',
            creationTime: 1562823057000,
            inputValue: 0.0119,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100830',
            creationTime: 1557150330000,
            inputValue: 0.0205,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100856',
            creationTime: 1558057152000,
            inputValue: 0.0151,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101117',
            creationTime: 1564149012000,
            inputValue: 0.0207,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101190',
            creationTime: 1565710662000,
            inputValue: 0.0313,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101082',
            creationTime: 1563201486000,
            inputValue: 0.0215,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100687',
            creationTime: 1552889366000,
            inputValue: 0.0386,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101058',
            creationTime: 1562566914000,
            inputValue: 0.0152,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101280',
            creationTime: 1568590043000,
            inputValue: 0.0209,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101496',
            creationTime: 1574868596000,
            inputValue: 0.0192,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101494',
            creationTime: 1574885209000,
            inputValue: 0.0171,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100490',
            creationTime: 1546435226000,
            inputValue: 0.0186,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100706',
            creationTime: 1553891519000,
            inputValue: 0.017,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100861',
            creationTime: 1558138183000,
            inputValue: 0.0214,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101608',
            creationTime: 1577751913000,
            inputValue: 0.0365,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101504',
            creationTime: 1575348846000,
            inputValue: 0.0196,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101223',
            creationTime: 1566517139000,
            inputValue: 0.0189,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101446',
            creationTime: 1574123098000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101198',
            creationTime: 1565895483000,
            inputValue: 0.0163,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101532',
            creationTime: 1575705525000,
            inputValue: 0.0051,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101208',
            creationTime: 1566358402000,
            inputValue: 0.0206,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101113',
            creationTime: 1564093854000,
            inputValue: 0.0233,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100696',
            creationTime: 1552964169000,
            inputValue: 0.0147,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100569',
            creationTime: 1549425813000,
            inputValue: 0.0201,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101525',
            creationTime: 1575590025000,
            inputValue: 0.0175,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100528',
            creationTime: 1547577223000,
            inputValue: 0.0207,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100742',
            creationTime: 1555056049000,
            inputValue: 0.0196,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101100',
            creationTime: 1563844977000,
            inputValue: 0.0192,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101385',
            creationTime: 1572068699000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101330',
            creationTime: 1570824442000,
            inputValue: 0.0209,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101153',
            creationTime: 1564785393000,
            inputValue: 0.0224,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101606',
            creationTime: 1577718472000,
            inputValue: 0.0213,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101024',
            creationTime: 1561562930000,
            inputValue: 0.02,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100749',
            creationTime: 1555310566000,
            inputValue: 0.0204,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100963',
            creationTime: 1560262706000,
            inputValue: 0.0373,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100558',
            creationTime: 1549021402000,
            inputValue: 0.0127,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101565',
            creationTime: 1576291099000,
            inputValue: 0.0722,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100838',
            creationTime: 1557324090000,
            inputValue: 0.019,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100935',
            creationTime: 1559634075000,
            inputValue: 0.0448,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101129',
            creationTime: 1564486892000,
            inputValue: 0.0153,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100538',
            creationTime: 1547717714000,
            inputValue: 0.026,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100857',
            creationTime: 1558074474000,
            inputValue: 0.0288,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100915',
            creationTime: 1559582933000,
            inputValue: 0.0189,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100702',
            creationTime: 1553209825000,
            inputValue: 0.0245,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100828',
            creationTime: 1557122898000,
            inputValue: 0.0154,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100882',
            creationTime: 1558619266000,
            inputValue: 0.0243,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100799',
            creationTime: 1556412313000,
            inputValue: 0.0129,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101004',
            creationTime: 1561037054000,
            inputValue: 0.0157,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100577',
            creationTime: 1549494096000,
            inputValue: 0.0214,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100804',
            creationTime: 1556530623000,
            inputValue: 0.014,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101601',
            creationTime: 1577465087000,
            inputValue: 0.0202,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100497',
            creationTime: 1546530906000,
            inputValue: 0.0218,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100730',
            creationTime: 1554906582000,
            inputValue: 0.02,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101307',
            creationTime: 1569338171000,
            inputValue: 0.0185,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100534',
            creationTime: 1547669727000,
            inputValue: 0.0202,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101206',
            creationTime: 1566337138000,
            inputValue: 0.0168,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100548',
            creationTime: 1548072039000,
            inputValue: 0.0211,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100892',
            creationTime: 1558712147000,
            inputValue: 0.0219,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101555',
            creationTime: 1576167127000,
            inputValue: 0.0209,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100671',
            creationTime: 1552487039000,
            inputValue: 0.0103,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100745',
            creationTime: 1555066651000,
            inputValue: 0.019,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101433',
            creationTime: 1573795931000,
            inputValue: 0.0183,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100918',
            creationTime: 1559672043000,
            inputValue: 0.0209,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101327',
            creationTime: 1570461922000,
            inputValue: 0.0186,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100591',
            creationTime: 1549881087000,
            inputValue: 0.0212,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101074',
            creationTime: 1562906727000,
            inputValue: 0.0246,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101390',
            creationTime: 1572116365000,
            inputValue: 0.0138,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101508',
            creationTime: 1575396433000,
            inputValue: 0.0114,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100597',
            creationTime: 1550218361000,
            inputValue: 0.031,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100668',
            creationTime: 1552464221000,
            inputValue: 0.0194,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101297',
            creationTime: 1568858238000,
            inputValue: 0.0231,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101090',
            creationTime: 1563363258000,
            inputValue: 0.0149,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101172',
            creationTime: 1565227250000,
            inputValue: 0.0191,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101253',
            creationTime: 1568180228000,
            inputValue: 0.0209,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101138',
            creationTime: 1564603644000,
            inputValue: 0.0207,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101383',
            creationTime: 1572050401000,
            inputValue: 0.0082,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100768',
            creationTime: 1555930233000,
            inputValue: 0.0119,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100750',
            creationTime: 1555326455000,
            inputValue: 0.0172,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100772',
            creationTime: 1556028332000,
            inputValue: 0.0155,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100784',
            creationTime: 1556220868000,
            inputValue: 0.0296,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101282',
            creationTime: 1568635148000,
            inputValue: 0.0133,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100787',
            creationTime: 1556244288000,
            inputValue: 0.0287,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101025',
            creationTime: 1561604468000,
            inputValue: 0.0192,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100659',
            creationTime: 1552347415000,
            inputValue: 0.0186,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101098',
            creationTime: 1563820593000,
            inputValue: 0.0149,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101137',
            creationTime: 1564577832000,
            inputValue: 0.0117,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100737',
            creationTime: 1554978296000,
            inputValue: 0.0237,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100575',
            creationTime: 1549476819000,
            inputValue: 0.0202,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101109',
            creationTime: 1563951933000,
            inputValue: 0.0174,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101224',
            creationTime: 1566538358000,
            inputValue: 0.0178,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100775',
            creationTime: 1556086168000,
            inputValue: 0.0116,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100656',
            creationTime: 1552302337000,
            inputValue: 0.0174,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101395',
            creationTime: 1572241324000,
            inputValue: 0.0119,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101230',
            creationTime: 1566590005000,
            inputValue: 0.0183,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101346',
            creationTime: 1571236069000,
            inputValue: 0.019,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100521',
            creationTime: 1547480554000,
            inputValue: 0.0242,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101130',
            creationTime: 1564501643000,
            inputValue: 0.0466,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101594',
            creationTime: 1577390501000,
            inputValue: 0.0529,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100619',
            creationTime: 1550903739000,
            inputValue: 0.0188,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101228',
            creationTime: 1566572934000,
            inputValue: 0.0178,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101389',
            creationTime: 1572102221000,
            inputValue: 0.0167,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101377',
            creationTime: 1571963278000,
            inputValue: 0.0125,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100929',
            creationTime: 1559701751000,
            inputValue: 0.028,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101364',
            creationTime: 1571534760000,
            inputValue: 0.0156,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101442',
            creationTime: 1573918299000,
            inputValue: 0.0264,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101119',
            creationTime: 1564168616000,
            inputValue: 0.0247,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100887',
            creationTime: 1558676577000,
            inputValue: 0.0186,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101332',
            creationTime: 1570819905000,
            inputValue: 0.0209,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101362',
            creationTime: 1571407264000,
            inputValue: 0.0176,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101546',
            creationTime: 1575995644000,
            inputValue: 0.0176,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101537',
            creationTime: 1575889535000,
            inputValue: 0.0063,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101570',
            creationTime: 1576361402000,
            inputValue: 0.02,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100519',
            creationTime: 1547451430000,
            inputValue: 0.0168,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100689',
            creationTime: 1552891922000,
            inputValue: 0.0299,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101079',
            creationTime: 1562989046000,
            inputValue: 0.0193,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100716',
            creationTime: 1554445531000,
            inputValue: 0.0078,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101238',
            creationTime: 1568017732000,
            inputValue: 0.0184,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100666',
            creationTime: 1552443596000,
            inputValue: 0.0117,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101131',
            creationTime: 1564507342000,
            inputValue: 0.0123,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101599',
            creationTime: 1577445180000,
            inputValue: 0.0561,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101499',
            creationTime: 1575294749000,
            inputValue: 0.0187,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101467',
            creationTime: 1574371539000,
            inputValue: 0.014,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100889',
            creationTime: 1558693397000,
            inputValue: 0.0357,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100655',
            creationTime: 1552287189000,
            inputValue: 0.013,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101018',
            creationTime: 1561489349000,
            inputValue: 0.0198,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101449',
            creationTime: 1574150202000,
            inputValue: 0.0168,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101492',
            creationTime: 1574822887000,
            inputValue: 0.0141,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101375',
            creationTime: 1571929316000,
            inputValue: 0.0195,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101384',
            creationTime: 1572054385000,
            inputValue: 0.0116,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100818',
            creationTime: 1556865518000,
            inputValue: 0.0236,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101054',
            creationTime: 1562442582000,
            inputValue: 0.0198,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100658',
            creationTime: 1552320350000,
            inputValue: 0.0171,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100564',
            creationTime: 1549308448000,
            inputValue: 0.0182,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101200',
            creationTime: 1566273102000,
            inputValue: 0.0192,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101154',
            creationTime: 1564783339000,
            inputValue: 0.0128,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101088',
            creationTime: 1563317917000,
            inputValue: 0.0305,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101630',
            creationTime: 1578333842000,
            inputValue: 0.0462,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101110',
            creationTime: 1563966680000,
            inputValue: 0.0385,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101044',
            creationTime: 1562188062000,
            inputValue: 0.0261,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101210',
            creationTime: 1566368680000,
            inputValue: 0.0173,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101277',
            creationTime: 1568527143000,
            inputValue: 0.0159,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100550',
            creationTime: 1548187211000,
            inputValue: 0.0127,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100648',
            creationTime: 1551724879000,
            inputValue: 0.0111,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101092',
            creationTime: 1563432654000,
            inputValue: 0.014,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101292',
            creationTime: 1568735525000,
            inputValue: 0.0161,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101641',
            creationTime: 1578979168000,
            inputValue: 0.0107,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100685',
            creationTime: 1552771885000,
            inputValue: 0.0217,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101378',
            creationTime: 1571972637000,
            inputValue: 0.0146,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100728',
            creationTime: 1554859096000,
            inputValue: 0.0162,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101517',
            creationTime: 1575482050000,
            inputValue: 0.0086,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100994',
            creationTime: 1560926128000,
            inputValue: 0.0233,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101524',
            creationTime: 1575557062000,
            inputValue: 0.0192,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101401',
            creationTime: 1572341199000,
            inputValue: 0.0208,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100795',
            creationTime: 1556347294000,
            inputValue: 0.0184,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100939',
            creationTime: 1559722621000,
            inputValue: 0.0197,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100878',
            creationTime: 1558577003000,
            inputValue: 0.0157,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100959',
            creationTime: 1560180852000,
            inputValue: 0.0206,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100862',
            creationTime: 1558332827000,
            inputValue: 0.0202,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101554',
            creationTime: 1576137531000,
            inputValue: 0.015,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101158',
            creationTime: 1565001866000,
            inputValue: 0.0203,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100638',
            creationTime: 1551341933000,
            inputValue: 0.0158,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101050',
            creationTime: 1562407290000,
            inputValue: 0.0338,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100608',
            creationTime: 1550763020000,
            inputValue: 0.0185,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100613',
            creationTime: 1550820599000,
            inputValue: 0.0222,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100964',
            creationTime: 1560298130000,
            inputValue: 0.0177,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101073',
            creationTime: 1562901185000,
            inputValue: 0.0168,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100945',
            creationTime: 1559824474000,
            inputValue: 0.0228,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101633',
            creationTime: 1578363726000,
            inputValue: 0.0228,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101571',
            creationTime: 1576363399000,
            inputValue: 0.0201,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101575',
            creationTime: 1576627021000,
            inputValue: 0.0226,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101359',
            creationTime: 1571368974000,
            inputValue: 0.016,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100717',
            creationTime: 1554461286000,
            inputValue: 0.0141,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100875',
            creationTime: 1558539507000,
            inputValue: 0.0466,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101120',
            creationTime: 1564186836000,
            inputValue: 0.0196,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101270',
            creationTime: 1568442883000,
            inputValue: 0.0172,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100811',
            creationTime: 1556776717000,
            inputValue: 0.0201,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101387',
            creationTime: 1572085222000,
            inputValue: 0.0174,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100510',
            creationTime: 1547022034000,
            inputValue: 0.0226,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101081',
            creationTime: 1563194924000,
            inputValue: 0.0407,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101465',
            creationTime: 1574347049000,
            inputValue: 0.0163,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100695',
            creationTime: 1552961626000,
            inputValue: 0.0134,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101070',
            creationTime: 1562859926000,
            inputValue: 0.0137,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101551',
            creationTime: 1576045239000,
            inputValue: 0.0095,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101003',
            creationTime: 1561034057000,
            inputValue: 0.0202,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100703',
            creationTime: 1553211425000,
            inputValue: 0.0207,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100774',
            creationTime: 1556062059000,
            inputValue: 0.0152,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100970',
            creationTime: 1560356941000,
            inputValue: 0.0153,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101264',
            creationTime: 1568360878000,
            inputValue: 0.0198,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101440',
            creationTime: 1573895417000,
            inputValue: 0.0178,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101483',
            creationTime: 1574695181000,
            inputValue: 0.0101,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100839',
            creationTime: 1557325345000,
            inputValue: 0.0115,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101607',
            creationTime: 1577720474000,
            inputValue: 0.0504,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101470',
            creationTime: 1574391046000,
            inputValue: 0.0186,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101451',
            creationTime: 1574174884000,
            inputValue: 0.0209,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101017',
            creationTime: 1561469919000,
            inputValue: 0.0303,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101060',
            creationTime: 1562591524000,
            inputValue: 0.0204,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100820',
            creationTime: 1556880953000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100693',
            creationTime: 1552931303000,
            inputValue: 0.0219,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100692',
            creationTime: 1552923938000,
            inputValue: 0.0207,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100733',
            creationTime: 1554967734000,
            inputValue: 0.0141,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101339',
            creationTime: 1570844138000,
            inputValue: 0.016,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101057',
            creationTime: 1562460354000,
            inputValue: 0.0202,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100688',
            creationTime: 1552788267000,
            inputValue: 0.0182,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100623',
            creationTime: 1550937783000,
            inputValue: 0.0193,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101629',
            creationTime: 1578327233000,
            inputValue: 0.0178,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101195',
            creationTime: 1565810009000,
            inputValue: 0.0371,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100579',
            creationTime: 1549510999000,
            inputValue: 0.0232,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101213',
            creationTime: 1566478644000,
            inputValue: 0.02,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100919',
            creationTime: 1559674810000,
            inputValue: 0.0257,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101407',
            creationTime: 1572486976000,
            inputValue: 0.0141,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101437',
            creationTime: 1573855783000,
            inputValue: 0.0176,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101639',
            creationTime: 1578971617000,
            inputValue: 0.0153,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100547',
            creationTime: 1548055835000,
            inputValue: 0.0207,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101426',
            creationTime: 1573669085000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101106',
            creationTime: 1563921080000,
            inputValue: 0.035,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101490',
            creationTime: 1574797781000,
            inputValue: 0.0113,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101632',
            creationTime: 1578343611000,
            inputValue: null,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100796',
            creationTime: 1558355279000,
            inputValue: 0.0187,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100948',
            creationTime: 1559843412000,
            inputValue: 0.0267,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101582',
            creationTime: 1576716235000,
            inputValue: 0.0413,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101564',
            creationTime: 1576273525000,
            inputValue: 0.0337,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100732',
            creationTime: 1554925869000,
            inputValue: 0.0213,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101598',
            creationTime: 1577428144000,
            inputValue: 0.0342,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100615',
            creationTime: 1550851081000,
            inputValue: 0.0202,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100978',
            creationTime: 1560522695000,
            inputValue: 0.0186,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101132',
            creationTime: 1564521912000,
            inputValue: 0.0185,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100643',
            creationTime: 1551442234000,
            inputValue: 0.0158,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100986',
            creationTime: 1560831956000,
            inputValue: 0.0182,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100797',
            creationTime: 1556364570000,
            inputValue: 0.0165,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100694',
            creationTime: 1552938876000,
            inputValue: 0.0202,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100634',
            creationTime: 1551255026000,
            inputValue: 0.0131,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101425',
            creationTime: 1573672161000,
            inputValue: 0.0121,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101572',
            creationTime: 1576525622000,
            inputValue: 0.0478,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100985',
            creationTime: 1560785858000,
            inputValue: 0.015,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100525',
            creationTime: 1547541873000,
            inputValue: 0.0242,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101287',
            creationTime: 1568686557000,
            inputValue: 0.0168,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100622',
            creationTime: 1550934268000,
            inputValue: 0.0174,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100665',
            creationTime: 1552435142000,
            inputValue: 0.0233,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101118',
            creationTime: 1564166714000,
            inputValue: 0.0166,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101175',
            creationTime: 1565293930000,
            inputValue: 0.0168,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101244',
            creationTime: 1568079040000,
            inputValue: 0.019,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101488',
            creationTime: 1574781271000,
            inputValue: 0.0167,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101009',
            creationTime: 1561086234000,
            inputValue: 0.0188,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101034',
            creationTime: 1562104674000,
            inputValue: 0.0214,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101169',
            creationTime: 1565165321000,
            inputValue: 0.0182,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101502',
            creationTime: 1575329124000,
            inputValue: 0.0205,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101139',
            creationTime: 1564631744000,
            inputValue: 0.0191,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101126',
            creationTime: 1564432099000,
            inputValue: 0.0104,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101563',
            creationTime: 1576274983000,
            inputValue: 0.0273,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100691',
            creationTime: 1552912772000,
            inputValue: 0.0211,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100849',
            creationTime: 1557806508000,
            inputValue: 0.0325,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101448',
            creationTime: 1574148029000,
            inputValue: 0.0194,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100520',
            creationTime: 1547453432000,
            inputValue: 0.0249,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100848',
            creationTime: 1557818732000,
            inputValue: 0.0161,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100998',
            creationTime: 1560978577000,
            inputValue: 0.0215,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101162',
            creationTime: 1565045775000,
            inputValue: 0.0159,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101186',
            creationTime: 1565663710000,
            inputValue: 0.0189,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100812',
            creationTime: 1556793602000,
            inputValue: 0.0183,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100737',
            creationTime: 1554982353000,
            inputValue: 0.0237,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101457',
            creationTime: 1574252319000,
            inputValue: 0.0185,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100513',
            creationTime: 1547157202000,
            inputValue: 0.0261,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101518',
            creationTime: 1575507912000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101414',
            creationTime: 1572615535000,
            inputValue: 0.0136,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100951',
            creationTime: 1559859203000,
            inputValue: 0.0231,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100635',
            creationTime: 1551292460000,
            inputValue: 0.0209,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101480',
            creationTime: 1574664034000,
            inputValue: 0.019,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100911',
            creationTime: 1559201198000,
            inputValue: 0.0231,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101471',
            creationTime: 1574412250000,
            inputValue: 0.0217,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101250',
            creationTime: 1568141116000,
            inputValue: 0.0201,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100834',
            creationTime: 1557226479000,
            inputValue: 0.014,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100822',
            creationTime: 1556898194000,
            inputValue: 0.0164,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100611',
            creationTime: 1550802736000,
            inputValue: 0.0276,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101227',
            creationTime: 1566556565000,
            inputValue: 0.013,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101614',
            creationTime: 1577819929000,
            inputValue: 0.0247,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100881',
            creationTime: 1558609613000,
            inputValue: 0.0178,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100562',
            creationTime: 1549074631000,
            inputValue: 0.0173,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101576',
            creationTime: 1576636082000,
            inputValue: 0.0253,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101037',
            creationTime: 1562131230000,
            inputValue: 0.0147,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100760',
            creationTime: 1555502668000,
            inputValue: 0.0166,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101199',
            creationTime: 1566270151000,
            inputValue: 0.0193,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101218',
            creationTime: 1566482597000,
            inputValue: 0.015,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100936',
            creationTime: 1559657291000,
            inputValue: 0.0183,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101302',
            creationTime: 1569236513000,
            inputValue: 0.0219,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100670',
            creationTime: 1552486217000,
            inputValue: 0.0154,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100557',
            creationTime: 1548938936000,
            inputValue: 0.0129,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101165',
            creationTime: 1565131153000,
            inputValue: 0.0171,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101424',
            creationTime: 1573320840000,
            inputValue: 0.0167,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100739',
            creationTime: 1555003470000,
            inputValue: 0.0129,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100864',
            creationTime: 1558349392000,
            inputValue: 0.0304,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101101',
            creationTime: 1563843162000,
            inputValue: 0.0212,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101394',
            creationTime: 1572142297000,
            inputValue: 0.0116,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100943',
            creationTime: 1559808039000,
            inputValue: 0.0173,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101229',
            creationTime: 1566574551000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100895',
            creationTime: 1559026086000,
            inputValue: 0.0183,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100631',
            creationTime: 1551118264000,
            inputValue: 0.0166,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101562',
            creationTime: 1576507495000,
            inputValue: 0.0128,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101640',
            creationTime: 1578977194000,
            inputValue: 0.0139,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100790',
            creationTime: 1556291500000,
            inputValue: 0.0147,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100496',
            creationTime: 1546509019000,
            inputValue: 0.0217,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100494',
            creationTime: 1546473054000,
            inputValue: 0.0181,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100492',
            creationTime: 1546455217000,
            inputValue: 0.0259,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101157',
            creationTime: 1565000212000,
            inputValue: 0.0154,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101402',
            creationTime: 1572388687000,
            inputValue: 0.0209,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101114',
            creationTime: 1564121314000,
            inputValue: 0.0258,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101481',
            creationTime: 1574665994000,
            inputValue: 0.0166,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101203',
            creationTime: 1566313100000,
            inputValue: 0.0189,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101561',
            creationTime: 1576219528000,
            inputValue: 0.0217,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100586',
            creationTime: 1549632868000,
            inputValue: 0.0234,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100968',
            creationTime: 1560337785000,
            inputValue: 0.0157,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100585',
            creationTime: 1549627587000,
            inputValue: 0.0251,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101035',
            creationTime: 1562113712000,
            inputValue: 0.0188,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101547',
            creationTime: 1576012175000,
            inputValue: 0.0172,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100641',
            creationTime: 1551376854000,
            inputValue: 0.0176,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100644',
            creationTime: 1551454267000,
            inputValue: 0.0101,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101588',
            creationTime: 1576882943000,
            inputValue: 0.0284,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101477',
            creationTime: 1574519701000,
            inputValue: 0.0191,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100517',
            creationTime: 1547224330000,
            inputValue: 0.0235,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100620',
            creationTime: 1550907728000,
            inputValue: 0.0107,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101226',
            creationTime: 1566553619000,
            inputValue: 0.0106,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101589',
            creationTime: 1576884673000,
            inputValue: 0.0101,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100858',
            creationTime: 1558077717000,
            inputValue: 0.0207,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101323',
            creationTime: 1570240248000,
            inputValue: 0.018,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100859',
            creationTime: 1558090719000,
            inputValue: 0.0236,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101552',
            creationTime: 1576111995000,
            inputValue: 0.0391,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101379',
            creationTime: 1571983385000,
            inputValue: 0.0123,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100594',
            creationTime: 1549893965000,
            inputValue: 0.0243,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101167',
            creationTime: 1565146482000,
            inputValue: 0.0323,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101123',
            creationTime: 1564382675000,
            inputValue: 0.0129,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101135',
            creationTime: 1564536662000,
            inputValue: 0.017,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101166',
            creationTime: 1565143268000,
            inputValue: 0.0188,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100922',
            creationTime: 1559299169000,
            inputValue: 0.02,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101637',
            creationTime: 1578952160000,
            inputValue: 0.0276,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101569',
            creationTime: 1576331703000,
            inputValue: 0.024,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100876',
            creationTime: 1558549320000,
            inputValue: 0.0197,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101007',
            creationTime: 1561071147000,
            inputValue: 0.0111,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100984',
            creationTime: 1560759327000,
            inputValue: 0.0213,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100651',
            creationTime: 1551792620000,
            inputValue: 0.015,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101222',
            creationTime: 1566519732000,
            inputValue: 0.0198,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100712',
            creationTime: 1554398868000,
            inputValue: 0.0252,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101055',
            creationTime: 1562454412000,
            inputValue: 0.0181,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100874',
            creationTime: 1558523568000,
            inputValue: 0.0198,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101179',
            creationTime: 1565360322000,
            inputValue: 0.0134,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101091',
            creationTime: 1563402676000,
            inputValue: 0.0158,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100950',
            creationTime: 1559873054000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100729',
            creationTime: 1554880279000,
            inputValue: 0.0155,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100832',
            creationTime: 1557209829000,
            inputValue: 0.0125,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100559',
            creationTime: 1549045746000,
            inputValue: 0.015,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101412',
            creationTime: 1572597543000,
            inputValue: 0.0063,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101578',
            creationTime: 1576553523000,
            inputValue: 0.0217,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100552',
            creationTime: 1548699042000,
            inputValue: 0.0159,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100565',
            creationTime: 1549333801000,
            inputValue: 0.0213,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100599',
            creationTime: 1550231951000,
            inputValue: 0.0232,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100526',
            creationTime: 1547543181000,
            inputValue: 0.0143,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101464',
            creationTime: 1574325850000,
            inputValue: 0.0141,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101620',
            creationTime: 1578022622000,
            inputValue: 0.0349,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101568',
            creationTime: 1576330184000,
            inputValue: 0.0373,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101550',
            creationTime: 1576117540000,
            inputValue: 0.015,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101441',
            creationTime: 1573898608000,
            inputValue: 0.017,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101357',
            creationTime: 1571347064000,
            inputValue: 0.0145,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101144',
            creationTime: 1564674411000,
            inputValue: 0.0147,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101527',
            creationTime: 1575643195000,
            inputValue: 0.0177,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101334',
            creationTime: 1571206038000,
            inputValue: 0.0184,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100507',
            creationTime: 1546862677000,
            inputValue: 0.0231,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100751',
            creationTime: 1555341356000,
            inputValue: 0.0187,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101324',
            creationTime: 1570429385000,
            inputValue: 0.0195,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101020',
            creationTime: 1561532060000,
            inputValue: 0.027,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101026',
            creationTime: 1561605594000,
            inputValue: 0.0125,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100731',
            creationTime: 1554923680000,
            inputValue: 0.0215,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100969',
            creationTime: 1560353425000,
            inputValue: 0.0147,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100541',
            creationTime: 1547777476000,
            inputValue: 0.0144,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100502',
            creationTime: 1546574041000,
            inputValue: 0.043,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101262',
            creationTime: 1568343035000,
            inputValue: 0.0253,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100999',
            creationTime: 1560996733000,
            inputValue: 0.0245,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100636',
            creationTime: 1551298188000,
            inputValue: 0.0171,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101559',
            creationTime: 1576205720000,
            inputValue: 0.0259,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101014',
            creationTime: 1561430432000,
            inputValue: 0.0184,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101041',
            creationTime: 1562164038000,
            inputValue: 0.015,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100789',
            creationTime: 1556286368000,
            inputValue: 0.0151,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101557',
            creationTime: 1576186879000,
            inputValue: 0.0123,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100713',
            creationTime: 1554397682000,
            inputValue: 0.0136,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101577',
            creationTime: 1576653476000,
            inputValue: 0.0222,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101434',
            creationTime: 1573805912000,
            inputValue: 0.0173,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101368',
            creationTime: 1571770548000,
            inputValue: 0.0188,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100724',
            creationTime: 1554794606000,
            inputValue: 0.0211,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100792',
            creationTime: 1556307842000,
            inputValue: 0.0187,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101605',
            creationTime: 1577691178000,
            inputValue: 0.0181,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101087',
            creationTime: 1563249724000,
            inputValue: 0.0175,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101299',
            creationTime: 1568890449000,
            inputValue: 0.0181,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100927',
            creationTime: 1559399990000,
            inputValue: 0.0227,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101457',
            creationTime: 1574257454000,
            inputValue: 0.0185,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101281',
            creationTime: 1568620660000,
            inputValue: 0.0064,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100897',
            creationTime: 1559049004000,
            inputValue: 0.0227,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100604',
            creationTime: 1550709645000,
            inputValue: 0.0234,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101236',
            creationTime: 1567731047000,
            inputValue: 0.0171,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101615',
            creationTime: 1577950416000,
            inputValue: 0.0585,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100847',
            creationTime: 1557788436000,
            inputValue: 0.0211,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100905',
            creationTime: 1559123701000,
            inputValue: 0.0226,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101466',
            creationTime: 1574349657000,
            inputValue: 0.0158,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101192',
            creationTime: 1565735152000,
            inputValue: 0.024,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101127',
            creationTime: 1564467009000,
            inputValue: 0.0185,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101013',
            creationTime: 1561428811000,
            inputValue: 0.0185,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100595',
            creationTime: 1549988849000,
            inputValue: 0.0251,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101059',
            creationTime: 1562563851000,
            inputValue: 0.0178,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101271',
            creationTime: 1568472071000,
            inputValue: 0.0178,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101293',
            creationTime: 1568759048000,
            inputValue: 0.0177,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101513',
            creationTime: 1575448173000,
            inputValue: 0.0198,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101591',
            creationTime: 1577351459000,
            inputValue: 0.0211,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101174',
            creationTime: 1565283710000,
            inputValue: 0.0158,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101211',
            creationTime: 1566400243000,
            inputValue: 0.0179,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100759',
            creationTime: 1555498126000,
            inputValue: 0.0172,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101242',
            creationTime: 1568059744000,
            inputValue: 0.0158,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100863',
            creationTime: 1558335512000,
            inputValue: 0.0224,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100645',
            creationTime: 1551463205000,
            inputValue: 0.0216,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101367',
            creationTime: 1571753927000,
            inputValue: 0.0195,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100741',
            creationTime: 1555036394000,
            inputValue: 0.0175,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101177',
            creationTime: 1565331420000,
            inputValue: 0.0179,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100940',
            creationTime: 1559780768000,
            inputValue: 0.0223,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100537',
            creationTime: 1547713124000,
            inputValue: 0.0251,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100814',
            creationTime: 1556830505000,
            inputValue: 0.0183,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100773',
            creationTime: 1556062231000,
            inputValue: 0.0181,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100925',
            creationTime: 1559348527000,
            inputValue: 0.0456,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100614',
            creationTime: 1550824953000,
            inputValue: 0.0118,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101083',
            creationTime: 1563211524000,
            inputValue: 0.0323,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101618',
            creationTime: 1578011500000,
            inputValue: 0.0244,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101530',
            creationTime: 1575683648000,
            inputValue: 0.0166,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100813',
            creationTime: 1556810318000,
            inputValue: 0.0246,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101539',
            creationTime: 1575909375000,
            inputValue: 0.0067,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100982',
            creationTime: 1560623055000,
            inputValue: 0.0179,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101453',
            creationTime: 1574197749000,
            inputValue: 0.0182,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101624',
            creationTime: 1578070490000,
            inputValue: 0.0314,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100610',
            creationTime: 1550780386000,
            inputValue: 0.0362,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101136',
            creationTime: 1564560064000,
            inputValue: 0.023,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101374',
            creationTime: 1571910574000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101482',
            creationTime: 1574694124000,
            inputValue: 0.0124,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100794',
            creationTime: 1556329289000,
            inputValue: 0.021,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101295',
            creationTime: 1568796776000,
            inputValue: 0.0183,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100681',
            creationTime: 1552679821000,
            inputValue: 0.0166,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101143',
            creationTime: 1564668734000,
            inputValue: 0.0189,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101535',
            creationTime: 1575751710000,
            inputValue: 0.02,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101291',
            creationTime: 1568730645000,
            inputValue: 0.0162,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101310',
            creationTime: 1569973619000,
            inputValue: 0.0176,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100581',
            creationTime: 1549546477000,
            inputValue: 0.0225,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101216',
            creationTime: 1566457934000,
            inputValue: 0.0208,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100551',
            creationTime: 1548246049000,
            inputValue: 0.0271,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101391',
            creationTime: 1572126247000,
            inputValue: 0.0159,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101180',
            creationTime: 1565583300000,
            inputValue: 0.0197,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100766',
            creationTime: 1555912989000,
            inputValue: 0.0183,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100573',
            creationTime: 1549445526000,
            inputValue: 0.0168,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101495',
            creationTime: 1575289789000,
            inputValue: 0.0202,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100840',
            creationTime: 1557341193000,
            inputValue: 0.0183,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101108',
            creationTime: 1563940785000,
            inputValue: 0.0247,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100841',
            creationTime: 1557410648000,
            inputValue: 0.0281,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100921',
            creationTime: 1559689382000,
            inputValue: 0.0359,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100607',
            creationTime: 1550761652000,
            inputValue: 0.0139,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100542',
            creationTime: 1547799342000,
            inputValue: 0.0308,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100690',
            creationTime: 1552906708000,
            inputValue: 0.0241,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101627',
            creationTime: 1578299025000,
            inputValue: 0.0207,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101061',
            creationTime: 1562583621000,
            inputValue: 0.0255,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101397',
            creationTime: 1572260616000,
            inputValue: 0.0185,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101635',
            creationTime: 1578382838000,
            inputValue: 0.0173,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101215',
            creationTime: 1566440038000,
            inputValue: 0.0233,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100563',
            creationTime: 1549307900000,
            inputValue: 0.0157,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100954',
            creationTime: 1559977369000,
            inputValue: 0.0168,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101103',
            creationTime: 1563862608000,
            inputValue: 0.0323,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101476',
            creationTime: 1574518404000,
            inputValue: 0.017,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101056',
            creationTime: 1562632249000,
            inputValue: 0.0194,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100491',
            creationTime: 1546433628000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101522',
            creationTime: 1575558567000,
            inputValue: 0.0158,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101541',
            creationTime: 1575935488000,
            inputValue: 0.018,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101256',
            creationTime: 1568253755000,
            inputValue: 0.0176,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101042',
            creationTime: 1562171081000,
            inputValue: 0.0236,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101173',
            creationTime: 1565225937000,
            inputValue: 0.0192,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100980',
            creationTime: 1560558387000,
            inputValue: 0.0136,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101286',
            creationTime: 1568668431000,
            inputValue: 0.0195,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101410',
            creationTime: 1572616416000,
            inputValue: 0.014,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100678',
            creationTime: 1552653558000,
            inputValue: 0.0168,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101152',
            creationTime: 1564755825000,
            inputValue: 0.0146,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100721',
            creationTime: 1554720692000,
            inputValue: 0.0192,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101399',
            creationTime: 1572286203000,
            inputValue: 0.017,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100837',
            creationTime: 1557295996000,
            inputValue: 0.0165,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100899',
            creationTime: 1559065423000,
            inputValue: 0.0161,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101259',
            creationTime: 1568296870000,
            inputValue: 0.0198,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100912',
            creationTime: 1559214212000,
            inputValue: 0.0364,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101593',
            creationTime: 1577374268000,
            inputValue: 0.0106,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101520',
            creationTime: 1575532239000,
            inputValue: 0.0182,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100791',
            creationTime: 1556305321000,
            inputValue: 0.0199,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100755',
            creationTime: 1555452382000,
            inputValue: 0.0223,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100879',
            creationTime: 1558591096000,
            inputValue: 0.0183,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100498',
            creationTime: 1546533364000,
            inputValue: 0.0235,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101142',
            creationTime: 1564649393000,
            inputValue: 0.0239,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101049',
            creationTime: 1562405256000,
            inputValue: 0.0233,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101595',
            creationTime: 1577752287000,
            inputValue: 0.0292,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101612',
            creationTime: 1577807351000,
            inputValue: 0.0202,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101077',
            creationTime: 1562965972000,
            inputValue: 0.0236,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100753',
            creationTime: 1555404652000,
            inputValue: 0.022,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101185',
            creationTime: 1565657738000,
            inputValue: 0.0205,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100617',
            creationTime: 1550890720000,
            inputValue: 0.0132,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101066',
            creationTime: 1562728089000,
            inputValue: 0.015,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100746',
            creationTime: 1555073968000,
            inputValue: 0.0184,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100539',
            creationTime: 1547750528000,
            inputValue: 0.0288,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100944',
            creationTime: 1559813585000,
            inputValue: 0.0232,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101486',
            creationTime: 1574757172000,
            inputValue: 0.019,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101643',
            creationTime: 1578994553000,
            inputValue: 0.017,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100723',
            creationTime: 1554783687000,
            inputValue: 0.016,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100533',
            creationTime: 1547666850000,
            inputValue: 0.0257,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101611',
            creationTime: 1577776788000,
            inputValue: 0.0646,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100833',
            creationTime: 1557208339000,
            inputValue: 0.0193,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101361',
            creationTime: 1571389875000,
            inputValue: 0.0139,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100966',
            creationTime: 1560311788000,
            inputValue: 0.0186,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101156',
            creationTime: 1564984226000,
            inputValue: 0.0257,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101602',
            creationTime: 1577495794000,
            inputValue: 0.0168,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101194',
            creationTime: 1565806201000,
            inputValue: 0.0222,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100514',
            creationTime: 1547172680000,
            inputValue: 0.0162,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100663',
            creationTime: 1552379135000,
            inputValue: 0.0193,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101005',
            creationTime: 1561054436000,
            inputValue: 0.012,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101069',
            creationTime: 1562841954000,
            inputValue: 0.0142,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100697',
            creationTime: 1552979342000,
            inputValue: 0.0177,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101298',
            creationTime: 1568855663000,
            inputValue: 0.0194,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100933',
            creationTime: 1559762122000,
            inputValue: 0.0199,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101647',
            creationTime: 1579039487000,
            inputValue: 0.0129,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101391',
            creationTime: 1572275352000,
            inputValue: 0.0159,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100883',
            creationTime: 1558625399000,
            inputValue: 0.0166,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100824',
            creationTime: 1556936414000,
            inputValue: 0.0235,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100583',
            creationTime: 1549612377000,
            inputValue: 0.0273,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101234',
            creationTime: 1567712559000,
            inputValue: 0.0131,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101294',
            creationTime: 1568776985000,
            inputValue: 0.0196,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101544',
            creationTime: 1575963691000,
            inputValue: 0.0084,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101503',
            creationTime: 1575330965000,
            inputValue: 0.0168,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100865',
            creationTime: 1558360614000,
            inputValue: 0.0193,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101509',
            creationTime: 1575399079000,
            inputValue: 0.0131,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100578',
            creationTime: 1549510330000,
            inputValue: 0.0268,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101404',
            creationTime: 1572427589000,
            inputValue: 0.016,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101484',
            creationTime: 1574724290000,
            inputValue: 0.0171,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101048',
            creationTime: 1562390337000,
            inputValue: 0.0168,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100785',
            creationTime: 1556222583000,
            inputValue: 0.0136,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101567',
            creationTime: 1576317102000,
            inputValue: 0.024,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101279',
            creationTime: 1568598599000,
            inputValue: 0.0194,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100735',
            creationTime: 1554946095000,
            inputValue: 0.0124,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100518',
            creationTime: 1547226369000,
            inputValue: 0.0367,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101220',
            creationTime: 1566496834000,
            inputValue: 0.0183,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101548',
            creationTime: 1576027390000,
            inputValue: 0.0191,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100852',
            creationTime: 1557877188000,
            inputValue: 0.0166,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101146',
            creationTime: 1564698397000,
            inputValue: 0.0211,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100726',
            creationTime: 1554823188000,
            inputValue: 0.0142,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100765',
            creationTime: 1555658389000,
            inputValue: 0.0143,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101625',
            creationTime: 1578093633000,
            inputValue: 0.0135,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100529',
            creationTime: 1547684940000,
            inputValue: 0.022,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101255',
            creationTime: 1568233907000,
            inputValue: 0.0146,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101115',
            creationTime: 1564121398000,
            inputValue: 0.0149,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100810',
            creationTime: 1556729993000,
            inputValue: 0.0162,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100884',
            creationTime: 1558638091000,
            inputValue: 0.0212,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101209',
            creationTime: 1566374106000,
            inputValue: 0.0156,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100711',
            creationTime: 1554192198000,
            inputValue: 0.0192,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100753',
            creationTime: 1555395661000,
            inputValue: 0.022,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101184',
            creationTime: 1565640825000,
            inputValue: 0.0183,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100816',
            creationTime: 1556846132000,
            inputValue: 0.0183,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100923',
            creationTime: 1559330604000,
            inputValue: 0.0221,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101416',
            creationTime: 1572863036000,
            inputValue: 0.008,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100632',
            creationTime: 1551265356000,
            inputValue: 0.0151,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100962',
            creationTime: 1560277790000,
            inputValue: 0.0216,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100633',
            creationTime: 1551255113000,
            inputValue: 0.0243,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100993',
            creationTime: 1560906726000,
            inputValue: 0.0185,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101306',
            creationTime: 1569320928000,
            inputValue: 0.0063,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101528',
            creationTime: 1575626911000,
            inputValue: 0.0191,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100989',
            creationTime: 1560865732000,
            inputValue: 0.0248,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100590',
            creationTime: 1549665274000,
            inputValue: 0.0185,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100588',
            creationTime: 1549653277000,
            inputValue: 0.0249,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100628',
            creationTime: 1551081128000,
            inputValue: 0.0135,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100942',
            creationTime: 1559801469000,
            inputValue: 0.0203,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101468',
            creationTime: 1574370318000,
            inputValue: 0.0144,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100835',
            creationTime: 1557238070000,
            inputValue: 0.0152,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101189',
            creationTime: 1565717011000,
            inputValue: 0.0428,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100987',
            creationTime: 1560832021000,
            inputValue: 0.0171,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101176',
            creationTime: 1565334476000,
            inputValue: 0.0168,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100977',
            creationTime: 1560494086000,
            inputValue: 0.0197,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100647',
            creationTime: 1551706934000,
            inputValue: 0.0155,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100971',
            creationTime: 1560357476000,
            inputValue: 0.0177,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100600',
            creationTime: 1550676787000,
            inputValue: 0.0254,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100624',
            creationTime: 1550950060000,
            inputValue: 0.0244,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101246',
            creationTime: 1568100961000,
            inputValue: 0.0172,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100776',
            creationTime: 1556097462000,
            inputValue: 0.01,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101462',
            creationTime: 1574308284000,
            inputValue: 0.0161,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101030',
            creationTime: 1561706499000,
            inputValue: 0.0169,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101461',
            creationTime: 1574299503000,
            inputValue: 0.0135,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101039',
            creationTime: 1562139081000,
            inputValue: 0.0125,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101597',
            creationTime: 1577441105000,
            inputValue: 0.0207,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101398',
            creationTime: 1572272435000,
            inputValue: 0.0172,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101133',
            creationTime: 1564557282000,
            inputValue: 0.0263,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101312',
            creationTime: 1570011836000,
            inputValue: 0.0207,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101015',
            creationTime: 1561156416000,
            inputValue: 0.0171,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101097',
            creationTime: 1563805116000,
            inputValue: 0.0189,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100680',
            creationTime: 1552673919000,
            inputValue: 0.0142,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100747',
            creationTime: 1555309313000,
            inputValue: 0.0181,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101443',
            creationTime: 1573915574000,
            inputValue: 0.0192,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100627',
            creationTime: 1550975689000,
            inputValue: 0.0156,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100504',
            creationTime: 1546620930000,
            inputValue: 0.0216,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101365',
            creationTime: 1571644381000,
            inputValue: 0.0188,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100675',
            creationTime: 1552531574000,
            inputValue: 0.0228,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100561',
            creationTime: 1549068006000,
            inputValue: 0.0141,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100546',
            creationTime: 1547849031000,
            inputValue: 0.0298,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101603',
            creationTime: 1577494881000,
            inputValue: 0.0101,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100489',
            creationTime: 1546273101000,
            inputValue: 0.0234,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101386',
            creationTime: 1572072157000,
            inputValue: 0.0118,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100888',
            creationTime: 1558678769000,
            inputValue: 0.0252,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101278',
            creationTime: 1568529973000,
            inputValue: 0.0076,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100860',
            creationTime: 1558102718000,
            inputValue: 0.0534,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100625',
            creationTime: 1550960085000,
            inputValue: 0.0187,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101431',
            creationTime: 1573743733000,
            inputValue: 0.0272,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101515',
            creationTime: 1575469527000,
            inputValue: 0.0178,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101161',
            creationTime: 1565043997000,
            inputValue: 0.0193,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101133',
            creationTime: 1564517789000,
            inputValue: null,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101631',
            creationTime: 1578352534000,
            inputValue: 0.0356,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100505',
            creationTime: 1546624392000,
            inputValue: 0.026,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100829',
            creationTime: 1557131464000,
            inputValue: 0.0128,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101584',
            creationTime: 1576744920000,
            inputValue: 0.0208,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101642',
            creationTime: 1578990014000,
            inputValue: 0.0167,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100744',
            creationTime: 1555034579000,
            inputValue: 0.0189,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100976',
            creationTime: 1560476906000,
            inputValue: 0.02,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101338',
            creationTime: 1570839127000,
            inputValue: 0.0207,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101266',
            creationTime: 1568418860000,
            inputValue: 0.0198,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100540',
            creationTime: 1547767603000,
            inputValue: 0.0188,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100523',
            creationTime: 1547522520000,
            inputValue: 0.0248,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101478',
            creationTime: 1574548784000,
            inputValue: 0.0198,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100630',
            creationTime: 1551165422000,
            inputValue: 0.0128,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR100771',
            creationTime: 1556030274000,
            inputValue: 0.025,
            lsl: 0.0,
            usl: 0.2
        },
        {
            objectName: 'JBR101429',
            creationTime: 1573725132000,
            inputValue: 0.0133,
            lsl: 0.0,
            usl: 0.2
        }
    ];

    private readonly analysisData = [
        {
            X_name:
                '40_C1-5-D Backing Plate Thickness2 \n(1.450~1.550mm)_5305759',
            p_value: 4.85e-8,
            df: 1,
            type: 'N',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 40,
            dcr_op_name: 'PBJ_Lamination',
            line_number: 40,
            warning: 'OK'
        },
        {
            X_name:
                '30_C1-5-D Backing Plate Thickness1 \n(1.450~1.550mm)_5305759',
            p_value: 8.07e-7,
            df: 1,
            type: 'N',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 40,
            dcr_op_name: 'PBJ_Lamination',
            line_number: 30,
            warning: 'OK'
        },
        {
            X_name:
                '50_C1-5-D Backing Plate Thickness3 \n(1.450~1.550mm)_5305759',
            p_value: 0.00000863,
            df: 1,
            type: 'N',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 40,
            dcr_op_name: 'PBJ_Lamination',
            line_number: 50,
            warning: 'OK'
        },
        {
            X_name: '20_Blade Lot Number_5305759',
            p_value: 0.009533404,
            df: 9,
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 30,
            dcr_op_name: 'PBJ_Sub Dicing',
            line_number: 50,
            warning: 'OK'
        },
        {
            X_name: '80_C1-5-D FPC Lot Number_5305759',
            p_value: 0.079494066,
            df: 14,
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 40,
            dcr_op_name: 'PBJ_Lamination',
            line_number: 80,
            warning: 'OK'
        },
        {
            X_name: '40_ML1 Lot Number_5305759',
            p_value: 0.088684427,
            df: 16,
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 10,
            dcr_op_name: 'PBJ_Sub Lamination',
            line_number: 40,
            warning: 'OK'
        },
        {
            X_name: '80_C1-5-D DML Lot Number_5305759',
            p_value: 0.105949914,
            df: 26,
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 10,
            dcr_op_name: 'PBJ_Sub Lamination',
            line_number: 80,
            warning: 'OK'
        },
        {
            X_name: '20_ML2 Lot Number_5305759',
            p_value: 0.15961504,
            df: 16,
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 10,
            dcr_op_name: 'PBJ_Sub Lamination',
            line_number: 20,
            warning: 'OK'
        },
        {
            X_name: '90_C1-5-D FPC  Copper Thickness \n(0.057~0.073mm)_5305759',
            p_value: 0.283146791,
            df: 1,
            type: 'N',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 40,
            dcr_op_name: 'PBJ_Lamination',
            line_number: 90,
            warning: 'OK'
        },
        {
            X_name: '60_Blade Life_5305759',
            p_value: 0.336480552,
            df: 123,
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 30,
            dcr_op_name: 'PBJ_Sub Dicing',
            line_number: 60,
            warning: 'OK'
        },
        {
            X_name: '140_JIG Number_5305759',
            p_value: 0.431989329,
            df: 38,
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 40,
            dcr_op_name: 'PBJ_Lamination',
            line_number: 140,
            warning: 'OK'
        },
        {
            X_name:
                '10_<U+539A><U+3055><U+6E2C><U+5B9A><U+5668><U+7BA1><U+7406><U+756A><U+53F7>// measuring instrument management number_5305759',
            p_value: 0.433747052,
            df: 1,
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 10,
            dcr_op_name: 'PBJ_Sub Lamination',
            line_number: 10,
            warning: 'OK'
        },
        {
            X_name: '60_PZT Lot Number_5305759',
            p_value: 0.446682314,
            df: 552,
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 10,
            dcr_op_name: 'PBJ_Sub Lamination',
            line_number: 60,
            warning: 'OK'
        },
        {
            X_name: '50_C1-5-D ML1 Thickness \n(0.180~0.194mm)_5305759',
            p_value: 0.463728384,
            df: 1,
            type: 'N',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 10,
            dcr_op_name: 'PBJ_Sub Lamination',
            line_number: 50,
            warning: 'OK'
        },
        {
            X_name: '30_C1-5-D ML2 Thickness \n(0.143~0.149mm)_5305759',
            p_value: 0.496149411,
            df: 1,
            type: 'N',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 10,
            dcr_op_name: 'PBJ_Sub Lamination',
            line_number: 30,
            warning: 'OK'
        },
        {
            X_name: '140_<U+63A5><U+7740><U+5264><U+9078><U+629E>_5305759',
            p_value: 0.576774241,
            df: 1,
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 10,
            dcr_op_name: 'PBJ_Sub Lamination',
            line_number: 140,
            warning: 'OK'
        },
        {
            X_name: '150_JIG Number_5305759',
            p_value: 0.656192588,
            df: 24,
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 10,
            dcr_op_name: 'PBJ_Sub Lamination',
            line_number: 150,
            warning: 'OK'
        },
        {
            X_name:
                '60_<U+5207><U+6B8B><U+3057><U+91CF>(<U+81EA><U+52D5><U+8A08><U+7B97>) // Z-INDEX (Calculation)_5305759',
            p_value: 0.669692361,
            df: 1,
            type: 'N',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 30,
            dcr_op_name: 'PBJ_Sub Dicing',
            line_number: 60,
            warning: 'OK'
        },
        {
            X_name:
                '70_C1-5-D PZT Thickness \n( <U+76EE><U+5B89><U+5024>:0.263-0.273mm)_5305759',
            p_value: 0.697553931,
            df: 1,
            type: 'N',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 10,
            dcr_op_name: 'PBJ_Sub Lamination',
            line_number: 70,
            warning: 'OK'
        },
        {
            X_name: '150_Lamination<U+52A0><U+5727><U+5B8C><U+4E86>_5305759',
            p_value: 0.806019207,
            df: 1,
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 40,
            dcr_op_name: 'PBJ_Lamination',
            line_number: 150,
            warning: 'OK'
        },
        {
            X_name:
                '80_<U+5207><U+6B8B><U+3057><U+91CF>(<U+81EA><U+52D5><U+8A08><U+7B97>) // Z-INDEX (Calculation)_5305759',
            p_value: 0.808685027,
            df: 1,
            type: 'N',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 30,
            dcr_op_name: 'PBJ_Sub Dicing',
            line_number: 80,
            warning: 'OK'
        },
        {
            X_name:
                '90_C1-5-D DML Thickness \n(<U+76EE><U+5B89><U+5024>: 0.196~0.204mm)_5305759',
            p_value: 0.826143299,
            df: 1,
            type: 'N',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 10,
            dcr_op_name: 'PBJ_Sub Lamination',
            line_number: 90,
            warning: 'OK'
        },
        {
            X_name: '100_<U+90E8><U+6750><U+6D17><U+6D44>_5305759',
            p_value: '',
            df: '',
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 10,
            dcr_op_name: 'PBJ_Sub Lamination',
            line_number: 100,
            warning:
                'contrasts can be applied only to factors with 2 or more levels'
        },
        {
            X_name:
                '110_<U+30D7><U+30E9><U+30BA><U+30DE><U+51E6><U+7406>_<U+7D2B><U+5916><U+7DDA><U+30B7><U+30FC><U+30EB><U+306E><U+8272><U+78BA><U+8A8D>_5305759',
            p_value: '',
            df: '',
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 10,
            dcr_op_name: 'PBJ_Sub Lamination',
            line_number: 110,
            warning:
                'contrasts can be applied only to factors with 2 or more levels'
        },
        {
            X_name:
                '120_<U+30D7><U+30E9><U+30A4><U+30DE><U+30FC><U+51E6><U+7406>_5305759',
            p_value: '',
            df: '',
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 10,
            dcr_op_name: 'PBJ_Sub Lamination',
            line_number: 120,
            warning:
                'contrasts can be applied only to factors with 2 or more levels'
        },
        {
            X_name:
                '130_<U+5727><U+529B><U+30C1><U+30A7><U+30C3><U+30AF>_5305759',
            p_value: '',
            df: '',
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 10,
            dcr_op_name: 'PBJ_Sub Lamination',
            line_number: 130,
            warning:
                'contrasts can be applied only to factors with 2 or more levels'
        },
        {
            X_name:
                '160_Sub Lamination<U+52A0><U+5727><U+5B8C><U+4E86>_5305759',
            p_value: '',
            df: '',
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 10,
            dcr_op_name: 'PBJ_Sub Lamination',
            line_number: 160,
            warning:
                'contrasts can be applied only to factors with 2 or more levels'
        },
        {
            X_name:
                '170_<U+30BF><U+30A4><U+30DE><U+30FC>0%<U+3001><U+6E29><U+5EA6>35<U+5EA6><U+4EE5><U+4E0B><U+78BA><U+8A8D>_5305759',
            p_value: '',
            df: '',
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 10,
            dcr_op_name: 'PBJ_Sub Lamination',
            line_number: 170,
            warning:
                'contrasts can be applied only to factors with 2 or more levels'
        },
        {
            X_name:
                '180_Sub Lamination<U+4F5C><U+696D><U+5B8C><U+4E86><U+78BA><U+8A8D> // Lamination JIG Set_5305759',
            p_value: '',
            df: '',
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 10,
            dcr_op_name: 'PBJ_Sub Lamination',
            line_number: 180,
            warning:
                'contrasts can be applied only to factors with 2 or more levels'
        },
        {
            X_name:
                '10_<U+4E0D><U+5177><U+5408><U+6709><U+7121><U+306E><U+78BA><U+8A8D> // Outer Inspection_5305759',
            p_value: '',
            df: '',
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 20,
            dcr_op_name: 'PBJ_Sub Trimming',
            line_number: 10,
            warning:
                'contrasts can be applied only to factors with 2 or more levels'
        },
        {
            X_name:
                '20_Sub Trimming<U+4F5C><U+696D><U+5B8C><U+4E86><U+78BA><U+8A8D>_5305759',
            p_value: '',
            df: '',
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 20,
            dcr_op_name: 'PBJ_Sub Trimming',
            line_number: 20,
            warning:
                'contrasts can be applied only to factors with 2 or more levels'
        },
        {
            X_name:
                '30_<U+30DE><U+30B9><U+30AD><U+30F3><U+30B0><U+30C6><U+30FC><U+30D7><U+78BA><U+8A8D> // Film presence_5305759',
            p_value: '',
            df: '',
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 20,
            dcr_op_name: 'PBJ_Sub Trimming',
            line_number: 30,
            warning:
                'contrasts can be applied only to factors with 2 or more levels'
        },
        {
            X_name:
                '40_<U+30C6><U+30FC><U+30D7><U+539A><U+3055>=0.04 // Constant for the transducer (Tape Thickness)_5305759',
            p_value: '',
            df: 599,
            type: 'N',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 20,
            dcr_op_name: 'PBJ_Sub Trimming',
            line_number: 40,
            warning: 'OK'
        },
        {
            X_name:
                '50_PZT<U+5207><U+8FBC><U+307F><U+91CF>=0.045 // Constant for the transducer (PZT Cut Depth)_5305759',
            p_value: '',
            df: 599,
            type: 'N',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 20,
            dcr_op_name: 'PBJ_Sub Trimming',
            line_number: 50,
            warning: 'OK'
        },
        {
            X_name:
                '10_<U+4E0D><U+5177><U+5408><U+6709><U+7121><U+306E><U+78BA><U+8A8D> // Outer Inspection_5305759',
            p_value: '',
            df: '',
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 30,
            dcr_op_name: 'PBJ_Sub Dicing',
            line_number: 10,
            warning:
                'contrasts can be applied only to factors with 2 or more levels'
        },
        {
            X_name:
                '20_<U+30DE><U+30B9><U+30AD><U+30F3><U+30B0><U+30C6><U+30FC><U+30D7><U+78BA><U+8A8D> // Film presence_5305759',
            p_value: '',
            df: '',
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 30,
            dcr_op_name: 'PBJ_Sub Dicing',
            line_number: 20,
            warning:
                'contrasts can be applied only to factors with 2 or more levels'
        },
        {
            X_name: '30_Dicing JIG Number_5305759',
            p_value: '',
            df: '',
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 30,
            dcr_op_name: 'PBJ_Sub Dicing',
            line_number: 30,
            warning:
                'contrasts can be applied only to factors with 2 or more levels'
        },
        {
            X_name: '40_Dicing Machine Number_5305759',
            p_value: '',
            df: '',
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 30,
            dcr_op_name: 'PBJ_Sub Dicing',
            line_number: 40,
            warning:
                'contrasts can be applied only to factors with 2 or more levels'
        },
        {
            X_name:
                '50_<U+30D0><U+30AD><U+30E5><U+30FC><U+30E0><U+30E1><U+30FC><U+30BF><U+30FC><U+304C><U+7DD1><U+306E><U+30BE><U+30FC><U+30F3><U+306B><U+3042><U+308B><U+3053><U+3068><U+3092><U+78BA><U+8A8D> // Vacuum meter is green zone_5305759',
            p_value: '',
            df: '',
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 30,
            dcr_op_name: 'PBJ_Sub Dicing',
            line_number: 50,
            warning:
                'contrasts can be applied only to factors with 2 or more levels'
        },
        {
            X_name:
                '70_<U+30D0><U+30AD><U+30E5><U+30FC><U+30E0><U+30E1><U+30FC><U+30BF><U+30FC><U+304C><U+7DD1><U+306E><U+30BE><U+30FC><U+30F3><U+306B><U+3042><U+308B><U+3053><U+3068><U+3092><U+78BA><U+8A8D> // Vacuum meter is green zone_5305759',
            p_value: '',
            df: '',
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 30,
            dcr_op_name: 'PBJ_Sub Dicing',
            line_number: 70,
            warning:
                'contrasts can be applied only to factors with 2 or more levels'
        },
        {
            X_name:
                '70_<U+9001><U+308A><U+5E45> // Cut Pitch Main (11.65mm)_5305759',
            p_value: '',
            df: 318,
            type: 'N',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 30,
            dcr_op_name: 'PBJ_Sub Dicing',
            line_number: 70,
            warning: 'OK'
        },
        {
            X_name:
                '80_Dicing<U+4F5C><U+696D><U+78BA><U+8A8D> // Start dice_5305759',
            p_value: '',
            df: '',
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 30,
            dcr_op_name: 'PBJ_Sub Dicing',
            line_number: 80,
            warning:
                'contrasts can be applied only to factors with 2 or more levels'
        },
        {
            X_name:
                '90_Dicing Machine<U+304B><U+3089>XDCR<U+3092><U+53D6><U+308A><U+5916><U+3057> // Remove the Xdcr from Dicing Machine_5305759',
            p_value: '',
            df: '',
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 30,
            dcr_op_name: 'PBJ_Sub Dicing',
            line_number: 90,
            warning:
                'contrasts can be applied only to factors with 2 or more levels'
        },
        {
            X_name:
                '90_<U+9001><U+308A><U+5E45> // Cut Pitch Main (11.65mm)_5305759',
            p_value: '',
            df: 295,
            type: 'N',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 30,
            dcr_op_name: 'PBJ_Sub Dicing',
            line_number: 90,
            warning: 'OK'
        },
        {
            X_name:
                '100_Dicing<U+4F5C><U+696D><U+78BA><U+8A8D> // Start dice_5305759',
            p_value: '',
            df: '',
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 30,
            dcr_op_name: 'PBJ_Sub Dicing',
            line_number: 100,
            warning:
                'contrasts can be applied only to factors with 2 or more levels'
        },
        {
            X_name:
                '100_<U+4E0D><U+5177><U+5408><U+6709><U+7121><U+306E><U+78BA><U+8A8D> // Outer Inspection_5305759',
            p_value: '',
            df: '',
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 30,
            dcr_op_name: 'PBJ_Sub Dicing',
            line_number: 100,
            warning:
                'contrasts can be applied only to factors with 2 or more levels'
        },
        {
            X_name:
                '110_Dicing Machine<U+304B><U+3089>XDCR<U+3092><U+53D6><U+308A><U+5916><U+3057> // Remove the Xdcr from Dicing Machine_5305759',
            p_value: '',
            df: '',
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 30,
            dcr_op_name: 'PBJ_Sub Dicing',
            line_number: 110,
            warning:
                'contrasts can be applied only to factors with 2 or more levels'
        },
        {
            X_name:
                '110_<U+6574><U+5408><U+5C64><U+5916><U+5F62><U+4FEE><U+6B63><U+4F5C><U+696D><U+5B8C><U+4E86><U+306E><U+78BA><U+8A8D> // Confirmation of completion of Trimming_5305759',
            p_value: '',
            df: '',
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 30,
            dcr_op_name: 'PBJ_Sub Dicing',
            line_number: 110,
            warning:
                'contrasts can be applied only to factors with 2 or more levels'
        },
        {
            X_name:
                '120_<U+4E0D><U+5177><U+5408><U+6709><U+7121><U+306E><U+78BA><U+8A8D> // Outer Inspection_5305759',
            p_value: '',
            df: '',
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 30,
            dcr_op_name: 'PBJ_Sub Dicing',
            line_number: 120,
            warning:
                'contrasts can be applied only to factors with 2 or more levels'
        },
        {
            X_name:
                '130_<U+6574><U+5408><U+5C64><U+5916><U+5F62><U+4FEE><U+6B63><U+4F5C><U+696D><U+5B8C><U+4E86><U+306E><U+78BA><U+8A8D> // Confirmation of completion of Trimming_5305759',
            p_value: '',
            df: '',
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 30,
            dcr_op_name: 'PBJ_Sub Dicing',
            line_number: 130,
            warning:
                'contrasts can be applied only to factors with 2 or more levels'
        },
        {
            X_name:
                '10_<U+4E0D><U+5177><U+5408><U+6709><U+7121><U+306E><U+78BA><U+8A8D> // Outer Inspection_5305759',
            p_value: '',
            df: '',
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 40,
            dcr_op_name: 'PBJ_Lamination',
            line_number: 10,
            warning:
                'contrasts can be applied only to factors with 2 or more levels'
        },
        {
            X_name:
                '20_<U+539A><U+3055><U+6E2C><U+5B9A><U+5668><U+7BA1><U+7406><U+756A><U+53F7>// measuring instrument management number_5305759',
            p_value: '',
            df: '',
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 40,
            dcr_op_name: 'PBJ_Lamination',
            line_number: 20,
            warning:
                'contrasts can be applied only to factors with 2 or more levels'
        },
        {
            X_name:
                '60_C1-5-D Backing Plate Thickness MAX-MIN \n(<U+2266>0.005mm)_5305759',
            p_value: '',
            df: '',
            type: 'N',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 40,
            dcr_op_name: 'PBJ_Lamination',
            line_number: 60,
            warning:
                'the response appeared on the right-hand side and was dropped'
        },
        {
            X_name: '70_C1-5-D FPC<U+30E1><U+30FC><U+30AB><U+30FC>_5305759',
            p_value: '',
            df: '',
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 40,
            dcr_op_name: 'PBJ_Lamination',
            line_number: 70,
            warning:
                'contrasts can be applied only to factors with 2 or more levels'
        },
        {
            X_name: '100_<U+90E8><U+6750><U+6D17><U+6D44>_5305759',
            p_value: '',
            df: '',
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 40,
            dcr_op_name: 'PBJ_Lamination',
            line_number: 100,
            warning:
                'contrasts can be applied only to factors with 2 or more levels'
        },
        {
            X_name:
                '110_<U+30D7><U+30E9><U+30A4><U+30DE><U+30FC><U+51E6><U+7406>_5305759',
            p_value: '',
            df: '',
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 40,
            dcr_op_name: 'PBJ_Lamination',
            line_number: 110,
            warning:
                'contrasts can be applied only to factors with 2 or more levels'
        },
        {
            X_name:
                '120_<U+5727><U+529B><U+30C1><U+30A7><U+30C3><U+30AF>_5305759',
            p_value: '',
            df: '',
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 40,
            dcr_op_name: 'PBJ_Lamination',
            line_number: 120,
            warning:
                'contrasts can be applied only to factors with 2 or more levels'
        },
        {
            X_name: '130_<U+63A5><U+7740><U+5264><U+9078><U+629E>_5305759',
            p_value: '',
            df: '',
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 40,
            dcr_op_name: 'PBJ_Lamination',
            line_number: 130,
            warning:
                'contrasts can be applied only to factors with 2 or more levels'
        },
        {
            X_name:
                '160_<U+30BF><U+30A4><U+30DE><U+30FC>0%<U+3001><U+6E29><U+5EA6>35<U+5EA6><U+4EE5><U+4E0B><U+78BA><U+8A8D>_5305759',
            p_value: '',
            df: '',
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 40,
            dcr_op_name: 'PBJ_Lamination',
            line_number: 160,
            warning:
                'contrasts can be applied only to factors with 2 or more levels'
        },
        {
            X_name:
                '170_Lamination<U+4F5C><U+696D><U+5B8C><U+4E86><U+78BA><U+8A8D> // Lamination JIG Set_5305759',
            p_value: '',
            df: '',
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 40,
            dcr_op_name: 'PBJ_Lamination',
            line_number: 170,
            warning:
                'contrasts can be applied only to factors with 2 or more levels'
        },
        {
            X_name:
                '10_<U+4E0D><U+5177><U+5408><U+6709><U+7121><U+306E><U+78BA><U+8A8D> // Outer Inspection_5305759',
            p_value: '',
            df: '',
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 50,
            dcr_op_name: 'PBJ_Trimming',
            line_number: 10,
            warning:
                'contrasts can be applied only to factors with 2 or more levels'
        },
        {
            X_name:
                '10_<U+4E0D><U+5177><U+5408><U+6709><U+7121><U+306E><U+78BA><U+8A8D> // Outer Inspection_5305759',
            p_value: '',
            df: '',
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 60,
            dcr_op_name: 'PBJ_Dicing Set',
            line_number: 10,
            warning:
                'contrasts can be applied only to factors with 2 or more levels'
        },
        {
            X_name:
                '10_<U+4E0D><U+5177><U+5408><U+6709><U+7121><U+306E><U+78BA><U+8A8D> // Outer Inspection_5305759',
            p_value: '',
            df: '',
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 70,
            dcr_op_name: 'PBJ_Dicing',
            line_number: 10,
            warning:
                'contrasts can be applied only to factors with 2 or more levels'
        },
        {
            X_name:
                '10_<U+4E0D><U+5177><U+5408><U+6709><U+7121><U+306E><U+78BA><U+8A8D> // Outer Inspection_5305759',
            p_value: '',
            df: '',
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 80,
            dcr_op_name: 'PBJ_Bending',
            line_number: 10,
            warning:
                'contrasts can be applied only to factors with 2 or more levels'
        },
        {
            X_name:
                '10_<U+4E0D><U+5177><U+5408><U+6709><U+7121><U+306E><U+78BA><U+8A8D> // Outer Inspection_5305759',
            p_value: '',
            df: '',
            type: 'C',
            dcr_route_name: 'PBJ_C1-5-D Transducer Route',
            route_step_name: 90,
            dcr_op_name: 'PBJ_Capacitance Check',
            line_number: 10,
            warning:
                'contrasts can be applied only to factors with 2 or more levels'
        }
    ];

    private readonly pairwiseNumCatData = [
        [1.513, 'CNB594494178'],
        [1.516, 'CNB594494178'],
        [1.514, 'CNB594494178'],
        [1.511, 'CNB594494178'],
        [1.514, 'CNB594494178'],
        [1.509, 'CNB594494179'],
        [1.51, 'CNB594494179'],
        [1.518, 'CNB594494179'],
        [1.514, 'CNB594494179'],
        [1.513, 'CNB594494179'],
        [1.514, 'CNB594494179'],
        [1.516, 'CNB594494179'],
        [1.515, 'CNB594494179'],
        [1.518, 'CNB594494179'],
        [1.513, 'CNB594494179'],
        [1.516, 'CNB594494179'],
        [1.518, 'CNB594494179'],
        [1.511, 'CNB594494180'],
        [1.513, 'CNB594494180'],
        [1.511, 'CNB594494180'],
        [1.516, 'CNB594494180'],
        [1.511, 'CNB594494180'],
        [1.513, 'CNB594494180'],
        [1.518, 'CNB594494180'],
        [1.512, 'CNB594494180'],
        [1.516, 'CNB594494180'],
        [1.512, 'CNB594494180'],
        [1.515, 'CNB594494180'],
        [1.509, 'CNB594494180'],
        [1.514, 'CNB594491125'],
        [1.513, 'CNB594491125'],
        [1.509, 'CNB594491125'],
        [1.511, 'CNB594491125'],
        [1.513, 'CNB594491125'],
        [1.512, 'CNB594491125'],
        [1.513, 'CNB594491125'],
        [1.512, 'CNB594491125'],
        [1.516, 'CNB594491125'],
        [1.514, 'CNB594491125'],
        [1.515, 'CNB594491125'],
        [1.502, 'CNB594491125'],
        [1.51, 'CNB594491126'],
        [1.511, 'CNB594491126'],
        [1.509, 'CNB594491126'],
        [1.514, 'CNB594491126'],
        [1.509, 'CNB594491126'],
        [1.505, 'CNB594491126'],
        [1.514, 'CNB594491126'],
        [1.515, 'CNB594491126'],
        [1.516, 'CNB594491126'],
        [1.509, 'CNB594491126'],
        [1.513, 'CNB594491126'],
        [1.508, 'CNB594491126'],
        [1.516, 'CNB594491127'],
        [1.503, 'CNB594491127'],
        [1.515, 'CNB594491127'],
        [1.51, 'CNB594491127'],
        [1.51, 'CNB594491127'],
        [1.51, 'CNB594491127'],
        [1.51, 'CNB594491127'],
        [1.509, 'CNB594491127'],
        [1.511, 'CNB594491127'],
        [1.514, 'CNB594491127'],
        [1.512, 'CNB594491127'],
        [1.512, 'CNB594491127'],
        [1.509, 'CNB594494181'],
        [1.514, 'CNB594494181'],
        [1.508, 'CNB594494181'],
        [1.515, 'CNB594494181'],
        [1.51, 'CNB594494181'],
        [1.511, 'CNB594494181'],
        [1.51, 'CNB594494181'],
        [1.511, 'CNB594494181'],
        [1.516, 'CNB594494181'],
        [1.511, 'CNB594494181'],
        [1.511, 'CNB594494181'],
        [1.51, 'CNB594494181'],
        [1.511, 'CNB594494182'],
        [1.506, 'CNB594494182'],
        [1.51, 'CNB594494182'],
        [1.507, 'CNB594494182'],
        [1.511, 'CNB594494182'],
        [1.508, 'CNB594494182'],
        [1.511, 'CNB594494182'],
        [1.514, 'CNB594494182'],
        [1.512, 'CNB594494182'],
        [1.512, 'CNB594494182'],
        [1.515, 'CNB594494182'],
        [1.51, 'CNB594494182'],
        [1.51, 'CNA594489080'],
        [1.515, 'CNA594489080'],
        [1.513, 'CNA594489080'],
        [1.512, 'CNA594489080'],
        [1.512, 'CNA594489080'],
        [1.511, 'CNA594489080'],
        [1.511, 'CNA594489080'],
        [1.515, 'CNA594489080'],
        [1.517, 'CNA594489080'],
        [1.509, 'CNA594489080'],
        [1.512, 'CNA594489080'],
        [1.514, 'CNA594489080'],
        [1.514, 'CNA594489081'],
        [1.513, 'CNA594489081'],
        [1.518, 'CNA594489081'],
        [1.511, 'CNB594494183'],
        [1.517, 'CNB594494183'],
        [1.512, 'CNB594494183'],
        [1.512, 'CNB594494183'],
        [1.513, 'CNB594494183'],
        [1.512, 'CNB594494183'],
        [1.513, 'CNB594494183'],
        [1.513, 'CNB594494183'],
        [1.516, 'CNA594489081'],
        [1.514, 'CNA594489081'],
        [1.513, 'CNA594489081'],
        [1.512, 'CNA594489081'],
        [1.516, 'CNA594489081'],
        [1.514, 'CNA594489081'],
        [1.508, 'CNA594489081'],
        [1.511, 'CNA594489081'],
        [1.513, 'CNA594489081'],
        [1.511, 'CNA594489082'],
        [1.513, 'CNA594489082'],
        [1.51, 'CNA594489082'],
        [1.507, 'CNA594489082'],
        [1.516, 'CNA594489082'],
        [1.507, 'CNA594489082'],
        [1.516, 'CNB594494183'],
        [1.512, 'CNB594494183'],
        [1.509, 'CNB594494183'],
        [1.51, 'CNB594494183'],
        [1.512, 'CNA594489082'],
        [1.513, 'CNA594489082'],
        [1.512, 'CNA594489082'],
        [1.519, 'CNA594489082'],
        [1.516, 'CNA594489082'],
        [1.517, 'CNA594489082'],
        [1.516, 'CNB594491117'],
        [1.514, 'CNB594491117'],
        [1.515, 'CNB594491117'],
        [1.517, 'CNB594491117'],
        [1.51, 'CNB594491117'],
        [1.515, 'CNB594491117'],
        [1.514, 'CNB594491117'],
        [1.51, 'CNB594491117'],
        [1.514, 'CNB594491117'],
        [1.515, 'CNB594491117'],
        [1.517, 'CNB594491117'],
        [1.515, 'CNB594491117'],
        [1.519, 'CNB594491118'],
        [1.516, 'CNB594491118'],
        [1.511, 'CNB594491118'],
        [1.517, 'CNB594491118'],
        [1.514, 'CNB594491118'],
        [1.519, 'CNB594491118'],
        [1.513, 'CNB594491118'],
        [1.516, 'CNB594491118'],
        [1.51, 'CNB594491118'],
        [1.514, 'CNB594491118'],
        [1.512, 'CNB594491118'],
        [1.51, 'CNB594491118'],
        [1.515, 'CNB594491119'],
        [1.506, 'CNB594491119'],
        [1.515, 'CNB594491119'],
        [1.515, 'CNB594491119'],
        [1.504, 'CNB594491119'],
        [1.511, 'CNB594491119'],
        [1.516, 'CNB594491119'],
        [1.506, 'CNB594491119'],
        [1.513, 'CNB594491119'],
        [1.508, 'CNB594491119'],
        [1.513, 'CNB594491119'],
        [1.519, 'CNB594491119'],
        [1.51, 'CNB594494184'],
        [1.51, 'CNB594494184'],
        [1.508, 'CNB594494184'],
        [1.512, 'CNB594494184'],
        [1.513, 'CNB594494184'],
        [1.513, 'CNB594494184'],
        [1.516, 'CNB594494184'],
        [1.507, 'CNB594494184'],
        [1.512, 'CNB594494184'],
        [1.523, 'CNB594494184'],
        [1.513, 'CNB594494184'],
        [1.512, 'CNB594494184'],
        [1.508, 'CNB594494185'],
        [1.512, 'CNB594494185'],
        [1.519, 'CNB594494185'],
        [1.51, 'CNB594494185'],
        [1.517, 'CNB594494185'],
        [1.511, 'CNB594494185'],
        [1.512, 'CNB594494185'],
        [1.512, 'CNB594494185'],
        [1.513, 'CNB594494185'],
        [1.512, 'CNB594494185'],
        [1.515, 'CNB594494185'],
        [1.527, 'CNB594494185'],
        [1.519, 'CNB594494186'],
        [1.513, 'CNB594494186'],
        [1.514, ''],
        [1.51, ''],
        [1.512, ''],
        [1.512, ''],
        [1.511, ''],
        [1.517, ''],
        [1.511, ''],
        [1.512, ''],
        [1.514, ''],
        [1.511, ''],
        [1.518, ''],
        [1.513, ''],
        [1.507, ''],
        [1.511, ''],
        [1.512, ''],
        [1.512, ''],
        [1.517, ''],
        [1.515, ''],
        [1.515, ''],
        [1.514, ''],
        [1.516, ''],
        [1.517, ''],
        [1.513, ''],
        [1.516, ''],
        [1.508, ''],
        [1.506, ''],
        [1.516, ''],
        [1.511, ''],
        [1.512, ''],
        [1.518, ''],
        [1.513, ''],
        [1.517, ''],
        [1.512, ''],
        [1.518, ''],
        [1.514, ''],
        [1.51, ''],
        [1.512, ''],
        [1.51, ''],
        [1.515, ''],
        [1.515, ''],
        [1.519, ''],
        [1.514, ''],
        [1.512, ''],
        [1.516, ''],
        [1.512, ''],
        [1.507, ''],
        [1.511, ''],
        [1.511, ''],
        [1.515, ''],
        [1.511, ''],
        [1.51, ''],
        [1.504, ''],
        [1.513, ''],
        [1.515, ''],
        [1.511, ''],
        [1.506, ''],
        [1.513, ''],
        [1.508, ''],
        [1.513, ''],
        [1.512, ''],
        [1.51, ''],
        [1.509, ''],
        [1.508, ''],
        [1.514, ''],
        [1.512, ''],
        [1.513, ''],
        [1.515, ''],
        [1.512, 'CNB594493176'],
        [1.508, 'CNB594493176'],
        [1.506, 'CNB594493176'],
        [1.508, 'CNB594493176'],
        [1.511, 'CNB594493176'],
        [1.514, 'CNB594493176'],
        [1.513, 'CNB594493176'],
        [1.516, 'CNB594493176'],
        [1.511, 'CNB594493176'],
        [1.509, 'CNB594494177'],
        [1.508, 'CNB594494177'],
        [1.514, 'CNB594494177'],
        [1.514, 'CNB594494177'],
        [1.512, 'CNB594494177'],
        [1.515, 'CNB594494177'],
        [1.51, 'CNB594494177'],
        [1.513, 'CNB594494177'],
        [1.514, 'CNB594494177'],
        [1.511, 'CNB594494177'],
        [1.513, 'CNB594494177'],
        [1.512, 'CNB594494177'],
        [1.512, 'CNB594494178'],
        [1.515, 'CNB594494178'],
        [1.512, 'CNB594494178'],
        [1.511, 'CNB594494178'],
        [1.51, 'CNB594494178'],
        [null, ''],
        [1.513, 'CNB594494186'],
        [1.511, 'CNB594494186'],
        [1.516, 'CNB594494186'],
        [1.513, 'CNB594494186'],
        [1.507, 'CNB594494186'],
        [1.519, 'CNB594494186'],
        [1.509, 'CNB594494186'],
        [1.512, 'CNB594494186'],
        [1.512, 'CNB594494186'],
        [1.516, 'CNB594494186'],
        [1.52, 'CNB594491111'],
        [1.513, 'CNB594491111'],
        [1.515, 'CNB594491111'],
        [1.513, 'CNB594491111'],
        [1.505, 'CNB594491111'],
        [1.509, 'CNB594491111'],
        [1.512, 'CNB594491111'],
        [1.513, 'CNB594491111'],
        [1.505, 'CNB594491111'],
        [1.501, 'CNB594491111'],
        [1.517, 'CNB594491111'],
        [1.507, 'CNB594491111'],
        [1.517, 'CNB594491112'],
        [1.516, 'CNB594491112'],
        [1.517, 'CNB594491112'],
        [1.523, 'CNB594491112'],
        [1.51, 'CNB594491112'],
        [1.516, 'CNB594491112'],
        [1.51, 'CNB594491112'],
        [1.513, 'CNB594491112'],
        [1.511, 'CNB594491112'],
        [1.514, 'CNB594491112'],
        [1.509, 'CNB594491112'],
        [1.515, 'CNB594491112'],
        [1.516, 'CNB594491113'],
        [1.517, 'CNB594491113'],
        [1.512, 'CNB594491113'],
        [1.522, 'CNB594491113'],
        [1.513, 'CNB594491113'],
        [1.517, 'CNB594491113'],
        [1.529, 'CNB594491113'],
        [1.504, 'CNB594491113'],
        [1.519, 'CNB594491113'],
        [1.511, 'CNB594491113'],
        [1.524, 'CNB594491113'],
        [1.513, 'CNB594491113'],
        [1.523, 'CNC594404351'],
        [1.514, 'CNC594404351'],
        [1.516, 'CNC594404351'],
        [1.515, 'CNC594404351'],
        [1.527, 'CNC594404351'],
        [1.51, 'CNC594404351'],
        [1.515, 'CNC594404351'],
        [1.508, 'CNC594404351'],
        [1.503, 'CNC594404351'],
        [1.513, 'CNC594404351'],
        [1.502, 'CNC594404351'],
        [1.506, 'CNC594404351'],
        [1.513, 'CNC594404353'],
        [1.508, 'CNC594404353'],
        [1.505, 'CNC594404353'],
        [1.511, 'CNC594404353'],
        [1.515, 'CNC594404353'],
        [1.504, 'CNC594404353'],
        [1.515, 'CNC594404353'],
        [1.51, 'CNC594404353'],
        [1.503, 'CNC594404353'],
        [1.507, 'CNC594404353'],
        [1.51, ''],
        [1.52, ''],
        [1.511, ''],
        [1.507, ''],
        [1.5, ''],
        [1.504, ''],
        [1.506, ''],
        [1.509, ''],
        [1.504, ''],
        [1.507, ''],
        [1.517, ''],
        [1.506, ''],
        [1.523, ''],
        [1.506, ''],
        [1.512, ''],
        [1.52, ''],
        [1.499, ''],
        [1.509, ''],
        [1.516, ''],
        [1.518, ''],
        [1.506, ''],
        [1.521, ''],
        [1.518, ''],
        [1.514, ''],
        [1.504, ''],
        [1.521, ''],
        [1.513, ''],
        [1.52, ''],
        [1.519, ''],
        [1.511, ''],
        [1.519, ''],
        [1.515, ''],
        [1.522, ''],
        [1.519, ''],
        [1.519, ''],
        [1.521, ''],
        [1.508, ''],
        [1.517, ''],
        [1.514, ''],
        [1.516, ''],
        [1.524, ''],
        [null, ''],
        [1.518, ''],
        [1.519, ''],
        [1.522, ''],
        [1.51, ''],
        [1.523, ''],
        [1.518, ''],
        [1.514, ''],
        [1.515, ''],
        [1.522, ''],
        [1.515, '955871'],
        [1.525, '955871'],
        [1.511, '955871'],
        [1.516, '955871'],
        [1.52, '955871'],
        [1.512, '955871'],
        [1.52, '955871'],
        [1.517, '955871'],
        [1.519, '955871'],
        [1.517, '955871'],
        [1.508, '955871'],
        [1.522, '955871'],
        [1.51, '955871'],
        [1.519, '955871'],
        [1.505, '955871'],
        [1.512, '955871'],
        [1.508, '955871'],
        [1.519, '955871'],
        [1.511, '955871'],
        [1.512, '955871'],
        [1.508, '955871'],
        [1.521, '955871'],
        [1.504, '955871'],
        [1.504, '955871'],
        [1.511, '955871'],
        [1.517, '955871'],
        [1.512, '955871'],
        [1.524, '955871'],
        [1.516, '955871'],
        [1.523, '955871'],
        [1.526, '955871'],
        [1.519, '955871'],
        [1.504, '955871'],
        [1.523, '955871'],
        [1.507, '955871'],
        [1.509, '955871'],
        [1.507, '955871'],
        [1.52, '955871'],
        [1.517, '955871'],
        [1.507, '955871'],
        [1.507, '955871'],
        [1.513, '955871'],
        [1.509, '955871'],
        [1.52, '955871'],
        [1.519, '955871'],
        [1.509, '955871'],
        [1.514, '955871'],
        [1.515, '955871'],
        [1.514, '955871'],
        [1.512, '955871'],
        [1.507, '955871'],
        [1.514, '955871'],
        [1.505, '955871'],
        [1.511, '955871'],
        [1.511, '955871'],
        [1.512, '955871'],
        [1.511, '955871'],
        [1.509, '955871'],
        [1.507, '955871'],
        [1.513, '955871'],
        [1.506, '955871'],
        [1.515, '955871'],
        [1.508, '955871'],
        [1.508, '955871'],
        [1.51, '955871'],
        [1.511, '955871'],
        [1.51, '955871'],
        [1.519, '955871'],
        [1.51, '955871'],
        [1.516, '955871'],
        [1.505, '955871'],
        [1.508, '955871'],
        [1.512, '955871'],
        [1.515, '955871'],
        [1.511, '955871'],
        [1.505, '955871'],
        [1.511, '955871'],
        [1.509, '955871'],
        [1.512, '955871'],
        [1.514, '955871'],
        [1.509, '955871'],
        [1.511, '955871'],
        [1.512, '955871'],
        [1.505, '955871'],
        [1.507, '955871'],
        [1.516, '955871'],
        [1.507, '955871'],
        [1.505, '955871'],
        [1.512, '955871'],
        [1.514, '955871'],
        [1.511, '955871'],
        [1.51, '955871'],
        [1.504, '955871'],
        [1.509, '955871'],
        [1.505, '955871'],
        [1.509, '955871'],
        [1.511, '955871'],
        [1.511, '955871'],
        [1.511, '955871'],
        [1.509, '955871'],
        [1.53, '955871'],
        [1.52, '955871'],
        [1.515, '955871'],
        [1.513, '955871'],
        [1.515, '955871'],
        [1.51, '955871'],
        [1.51, '955871'],
        [1.508, '955871'],
        [1.503, '955871'],
        [1.513, '955871'],
        [1.514, '955871'],
        [1.517, '955871'],
        [1.516, '955871'],
        [1.517, '955871'],
        [1.515, '955871'],
        [1.52, '955871'],
        [1.506, '955871'],
        [1.519, '955871'],
        [1.512, '955871'],
        [1.513, '955871'],
        [1.526, '955871'],
        [1.514, '955871'],
        [1.509, '955871'],
        [1.522, '955871'],
        [1.518, '955871'],
        [1.524, '955871'],
        [1.516, '955871'],
        [1.516, '955871'],
        [1.512, '955871'],
        [1.517, '955871'],
        [1.517, '955871'],
        [1.516, '955871'],
        [1.52, '955871'],
        [1.506, '955871'],
        [1.506, '955871'],
        [1.515, '955871'],
        [1.512, '955871'],
        [1.514, '955871'],
        [1.51, '955871'],
        [1.522, '955871'],
        [1.509, '955871'],
        [1.513, '955871'],
        [1.52, '955871'],
        [1.512, '955871'],
        [1.515, '955871'],
        [1.514, '955871'],
        [1.514, '955871'],
        [1.514, '955871'],
        [1.515, '955871'],
        [1.516, '955871'],
        [1.517, '955872'],
        [1.516, '955872'],
        [null, '955872'],
        [1.525, '955872'],
        [1.511, '955872'],
        [1.515, '955872'],
        [1.522, '955872'],
        [1.525, '955872'],
        [1.51, '955872'],
        [1.516, '955872'],
        [1.52, '955872'],
        [1.52, '955872'],
        [1.507, '955872'],
        [1.522, '955872'],
        [1.511, '955872'],
        [1.519, '955871'],
        [1.516, '955871'],
        [1.515, '955871'],
        [1.519, '955871'],
        [1.511, '955871'],
        [1.517, '955871'],
        [1.512, '955871'],
        [1.524, '955871'],
        [1.518, '955871'],
        [1.523, '955871'],
        [1.515, '955871'],
        [1.522, '955871'],
        [1.523, '955871'],
        [1.517, '955871'],
        [1.517, '955871'],
        [1.517, '955871'],
        [1.519, '955871'],
        [1.512, '955871'],
        [1.517, '955872'],
        [1.513, '955872'],
        [1.512, '955872'],
        [1.517, '955872'],
        [1.506, '955872'],
        [1.505, '955872'],
        [1.504, '955872'],
        [1.509, '955872'],
        [1.523, '955872'],
        [1.515, '955872'],
        [1.521, '955872'],
        [1.513, '955872'],
        [1.512, '955872'],
        [1.514, '955872'],
        [1.512, '955872'],
        [1.524, '955872'],
        [1.513, '955872'],
        [1.516, '955872'],
        [1.516, '955872'],
        [1.52, '955872'],
        [1.514, '955872'],
        [1.519, '955872'],
        [1.515, '955872'],
        [1.511, '955872'],
        [1.519, '955872'],
        [1.514, '955872'],
        [1.525, '955872'],
        [1.516, '955872'],
        [1.519, '955872'],
        [1.52, '955872'],
        [1.513, '955872'],
        [1.512, '955872'],
        [1.517, '955872'],
        [1.511, '955872'],
        [1.513, '955872'],
        [1.523, '955872'],
        [1.513, '955872'],
        [1.522, '955872'],
        [1.519, '955872'],
        [1.52, '955872'],
        [1.513, '955872'],
        [1.516, '955872'],
        [1.516, '955872'],
        [1.519, '955872'],
        [1.507, '955872'],
        [1.516, '955872'],
        [1.524, '955872'],
        [1.511, '955872'],
        [1.517, '955872'],
        [1.521, '955872'],
        [1.512, '955872'],
        [1.513, '955872'],
        [1.512, '955872'],
        [1.513, '955872'],
        [1.51, '955872'],
        [1.516, '955872'],
        [1.518, '955872'],
        [1.514, '955872'],
        [1.517, '955872'],
        [1.519, '955872'],
        [1.517, '955872'],
        [1.508, '955872'],
        [1.512, '955872'],
        [1.517, '955872'],
        [1.521, '955872'],
        [1.514, '955872'],
        [1.518, '955872'],
        [1.504, '955872'],
        [1.517, '955872'],
        [1.514, '955872'],
        [1.517, '955872'],
        [1.516, '955872'],
        [1.52, '955872'],
        [1.514, '955872'],
        [1.505, '955872'],
        [1.518, '955872'],
        [1.518, '955872'],
        [1.515, '955872'],
        [1.517, '955872']
    ];

    private readonly pairwiseCatNumData = [
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', 1.509],
        ['1.DP460 Off-White', 1.517],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.516],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.508],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', 1.516],
        ['1.DP460 Off-White', 1.516],
        ['1.DP460 Off-White', 1.516],
        ['1.DP460 Off-White', 1.516],
        ['1.DP460 Off-White', 1.516],
        ['1.DP460 Off-White', 1.518],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.507],
        ['1.DP460 Off-White', 1.516],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.518],
        ['1.DP460 Off-White', 1.509],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.51],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.509],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.51],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', 1.502],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.51],
        ['1.DP460 Off-White', 1.51],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.51],
        ['1.DP460 Off-White', 1.507],
        ['1.DP460 Off-White', 1.516],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.509],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.508],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.502],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.508],
        ['1.DP460 Off-White', 1.507],
        ['1.DP460 Off-White', 1.506],
        ['1.DP460 Off-White', 1.509],
        ['1.DP460 Off-White', 1.506],
        ['1.DP460 Off-White', 1.509],
        ['1.DP460 Off-White', 1.517],
        ['1.DP460 Off-White', 1.51],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.509],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.508],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.51],
        ['1.DP460 Off-White', 1.509],
        ['1.DP460 Off-White', 1.509],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.508],
        ['1.DP460 Off-White', 1.51],
        ['1.DP460 Off-White', 1.509],
        ['1.DP460 Off-White', 1.508],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.508],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.51],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.51],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.516],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.516],
        ['1.DP460 Off-White', 1.517],
        ['1.DP460 Off-White', 1.508],
        ['1.DP460 Off-White', 1.509],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.518],
        ['1.DP460 Off-White', 1.509],
        ['1.DP460 Off-White', 1.517],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.516],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.518],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', 1.517],
        ['1.DP460 Off-White', 1.507],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.51],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.51],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.51],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.517],
        ['1.DP460 Off-White', 1.517],
        ['1.DP460 Off-White', 1.521],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.517],
        ['1.DP460 Off-White', 1.509],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.517],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.52],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', 1.51],
        ['1.DP460 Off-White', 1.516],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.519],
        ['1.DP460 Off-White', 1.508],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.51],
        ['1.DP460 Off-White', 1.508],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', 1.504],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.504],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.506],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.507],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.52],
        ['1.DP460 Off-White', 1.507],
        ['1.DP460 Off-White', 1.509],
        ['1.DP460 Off-White', 1.506],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.516],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.517],
        ['1.DP460 Off-White', 1.51],
        ['1.DP460 Off-White', 1.508],
        ['1.DP460 Off-White', 1.524],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.51],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.517],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.519],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', 1.52],
        ['1.DP460 Off-White', 1.519],
        ['1.DP460 Off-White', 1.513],
        ['', 1.517],
        ['', 1.511],
        ['', 1.513],
        ['', 1.513],
        ['', 1.513],
        ['', 1.517],
        ['', 1.512],
        ['', 1.511],
        ['', 1.514],
        ['', 1.51],
        ['', 1.516],
        ['', 1.513],
        ['A', 1.508],
        ['A', 1.511],
        ['A', 1.51],
        ['A', 1.51],
        ['A', 1.518],
        ['A', 1.517],
        ['A', 1.513],
        ['A', 1.514],
        ['B', 1.515],
        ['B', 1.517],
        ['B', 1.516],
        ['B', 1.517],
        ['B', 1.507],
        ['B', 1.506],
        ['B', 1.516],
        ['', 1.508],
        ['', 1.513],
        ['', 1.515],
        ['', 1.511],
        ['', 1.516],
        ['', 1.512],
        ['', 1.515],
        ['', 1.512],
        ['', 1.511],
        ['', 1.512],
        ['', 1.51],
        ['', 1.513],
        ['', 1.516],
        ['', 1.516],
        ['', 1.513],
        ['', 1.511],
        ['', 1.514],
        ['', 1.515],
        ['', 1.507],
        ['', 1.51],
        ['', 1.514],
        ['', 1.515],
        ['', 1.51],
        ['', 1.51],
        ['', 1.505],
        ['', 1.515],
        ['', 1.513],
        ['', 1.51],
        ['', 1.507],
        ['', 1.513],
        ['', 1.508],
        ['', 1.51],
        ['', 1.512],
        ['', 1.51],
        ['', 1.508],
        ['', 1.51],
        ['', 1.513],
        ['', 1.511],
        ['', 1.514],
        ['', 1.514],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.51],
        ['1.DP460 Off-White', 1.506],
        ['1.DP460 Off-White', 1.504],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.51],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.508],
        ['1.DP460 Off-White', 1.507],
        ['1.DP460 Off-White', 1.506],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.51],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.51],
        ['', null],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.517],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.507],
        ['1.DP460 Off-White', 1.519],
        ['1.DP460 Off-White', 1.51],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.518],
        ['1.DP460 Off-White', 1.516],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', 1.507],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.505],
        ['1.DP460 Off-White', 1.503],
        ['1.DP460 Off-White', 1.518],
        ['1.DP460 Off-White', 1.51],
        ['1.DP460 Off-White', 1.516],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', 1.519],
        ['1.DP460 Off-White', 1.523],
        ['1.DP460 Off-White', 1.509],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', 1.51],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.508],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.517],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.517],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.519],
        ['1.DP460 Off-White', 1.525],
        ['1.DP460 Off-White', 1.508],
        ['1.DP460 Off-White', 1.518],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.523],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.521],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.517],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.526],
        ['1.DP460 Off-White', 1.508],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', 1.504],
        ['1.DP460 Off-White', 1.502],
        ['1.DP460 Off-White', 1.509],
        ['1.DP460 Off-White', 1.503],
        ['1.DP460 Off-White', 1.504],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.507],
        ['1.DP460 Off-White', 1.508],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.502],
        ['1.DP460 Off-White', 1.517],
        ['1.DP460 Off-White', 1.51],
        ['1.DP460 Off-White', 1.502],
        ['1.DP460 Off-White', 1.508],
        ['', 1.506],
        ['', 1.521],
        ['', 1.512],
        ['', 1.509],
        ['', 1.5],
        ['', 1.505],
        ['', 1.507],
        ['', 1.507],
        ['', 1.505],
        ['', 1.507],
        ['', 1.519],
        ['', 1.507],
        ['', 1.524],
        ['', 1.503],
        ['', 1.51],
        ['', 1.516],
        ['', 1.5],
        ['', 1.507],
        ['', 1.513],
        ['', 1.517],
        ['', 1.503],
        ['', 1.52],
        ['', 1.516],
        ['', 1.517],
        ['', 1.504],
        ['', 1.519],
        ['', 1.514],
        ['', 1.519],
        ['', 1.52],
        ['', 1.512],
        ['', 1.52],
        ['', 1.514],
        ['', 1.518],
        ['', 1.519],
        ['', 1.517],
        ['', 1.518],
        ['', 1.509],
        ['', 1.516],
        ['', 1.513],
        ['', 1.517],
        ['', 1.525],
        ['', null],
        ['', 1.515],
        ['', 1.519],
        ['', 1.518],
        ['', 1.512],
        ['1.DP460 Off-White', 1.526],
        ['1.DP460 Off-White', 1.517],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.523],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.522],
        ['1.DP460 Off-White', 1.51],
        ['1.DP460 Off-White', 1.516],
        ['1.DP460 Off-White', 1.521],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.521],
        ['1.DP460 Off-White', 1.517],
        ['1.DP460 Off-White', 1.517],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.507],
        ['1.DP460 Off-White', 1.522],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.521],
        ['1.DP460 Off-White', 1.505],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.508],
        ['1.DP460 Off-White', 1.517],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.509],
        ['1.DP460 Off-White', 1.523],
        ['1.DP460 Off-White', 1.505],
        ['1.DP460 Off-White', 1.502],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.52],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.526],
        ['1.DP460 Off-White', 1.517],
        ['1.DP460 Off-White', 1.522],
        ['1.DP460 Off-White', 1.526],
        ['1.DP460 Off-White', 1.52],
        ['1.DP460 Off-White', 1.504],
        ['1.DP460 Off-White', 1.526],
        ['1.DP460 Off-White', 1.509],
        ['1.DP460 Off-White', 1.506],
        ['1.DP460 Off-White', 1.507],
        ['1.DP460 Off-White', 1.519],
        ['1.DP460 Off-White', 1.517],
        ['1.DP460 Off-White', 1.508],
        ['1.DP460 Off-White', 1.507],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.522],
        ['1.DP460 Off-White', 1.52],
        ['1.DP460 Off-White', 1.508],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.505],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.507],
        ['1.DP460 Off-White', 1.51],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.509],
        ['1.DP460 Off-White', 1.507],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.507],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.509],
        ['2.DP460 EG', 1.506],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.51],
        ['1.DP460 Off-White', 1.51],
        ['1.DP460 Off-White', 1.518],
        ['1.DP460 Off-White', 1.506],
        ['1.DP460 Off-White', 1.518],
        ['1.DP460 Off-White', 1.509],
        ['1.DP460 Off-White', 1.509],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', 1.51],
        ['1.DP460 Off-White', 1.504],
        ['1.DP460 Off-White', 1.509],
        ['1.DP460 Off-White', 1.51],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.516],
        ['1.DP460 Off-White', 1.508],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.508],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', 1.506],
        ['1.DP460 Off-White', 1.507],
        ['1.DP460 Off-White', 1.507],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.507],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.505],
        ['1.DP460 Off-White', 1.506],
        ['1.DP460 Off-White', 1.505],
        ['1.DP460 Off-White', 1.509],
        ['1.DP460 Off-White', 1.51],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.509],
        ['1.DP460 Off-White', 1.51],
        ['1.DP460 Off-White', 1.53],
        ['1.DP460 Off-White', 1.52],
        ['1.DP460 Off-White', 1.517],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', 1.509],
        ['1.DP460 Off-White', 1.51],
        ['1.DP460 Off-White', 1.504],
        ['1.DP460 Off-White', 1.504],
        ['1.DP460 Off-White', 1.517],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.517],
        ['1.DP460 Off-White', 1.518],
        ['1.DP460 Off-White', 1.517],
        ['1.DP460 Off-White', 1.516],
        ['1.DP460 Off-White', 1.519],
        ['1.DP460 Off-White', 1.506],
        ['1.DP460 Off-White', 1.519],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', 1.527],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.52],
        ['1.DP460 Off-White', 1.518],
        ['1.DP460 Off-White', 1.526],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.518],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.521],
        ['1.DP460 Off-White', 1.52],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', 1.516],
        ['1.DP460 Off-White', 1.505],
        ['1.DP460 Off-White', 1.507],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.51],
        ['1.DP460 Off-White', 1.519],
        ['1.DP460 Off-White', 1.509],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.518],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.517],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.516],
        ['1.DP460 Off-White', 1.516],
        ['1.DP460 Off-White', 1.517],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', null],
        ['1.DP460 Off-White', 1.523],
        ['1.DP460 Off-White', 1.509],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.52],
        ['1.DP460 Off-White', 1.523],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.516],
        ['1.DP460 Off-White', 1.52],
        ['1.DP460 Off-White', 1.522],
        ['1.DP460 Off-White', 1.506],
        ['1.DP460 Off-White', 1.519],
        ['1.DP460 Off-White', 1.508],
        ['1.DP460 Off-White', 1.521],
        ['1.DP460 Off-White', 1.517],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', 1.517],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.521],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.525],
        ['1.DP460 Off-White', 1.517],
        ['1.DP460 Off-White', 1.523],
        ['1.DP460 Off-White', 1.525],
        ['1.DP460 Off-White', 1.517],
        ['1.DP460 Off-White', 1.518],
        ['1.DP460 Off-White', 1.518],
        ['1.DP460 Off-White', 1.519],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.51],
        ['1.DP460 Off-White', 1.518],
        ['1.DP460 Off-White', 1.508],
        ['1.DP460 Off-White', 1.507],
        ['1.DP460 Off-White', 1.508],
        ['1.DP460 Off-White', 1.51],
        ['1.DP460 Off-White', 1.521],
        ['1.DP460 Off-White', 1.516],
        ['1.DP460 Off-White', 1.518],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.516],
        ['1.DP460 Off-White', 1.509],
        ['1.DP460 Off-White', 1.523],
        ['1.DP460 Off-White', 1.511],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.52],
        ['1.DP460 Off-White', 1.52],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', 1.52],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.518],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.526],
        ['1.DP460 Off-White', 1.517],
        ['1.DP460 Off-White', 1.518],
        ['1.DP460 Off-White', 1.519],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.52],
        ['1.DP460 Off-White', 1.51],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.521],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.522],
        ['1.DP460 Off-White', 1.521],
        ['1.DP460 Off-White', 1.52],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.517],
        ['1.DP460 Off-White', 1.513],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', 1.505],
        ['1.DP460 Off-White', 1.516],
        ['1.DP460 Off-White', 1.523],
        ['1.DP460 Off-White', 1.51],
        ['1.DP460 Off-White', 1.518],
        ['1.DP460 Off-White', 1.521],
        ['1.DP460 Off-White', 1.509],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.507],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.516],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.518],
        ['1.DP460 Off-White', 1.518],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', 1.506],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.515],
        ['1.DP460 Off-White', 1.52],
        ['1.DP460 Off-White', 1.514],
        ['1.DP460 Off-White', 1.517],
        ['1.DP460 Off-White', 1.505],
        ['1.DP460 Off-White', 1.516],
        ['1.DP460 Off-White', 1.512],
        ['1.DP460 Off-White', 1.519],
        ['1.DP460 Off-White', 1.516],
        ['1.DP460 Off-White', 1.517],
        ['1.DP460 Off-White', 1.516],
        ['1.DP460 Off-White', 1.503],
        ['1.DP460 Off-White', 1.522],
        ['1.DP460 Off-White', 1.518],
        ['1.DP460 Off-White', 1.516],
        ['1.DP460 Off-White', 1.521]
    ];

    private readonly pairwiseCatCatData = [
        ['PBJ-200886', 'CNB594494178'],
        ['PBJ-200886', 'CNB594494178'],
        ['PBJ-200886', 'CNB594494178'],
        ['PBJ-200886', 'CNB594494178'],
        ['PBJ-200886', 'CNB594494178'],
        ['PBJ-200886', 'CNB594494178'],
        ['PBJ-200886', 'CNB594494178'],
        ['PBJ-200886', 'CNB594494178'],
        ['PBJ-200886', 'CNB594494178'],
        ['PBJ-200886', 'CNB594494178'],
        ['PBJ-200886', 'CNB594494178'],
        ['PBJ-200886', 'CNB594494178'],
        ['PBJ-200886', 'CNB594494178'],
        ['PBJ-200886', 'CNB594494178'],
        ['PBJ-200886', 'CNB594494178'],
        ['PBJ-200886', 'CNB594494178'],
        ['PBJ-200886', 'CNB594494178'],
        ['PBJ-200886', 'CNB594494178'],
        ['PBJ-200886', 'CNB594494178'],
        ['PBJ-200886', 'CNB594494178'],
        ['PBJ-200886', 'CNB594494178'],
        ['PBJ-200886', 'CNB594494178'],
        ['PBJ-200886', 'CNB594494178'],
        ['PBJ-200886', 'CNB594494178'],
        ['PBJ-200886', 'CNB594494178'],

        ['PBJ-200886', 'CNB594494178'],
        ['PBJ-200886', 'CNB594494178'],
        ['PBJ-200886', 'CNB594494178'],
        ['PBJ-200886', 'CNB594494178'],
        ['PBJ-200886', 'CNB594494179'],
        ['PBJ-200886', 'CNB594494179'],
        ['PBJ-200886', 'CNB594494179'],
        ['PBJ-200886', 'CNB594494179'],
        ['PBJ-200886', 'CNB594494179'],
        ['PBJ-200886', 'CNB594494179'],
        ['PBJ-200886', 'CNB594494179'],
        ['PBJ-200886', 'CNB594494179'],
        ['PBJ-200886', 'CNB594494179'],
        ['PBJ-200886', 'CNB594494179'],
        ['PBJ-200886', 'CNB594494179'],
        ['PBJ-200886', 'CNB594494179'],
        ['PBJ-200886', 'CNB594494180'],
        ['PBJ-200886', 'CNB594494180'],
        ['PBJ-200886', 'CNB594494180'],
        ['PBJ-200886', 'CNB594494180'],
        ['PBJ-200886', 'CNB594494180'],
        ['PBJ-200886', 'CNB594494180'],
        ['PBJ-200886', 'CNB594494180'],
        ['PBJ-200886', 'CNB594494180'],
        ['PBJ-200886', 'CNB594494180'],
        ['PBJ-200886', 'CNB594494180'],
        ['PBJ-200886', 'CNB594494180'],
        ['PBJ-200886', 'CNB594494180'],
        ['PBJ-200886', 'CNB594491125'],
        ['PBJ-200886', 'CNB594491125'],
        ['PBJ-200886', 'CNB594491125'],
        ['PBJ-200886', 'CNB594491125'],
        ['PBJ-200886', 'CNB594491125'],
        ['PBJ-200886', 'CNB594491125'],
        ['PBJ-200886', 'CNB594491125'],
        ['PBJ-200886', 'CNB594491125'],
        ['PBJ-200886', 'CNB594491125'],
        ['PBJ-200886', 'CNB594491125'],
        ['PBJ-200886', 'CNB594491125'],
        ['PBJ-200886', 'CNB594491125'],
        ['PBJ-200886', 'CNB594491126'],
        ['PBJ-200886', 'CNB594491126'],
        ['PBJ-200886', 'CNB594491126'],
        ['PBJ-200886', 'CNB594491126'],
        ['PBJ-200886', 'CNB594491126'],
        ['PBJ-200886', 'CNB594491126'],
        ['PBJ-200886', 'CNB594491126'],
        ['PBJ-200886', 'CNB594491126'],
        ['PBJ-200886', 'CNB594491126'],
        ['PBJ-200886', 'CNB594491126'],
        ['PBJ-200886', 'CNB594491126'],
        ['PBJ-200886', 'CNB594491126'],
        ['PBJ-200886', 'CNB594491127'],
        ['PBJ-200886', 'CNB594491127'],
        ['PBJ-200886', 'CNB594491127'],
        ['PBJ-200886', 'CNB594491127'],
        ['PBJ-200886', 'CNB594491127'],
        ['PBJ-200886', 'CNB594491127'],
        ['PBJ-200886', 'CNB594491127'],
        ['PBJ-200886', 'CNB594491127'],
        ['PBJ-200886', 'CNB594491127'],
        ['PBJ-200886', 'CNB594491127'],
        ['PBJ-200886', 'CNB594491127'],
        ['PBJ-200886', 'CNB594491127'],
        ['PBJ-200886', 'CNB594494181'],
        ['PBJ-200886', 'CNB594494181'],
        ['PBJ-200886', 'CNB594494181'],
        ['PBJ-200886', 'CNB594494181'],
        ['PBJ-200886', 'CNB594494181'],
        ['PBJ-200886', 'CNB594494181'],
        ['PBJ-200886', 'CNB594494181'],
        ['PBJ-200886', 'CNB594494181'],
        ['PBJ-200886', 'CNB594494181'],
        ['PBJ-200886', 'CNB594494181'],
        ['PBJ-200886', 'CNB594494181'],
        ['PBJ-200886', 'CNB594494181'],
        ['PBJ-200886', 'CNB594494181'],
        ['PBJ-200886', 'CNB594494181'],
        ['PBJ-200886', 'CNB594494181'],
        ['PBJ-200886', 'CNB594494181'],
        ['PBJ-200886', 'CNB594494181'],
        ['PBJ-200886', 'CNB594494182'],
        ['PBJ-200886', 'CNB594494182'],
        ['PBJ-200886', 'CNB594494182'],
        ['PBJ-200886', 'CNB594494182'],
        ['PBJ-200886', 'CNB594494182'],
        ['PBJ-200886', 'CNB594494182'],
        ['PBJ-200886', 'CNB594494182'],
        ['PBJ-200886', 'CNB594494182'],
        ['PBJ-200886', 'CNB594494182'],
        ['PBJ-200886', 'CNB594494182'],
        ['PBJ-200886', 'CNB594494182'],
        ['PBJ-200886', 'CNB594494182'],
        ['PBJ-200885', 'CNB594494182'],
        ['PBJ-200885', 'CNB594494182'],
        ['PBJ-200886', 'CNA594489080'],
        ['PBJ-200886', 'CNA594489080'],
        ['PBJ-200886', 'CNA594489080'],
        ['PBJ-200886', 'CNA594489080'],
        ['PBJ-200886', 'CNA594489080'],
        ['PBJ-200886', 'CNA594489080'],
        ['PBJ-200886', 'CNA594489080'],
        ['PBJ-200886', 'CNA594489080'],
        ['PBJ-200886', 'CNA594489080'],
        ['PBJ-200886', 'CNA594489080'],
        ['PBJ-200886', 'CNA594489080'],
        ['PBJ-200886', 'CNA594489080'],
        ['PBJ-200886', 'CNA594489081'],
        ['PBJ-200886', 'CNA594489081'],
        ['PBJ-200886', 'CNA594489081'],
        ['PBJ-200886', 'CNB594494183'],
        ['PBJ-200886', 'CNB594494183'],
        ['PBJ-200886', 'CNB594494183'],
        ['PBJ-200886', 'CNA594489081'],
        ['PBJ-200886', 'CNA594489081'],
        ['PBJ-200886', 'CNA594489081'],
        ['PBJ-200886', 'CNA594489081'],
        ['PBJ-200886', 'CNA594489081'],
        ['PBJ-200886', 'CNA594489081'],
        ['PBJ-200886', 'CNA594489081'],
        ['PBJ-200886', 'CNA594489081'],
        ['PBJ-200886', 'CNA594489081'],
        ['PBJ-200886', 'CNA594489082'],
        ['PBJ-200886', 'CNA594489082'],
        ['PBJ-200886', 'CNA594489082'],
        ['PBJ-200886', 'CNA594489082'],
        ['PBJ-200886', 'CNA594489082'],
        ['PBJ-200886', 'CNA594489082'],
        ['PBJ-200886', 'CNB594494183'],
        ['PBJ-200886', 'CNB594494183'],
        ['PBJ-200886', 'CNB594494183'],
        ['PBJ-200886', 'CNB594494183'],
        ['PBJ-200886', 'CNA594489082'],
        ['PBJ-200886', 'CNA594489082'],
        ['PBJ-200886', 'CNA594489082'],
        ['PBJ-200886', 'CNA594489082'],
        ['PBJ-200886', 'CNA594489082'],
        ['PBJ-200886', 'CNA594489082'],
        ['PBJ-200886', 'CNB594491117'],
        ['PBJ-200886', 'CNB594491117'],
        ['PBJ-200886', 'CNB594491117'],
        ['PBJ-200886', 'CNB594491117'],
        ['PBJ-200886', 'CNB594491117'],
        ['PBJ-200886', 'CNB594491117'],
        ['PBJ-200886', 'CNB594491117'],
        ['PBJ-200886', 'CNB594491117'],
        ['PBJ-200886', 'CNB594491117'],
        ['PBJ-200886', 'CNB594491117'],
        ['PBJ-200886', 'CNB594491117'],
        ['PBJ-200886', 'CNB594491117'],
        ['PBJ-200886', 'CNB594491118'],
        ['PBJ-200886', 'CNB594491118'],
        ['PBJ-200886', 'CNB594491118'],
        ['PBJ-200886', 'CNB594491118'],
        ['PBJ-200886', 'CNB594491118'],
        ['PBJ-200886', 'CNB594491118'],
        ['PBJ-200886', 'CNB594491118'],
        ['PBJ-200886', 'CNB594491118'],
        ['PBJ-200886', 'CNB594491118'],
        ['PBJ-200886', 'CNB594491118'],
        ['PBJ-200886', 'CNB594491118'],
        ['PBJ-200886', 'CNB594491118'],
        ['PBJ-200886', 'CNB594491119'],
        ['PBJ-200886', 'CNB594491119'],
        ['PBJ-200886', 'CNB594491119'],
        ['PBJ-200886', 'CNB594491119'],
        ['PBJ-200886', 'CNB594491119'],
        ['PBJ-200886', 'CNB594491119'],
        ['PBJ-200886', 'CNB594491119'],
        ['PBJ-200886', 'CNB594491119'],
        ['PBJ-200886', 'CNB594491119'],
        ['PBJ-200886', 'CNB594491119'],
        ['PBJ-200886', 'CNB594491119'],
        ['PBJ-200886', 'CNB594491119'],
        ['PBJ-200886', 'CNB594494184'],
        ['PBJ-200886', 'CNB594494184'],
        ['PBJ-200886', 'CNB594494184'],
        ['PBJ-200886', 'CNB594494184'],
        ['PBJ-200886', 'CNB594494184'],
        ['PBJ-200886', 'CNB594494184'],
        ['PBJ-200886', 'CNB594494184'],
        ['PBJ-200886', 'CNB594494184'],
        ['PBJ-200886', 'CNB594494184'],
        ['PBJ-200886', 'CNB594494184'],
        ['PBJ-200886', 'CNB594494184'],
        ['PBJ-200886', 'CNB594494184'],
        ['PBJ-200886', 'CNB594494185'],
        ['PBJ-200886', 'CNB594494185'],
        ['PBJ-200886', 'CNB594494185'],
        ['PBJ-200886', 'CNB594494185'],
        ['PBJ-200886', 'CNB594494185'],
        ['PBJ-200886', 'CNB594494185'],
        ['PBJ-200886', 'CNB594494185'],
        ['PBJ-200886', 'CNB594494185'],
        ['PBJ-200886', 'CNB594494185'],
        ['PBJ-200886', 'CNB594494185'],
        ['PBJ-200886', 'CNB594494185'],
        ['PBJ-200886', 'CNB594494185'],
        ['PBJ-200886', 'CNB594494186'],
        ['PBJ-200886', 'CNB594494186']
    ];

    private readonly pairwiseNumNumData = [
        [1.513, 0.147],
        [1.515, 0.147],
        [1.515, 0.147],
        [1.509, 0.147],
        [1.517, 0.147],
        [1.514, 0.147],
        [1.513, 0.145],
        [1.516, 0.145],
        [1.512, 0.145],
        [1.508, 0.145],
        [1.515, 0.145],
        [1.516, 0.145],
        [1.516, 0.145],
        [1.516, 0.145],
        [1.516, 0.145],
        [1.516, 0.145],
        [1.518, 0.145],
        [1.513, 0.145],
        [1.514, 0.145],
        [1.507, 0.145],
        [1.516, 0.145],
        [1.512, 0.145],
        [1.514, 0.146],
        [1.518, 0.146],
        [1.509, 0.147],
        [1.514, 0.147],
        [1.511, 0.147],
        [1.513, 0.147],
        [1.51, 0.148],
        [1.514, 0.148],
        [1.511, 0.148],
        [1.509, 0.148],
        [1.512, 0.148],
        [1.515, 0.148],
        [1.511, 0.148],
        [1.51, 0.148],
        [1.511, 0.148],
        [1.515, 0.148],
        [1.515, 0.148],
        [1.515, 0.148],
        [1.502, 0.148],
        [1.513, 0.148],
        [1.41, 0.148],
        [1.41, 0.147],
        [1.512, 0.147],
        [1.51, 0.147],
        [1.507, 0.147],
        [1.516, 0.147],
        [1.514, 0.147],
        [1.514, 0.147],
        [1.509, 0.148],
        [1.513, 0.148],
        [1.508, 0.148],
        [1.514, 0.148],
        [1.502, 0.148],
        [1.513, 0.145],
        [1.508, 0.145],
        [1.507, 0.145],
        [1.506, 0.145],
        [1.509, 0.146],
        [1.506, 0.146],
        [1.509, 0.147],
        [1.517, 0.145],
        [1.51, 0.146],
        [1.512, 0.145],
        [1.509, 0.146],
        [1.513, 0.145],
        [1.508, 0.146],
        [1.513, 0.146],
        [1.51, 0.146],
        [1.509, 0.146],
        [1.509, 0.146],
        [1.513, 0.145],
        [1.515, 0.145],
        [1.513, 0.145],
        [1.508, 0.145],
        [1.51, 0.145],
        [1.509, 0.146],
        [1.508, 0.146],
        [1.511, 0.146],
        [1.508, 0.146],
        [1.511, 0.146],
        [1.51, 0.146],
        [1.511, 0.146],
        [1.512, 0.146],
        [1.511, 0.146],
        [1.512, 0.146],
        [1.514, 0.146],
        [1.51, 0.146],
        [1.511, 0.147],
        [1.516, 0.147],
        [1.513, 0.147],
        [1.512, 0.147],
        [1.511, 0.148],
        [1.511, 0.148],
        [1.514, 0.148],
        [1.516, 0.148],
        [1.517, 0.148],
        [1.508, 0.148],
        [1.509, 0.148],
        [1.514, 0.148],
        [1.512, 0.148],
        [1.512, 0.148],
        [1.518, 0.148],
        [1.509, 0.147],
        [1.517, 0.147],
        [1.512, 0.146],
        [1.513, 0.145],
        [1.514, 0.145],
        [1.513, 0.146],
        [1.516, 0.146],
        [1.511, 0.147],
        [1.518, 0.146],
        [1.513, 0.146],
        [1.512, 0.146],
        [1.511, 0.146],
        [1.515, 0.146],
        [1.517, 0.146],
        [1.507, 0.146],
        [1.511, 0.146],
        [1.511, 0.146],
        [1.51, 0.146],
        [1.514, 0.146],
        [1.51, 0.146],
        [1.511, 0.146],
        [1.514, 0.146],
        [1.511, 0.146],
        [1.514, 0.146],
        [1.513, 0.146],
        [1.514, 0.146],
        [1.511, 0.144],
        [1.515, 0.144],
        [1.513, 0.144],
        [1.51, 0.144],
        [1.514, 0.145],
        [1.517, 0.145],
        [1.517, 0.145],
        [1.521, 0.146],
        [1.514, 0.145],
        [1.513, 0.145],
        [1.517, 0.145],
        [1.509, 0.145],
        [1.514, 0.148],
        [1.514, 0.147],
        [1.511, 0.147],
        [1.515, 0.147],
        [1.514, 0.147],
        [1.517, 0.147],
        [1.514, 0.147],
        [1.52, 0.147],
        [1.515, 0.145],
        [1.51, 0.148],
        [1.516, 0.148],
        [1.514, 0.148],
        [1.515, 0.145],
        [1.514, 0.146],
        [1.519, 0.144],
        [1.508, 0.148],
        [1.511, 0.147],
        [1.51, 0.146],
        [1.508, 0.145],
        [1.515, 0.147],
        [1.504, 0.144],
        [1.515, 0.146],
        [1.514, 0.145],
        [1.504, 0.146],
        [1.511, 0.144],
        [1.514, 0.146],
        [1.506, 0.146],
        [1.512, 0.145],
        [1.507, 0.145],
        [1.514, 0.144],
        [1.52, 0.145],
        [1.507, 0.148],
        [1.509, 0.146],
        [1.506, 0.146],
        [1.514, 0.145],
        [1.516, 0.147],
        [1.512, 0.146],
        [1.517, 0.144],
        [1.51, 0.148],
        [1.508, 0.147],
        [1.524, 0.144],
        [1.512, 0.144],
        [1.511, 0.147],
        [1.51, 0.144],
        [1.514, 0.144],
        [1.517, 0.144],
        [1.513, 0.146],
        [1.519, 0.148],
        [1.511, 0.146],
        [1.512, 0.144],
        [1.513, 0.144],
        [1.512, 0.145],
        [1.513, 0.144],
        [1.515, 0.145],
        [1.528, 0.145],
        [1.519, 0.145],
        [1.513, 0.146],
        [1.517, null],
        [1.511, null],
        [1.513, null],
        [1.513, null],
        [1.513, null],
        [1.517, null],
        [1.512, null],
        [1.511, null],
        [1.514, null],
        [1.51, null],
        [1.516, null],
        [1.513, null],
        [1.508, null],
        [1.511, null],
        [1.51, null],
        [1.51, null],
        [1.518, null],
        [1.517, null],
        [1.513, null],
        [1.514, null],
        [1.515, null],
        [1.517, null],
        [1.516, null],
        [1.517, null],
        [1.507, null],
        [1.506, null],
        [1.516, null],
        [1.508, null],
        [1.513, null],
        [1.515, null],
        [1.511, null],
        [1.516, null],
        [1.512, null],
        [1.515, null],
        [1.512, null],
        [1.511, null],
        [1.512, null],
        [1.51, null],
        [1.513, null],
        [1.516, null],
        [1.516, null],
        [1.513, null],
        [1.511, null],
        [1.514, null],
        [1.515, null],
        [1.507, null],
        [1.51, null],
        [1.514, null],
        [1.515, null],
        [1.51, null],
        [1.51, null],
        [1.505, null],
        [1.515, null],
        [1.513, null],
        [1.51, null],
        [1.507, null],
        [1.513, null],
        [1.508, null],
        [1.51, null],
        [1.512, null],
        [1.51, null],
        [1.508, null],
        [1.51, null],
        [1.513, null],
        [1.511, null],
        [1.514, null],
        [1.514, null],
        [1.513, 0.148],
        [1.51, 0.148],
        [1.506, 0.145],
        [1.504, 0.145],
        [1.511, 0.145],
        [1.511, 0.148],
        [1.51, 0.148],
        [1.512, 0.148],
        [1.508, 0.148],
        [1.507, 0.145],
        [1.506, 0.145],
        [1.515, 0.145],
        [1.512, 0.145],
        [1.513, 0.145],
        [1.513, 0.145],
        [1.51, 0.145],
        [1.515, 0.146],
        [1.515, 0.146],
        [1.511, 0.145],
        [1.513, 0.146],
        [1.511, 0.146],
        [1.513, 0.146],
        [1.514, 0.146],
        [1.511, 0.146],
        [1.511, 0.146],
        [1.51, 0.146],
        [null, null],
        [1.512, 0.146],
        [1.511, 0.147],
        [1.517, 0.146],
        [1.513, 0.146],
        [1.507, 0.145],
        [1.519, 0.145],
        [1.51, 0.145],
        [1.512, 0.145],
        [1.512, 0.144],
        [1.514, 0.146],
        [1.518, 0.148],
        [1.516, 0.146],
        [1.513, 0.146],
        [1.515, 0.146],
        [1.507, 0.148],
        [1.511, 0.146],
        [1.512, 0.146],
        [1.513, 0.146],
        [1.505, 0.147],
        [1.503, 0.145],
        [1.518, 0.146],
        [1.51, 0.147],
        [1.516, 0.147],
        [1.515, 0.146],
        [1.519, 0.147],
        [1.523, 0.147],
        [1.509, 0.146],
        [1.515, 0.148],
        [1.51, 0.146],
        [1.513, 0.147],
        [1.511, 0.146],
        [1.513, 0.144],
        [1.508, 0.145],
        [1.512, 0.146],
        [1.517, 0.145],
        [1.514, 0.146],
        [1.511, 0.145],
        [1.517, 0.147],
        [1.513, 0.148],
        [1.519, 0.145],
        [1.525, 0.147],
        [1.508, 0.146],
        [1.518, 0.146],
        [1.512, 0.146],
        [1.523, 0.146],
        [1.513, 0.146],
        [1.521, 0.148],
        [1.512, 0.146],
        [1.517, 0.146],
        [1.511, 0.147],
        [1.526, 0.146],
        [1.508, 0.146],
        [1.515, 0.146],
        [1.504, 0.146],
        [1.502, 0.145],
        [1.509, 0.146],
        [1.503, 0.145],
        [1.504, 0.146],
        [1.513, 0.145],
        [1.507, 0.147],
        [1.508, 0.147],
        [1.514, 0.147],
        [1.514, 0.147],
        [1.502, 0.146],
        [1.517, 0.146],
        [1.51, 0.146],
        [1.502, 0.145],
        [1.508, 0.146],
        [1.506, null],
        [1.521, null],
        [1.512, null],
        [1.509, null],
        [1.5, null],
        [1.505, null],
        [1.507, null],
        [1.507, null],
        [1.505, null],
        [1.507, null],
        [1.519, null],
        [1.507, null],
        [1.524, null],
        [1.503, null],
        [1.51, null],
        [1.516, null],
        [1.5, null],
        [1.507, null],
        [1.513, null],
        [1.517, null],
        [1.503, null],
        [1.52, null],
        [1.516, null],
        [1.517, null],
        [1.504, null],
        [1.519, null],
        [1.514, null],
        [1.519, null],
        [1.52, null],
        [1.512, null],
        [1.52, null],
        [1.514, null],
        [1.518, null],
        [1.519, null],
        [1.517, null],
        [1.518, null],
        [1.509, null],
        [1.516, null],
        [1.513, null],
        [1.517, null],
        [1.525, null],
        [null, null],
        [1.515, null],
        [1.519, null],
        [1.518, null],
        [1.512, null],
        [1.526, null],
        [1.517, null],
        [1.514, null],
        [1.514, null],
        [1.523, null],
        [1.513, 0.146],
        [1.522, 0.147],
        [1.51, 0.146],
        [1.516, 0.146],
        [1.521, 0.147],
        [1.511, 0.146],
        [1.521, 0.144],
        [1.517, 0.145],
        [1.517, 0.147],
        [1.514, 0.146],
        [1.507, 0.144],
        [1.522, 0.144],
        [1.511, 0.144],
        [1.521, 0.145],
        [1.505, 0.145],
        [1.512, 0.146],
        [1.508, 0.147],
        [1.517, 0.148],
        [1.511, 0.146],
        [1.514, 0.148],
        [1.509, 0.146],
        [1.523, 0.148],
        [1.505, 0.146],
        [1.502, 0.147],
        [1.513, 0.146],
        [1.52, 0.147],
        [1.514, 0.145],
        [1.526, 0.145],
        [1.517, 0.144],
        [1.522, 0.145],
        [1.526, 0.145],
        [1.52, 0.147],
        [1.504, 0.146],
        [1.526, 0.146],
        [1.509, 0.146],
        [1.506, 0.145],
        [1.507, 0.147],
        [1.519, 0.146],
        [1.517, 0.144],
        [1.508, 0.146],
        [1.507, 0.145],
        [1.514, 0.148],
        [1.514, 0.144],
        [1.522, 0.145],
        [1.52, 0.144],
        [1.508, 0.145],
        [1.513, 0.144],
        [1.512, 0.145],
        [1.513, 0.145],
        [1.512, 0.148],
        [1.505, 0.148],
        [1.512, 0.145],
        [1.507, 0.148],
        [1.51, 0.147],
        [1.511, 0.147],
        [1.513, 0.146],
        [1.513, 0.146],
        [1.509, 0.148],
        [1.507, 0.147],
        [1.513, 0.146],
        [1.507, 0.146],
        [1.513, 0.146],
        [1.509, 0.144],
        [1.506, 0.146],
        [1.511, 0.146],
        [1.51, 0.145],
        [1.51, 0.145],
        [1.518, 0.146],
        [1.506, 0.147],
        [1.518, 0.147],
        [1.509, 0.148],
        [1.509, 0.146],
        [1.511, 0.144],
        [1.515, 0.144],
        [1.51, 0.146],
        [1.504, 0.145],
        [1.509, 0.145],
        [1.51, 0.144],
        [1.512, 0.146],
        [1.516, 0.147],
        [1.508, 0.146],
        [1.512, 0.148],
        [1.511, 0.147],
        [1.508, 0.146],
        [1.513, 0.147],
        [1.515, 0.147],
        [1.506, 0.148],
        [1.507, 0.148],
        [1.507, 0.145],
        [1.513, 0.146],
        [1.507, 0.148],
        [1.512, 0.148],
        [1.505, 0.145],
        [1.506, 0.145],
        [1.505, 0.145],
        [1.509, 0.145],
        [1.51, 0.145],
        [1.511, 0.146],
        [1.509, 0.144],
        [1.51, 0.145],
        [1.53, 0.146],
        [1.52, 0.145],
        [1.517, 0.148],
        [1.511, 0.144],
        [1.515, 0.144],
        [1.509, 0.146],
        [1.51, 0.144],
        [1.504, 0.145],
        [1.504, 0.147],
        [1.517, 0.147],
        [1.514, 0.148],
        [1.517, 0.148],
        [1.518, 0.145],
        [1.517, 0.146],
        [1.516, 0.146],
        [1.519, 0.148],
        [1.506, 0.145],
        [1.519, 0.148],
        [1.512, 0.145],
        [1.515, 0.146],
        [1.527, 0.146],
        [1.515, 0.145],
        [1.511, 0.146],
        [1.52, 0.144],
        [1.518, 0.147],
        [1.526, 0.146],
        [1.514, 0.144],
        [1.518, 0.144],
        [1.513, 0.147],
        [1.521, 0.146],
        [1.52, 0.148],
        [1.515, 0.148],
        [1.516, 0.144],
        [1.505, 0.145],
        [1.507, 0.144],
        [1.515, 0.145],
        [1.512, 0.146],
        [1.514, 0.148],
        [1.51, 0.145],
        [1.519, 0.147],
        [1.509, 0.146],
        [1.514, 0.145],
        [1.518, 0.148],
        [1.514, 0.145],
        [1.517, 0.146],
        [1.515, 0.145],
        [1.513, 0.147],
        [1.512, 0.145],
        [1.516, 0.148],
        [1.516, 0.146],
        [1.517, 0.145],
        [1.515, 0.146],
        [null, 0.146],
        [1.523, 0.145],
        [1.509, 0.145],
        [1.512, 0.146],
        [1.52, 0.147],
        [1.523, 0.147],
        [1.511, 0.145],
        [1.516, 0.146],
        [1.52, 0.146],
        [1.522, 0.148],
        [1.506, 0.145],
        [1.519, 0.146],
        [1.508, 0.145],
        [1.521, 0.146],
        [1.517, 0.146],
        [1.515, 0.147],
        [1.517, 0.147],
        [1.513, 0.145],
        [1.515, 0.144],
        [1.513, 0.144],
        [1.521, 0.144],
        [1.513, 0.144],
        [1.525, 0.145],
        [1.517, 0.145],
        [1.523, 0.145],
        [1.525, 0.145],
        [1.517, 0.146],
        [1.518, 0.147],
        [1.518, 0.147],
        [1.519, 0.147],
        [1.512, 0.145],
        [1.513, 0.145],
        [1.513, 0.147],
        [1.51, 0.145],
        [1.518, 0.144],
        [1.508, 0.147],
        [1.507, 0.145],
        [1.508, 0.144],
        [1.51, 0.144],
        [1.521, 0.147],
        [1.516, 0.146],
        [1.518, 0.146],
        [1.515, 0.147],
        [1.511, 0.145],
        [1.516, 0.145],
        [1.509, 0.147],
        [1.523, 0.147],
        [1.511, 0.145],
        [1.514, 0.146],
        [1.52, 0.145],
        [1.52, 0.147],
        [1.515, 0.145],
        [1.52, 0.145],
        [1.514, 0.145],
        [1.512, 0.148],
        [1.518, 0.146],
        [1.514, 0.146],
        [1.526, 0.147],
        [1.517, 0.147],
        [1.518, 0.145],
        [1.519, 0.145],
        [1.515, 0.145],
        [1.513, 0.145],
        [1.52, 0.145],
        [1.51, 0.147],
        [1.513, 0.145],
        [1.521, 0.147],
        [1.512, 0.147],
        [1.522, 0.146],
        [1.521, 0.145],
        [1.52, 0.146],
        [1.512, 0.145],
        [1.517, 0.146],
        [1.513, 0.148],
        [1.515, 0.146],
        [1.505, 0.146],
        [1.516, 0.144],
        [1.523, 0.146],
        [1.51, 0.146],
        [1.518, 0.145],
        [1.521, 0.147],
        [1.509, 0.145],
        [1.512, 0.145],
        [1.512, 0.145],
        [1.512, 0.144],
        [1.507, 0.144],
        [1.512, 0.145],
        [1.516, 0.145],
        [1.512, 0.145],
        [1.518, 0.145],
        [1.518, 0.145],
        [1.515, 0.144],
        [1.506, 0.145],
        [1.512, 0.148],
        [1.515, 0.144],
        [1.52, 0.145],
        [1.514, 0.146],
        [1.517, 0.145],
        [1.505, 0.144],
        [1.516, 0.146],
        [1.512, 0.145],
        [1.519, 0.146],
        [1.516, 0.145],
        [1.517, 0.145],
        [1.516, 0.145],
        [1.503, 0.144],
        [1.522, 0.145],
        [1.518, 0.145],
        [1.516, 0.145],
        [1.521, 0.144]
    ];

    async handleConnection() {
        // Notify connected clients of current users
        this.server.emit('data', 'connected');
    }

    async handleDisconnect() {
        // Notify connected clients of current users
        this.server.emit('data', 'disconected');
    }

    @SubscribeMessage('dcp') ///user/dcpUniqueFilterValues, /szymon/dcpUniqueFilterValues
    onDCP(client, params) {
        const event = 'dcp';
        const data = { key: params.select, data: this.dcpData[params.key] };

        return of({ event, data }).pipe(delay(0));
    }

    @SubscribeMessage('dcp-visualization')
    onVisualizationData(client, dcp) {
        console.log(client);
        const event = 'dcp-visualization';
        let data: Object[];

        if (dcp.plantKey.startsWith('UAP')) {
            data = this.visualizationData1;
        } else if (dcp.plantKey.startsWith('CAW')) {
            data = [];
        } else {
            data = this.visualizationData3;
        }

        return of({ event, data }).pipe(delay(3000));
    }

    @SubscribeMessage('dcp-pairwise')
    onPairwiseData(client, dcpPairviseQuery) {
        const event = 'dcp-pairwise';
        let data = {
            dcpId: dcpPairviseQuery.dcpId,
            xName: dcpPairviseQuery.xName,
            yName: dcpPairviseQuery.yName,
            xyValues: []
        };

        console.log(dcpPairviseQuery.xName);

        if (dcpPairviseQuery.xName.startsWith('20')) {
            data = {
                ...data,
                xyValues: this.pairwiseCatCatData
            };
        } else if (dcpPairviseQuery.xName.startsWith('30')) {
            data = {
                ...data,
                xyValues: this.pairwiseCatNumData
            };
        } else if (dcpPairviseQuery.xName.startsWith('40')) {
            data = {
                ...data,
                xyValues: this.pairwiseNumCatData
            };
        } else {
            data = {
                ...data,
                xyValues: this.pairwiseNumNumData
            };
        }

        return of({ event, data }).pipe(delay(1000));
    }

    @SubscribeMessage('dcp-analysis')
    onAnalysisData(client, dcp) {
        console.log(client);
        const event = 'dcp-analysis';
        const data = [];

        return of({ event, data }).pipe(delay(1000));
    }
}
