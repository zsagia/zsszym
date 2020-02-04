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

    private dcpData = {
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
        HLP: ['HLP_Nova_route', 'HLP_SubAssy_Route']
    };

    private visualizationData1 = [
        [
            {
              "subject_name": "C1-6-D-34928",
              "subject_time": 1557523380,
              "event_value": 470.4
            },
            {
              "subject_name": "C1-6-D-35033",
              "subject_time": 1555925220,
              "event_value": 471.3
            },
            {
              "subject_name": "C1-6-D-35034",
              "subject_time": 1555925280,
              "event_value": 440.8
            },
            {
              "subject_name": "C1-6-D-35035",
              "subject_time": 1555924980,
              "event_value": 461.7
            },
            {
              "subject_name": "C1-6-D-35036",
              "subject_time": 1555925580,
              "event_value": 501.4
            },
            {
              "subject_name": "C1-6-D-35037",
              "subject_time": 1555925940,
              "event_value": 443.1
            },
            {
              "subject_name": "C1-6-D-35038",
              "subject_time": 1555926120,
              "event_value": 431.9
            },
            {
              "subject_name": "C1-6-D-35039",
              "subject_time": 1555919580,
              "event_value": 449.5
            },
            {
              "subject_name": "C1-6-D-35040",
              "subject_time": 1555918860,
              "event_value": 457.4
            },
            {
              "subject_name": "C1-6-D-35041",
              "subject_time": 1555919040,
              "event_value": 519.6
            },
            {
              "subject_name": "C1-6-D-35042",
              "subject_time": 1555933560,
              "event_value": 458.4
            },
            {
              "subject_name": "C1-6-D-35043",
              "subject_time": 1555932480,
              "event_value": ""
            },
            {
              "subject_name": "C1-6-D-35044",
              "subject_time": 1555933380,
              "event_value": 439.5
            },
            {
              "subject_name": "C1-6-D-35045",
              "subject_time": 1555934100,
              "event_value": 443.4
            },
            {
              "subject_name": "C1-6-D-35046",
              "subject_time": 1555933920,
              "event_value": 417.2
            },
            {
              "subject_name": "C1-6-D-35047",
              "subject_time": 1555934280,
              "event_value": 432.6
            },
            {
              "subject_name": "C1-6-D-35048",
              "subject_time": 1555920300,
              "event_value": 455.9
            },
            {
              "subject_name": "C1-6-D-35049",
              "subject_time": 1555920600,
              "event_value": 520.4
            },
            {
              "subject_name": "C1-6-D-35050",
              "subject_time": 1555920780,
              "event_value": 496.5
            },
            {
              "subject_name": "C1-6-D-35051",
              "subject_time": 1555935120,
              "event_value": 417.8
            },
            {
              "subject_name": "C1-6-D-35052",
              "subject_time": 1555935180,
              "event_value": 438.1
            },
            {
              "subject_name": "C1-6-D-35053",
              "subject_time": 1555935420,
              "event_value": 435.9
            },
            {
              "subject_name": "C1-6-D-35054",
              "subject_time": 1555935540,
              "event_value": 462.5
            },
            {
              "subject_name": "C1-6-D-35055",
              "subject_time": 1555936140,
              "event_value": 454.5
            },
            {
              "subject_name": "C1-6-D-35056",
              "subject_time": 1555961400,
              "event_value": 460.4
            },
            {
              "subject_name": "C1-6-D-35057",
              "subject_time": 1555961820,
              "event_value": 429.6
            },
            {
              "subject_name": "C1-6-D-35058",
              "subject_time": 1555962180,
              "event_value": 453.6
            },
            {
              "subject_name": "C1-6-D-35059",
              "subject_time": 1555962420,
              "event_value": 463.5
            },
            {
              "subject_name": "C1-6-D-35060",
              "subject_time": 1555962720,
              "event_value": 457.9
            },
            {
              "subject_name": "C1-6-D-35061",
              "subject_time": 1555962660,
              "event_value": 429.5
            },
            {
              "subject_name": "C1-6-D-35062",
              "subject_time": 1555943700,
              "event_value": 428.4
            },
            {
              "subject_name": "C1-6-D-35063",
              "subject_time": 1555943940,
              "event_value": 435
            },
            {
              "subject_name": "C1-6-D-35064",
              "subject_time": 1555944060,
              "event_value": 427.6
            },
            {
              "subject_name": "C1-6-D-35065",
              "subject_time": 1555944360,
              "event_value": 421.3
            },
            {
              "subject_name": "C1-6-D-35066",
              "subject_time": 1555944240,
              "event_value": 504.6
            },
            {
              "subject_name": "C1-6-D-35067",
              "subject_time": 1555944420,
              "event_value": 508.5
            },
            {
              "subject_name": "C1-6-D-35068",
              "subject_time": 1555968240,
              "event_value": 427.1
            },
            {
              "subject_name": "C1-6-D-35069",
              "subject_time": 1555967700,
              "event_value": ""
            },
            {
              "subject_name": "C1-6-D-35070",
              "subject_time": 1555968720,
              "event_value": 424.4
            },
            {
              "subject_name": "C1-6-D-35071",
              "subject_time": 1555968540,
              "event_value": 474.2
            },
            {
              "subject_name": "C1-6-D-35072",
              "subject_time": 1555968900,
              "event_value": 450.9
            },
            {
              "subject_name": "C1-6-D-35073",
              "subject_time": 1555969080,
              "event_value": 426.8
            },
            {
              "subject_name": "C1-6-D-35074",
              "subject_time": 1555970100,
              "event_value": 461.5
            },
            {
              "subject_name": "C1-6-D-35075",
              "subject_time": 1555970280,
              "event_value": 513.6
            },
            {
              "subject_name": "C1-6-D-35076",
              "subject_time": 1555975320,
              "event_value": 466.3
            },
            {
              "subject_name": "C1-6-D-35077",
              "subject_time": 1555975560,
              "event_value": 456.9
            },
            {
              "subject_name": "C1-6-D-35078",
              "subject_time": 1556047020,
              "event_value": 476.3
            },
            {
              "subject_name": "C1-6-D-35079",
              "subject_time": 1555975800,
              "event_value": 461.4
            },
            {
              "subject_name": "C1-6-D-35080",
              "subject_time": 1556004540,
              "event_value": 482.9
            },
            {
              "subject_name": "C1-6-D-35081",
              "subject_time": 1556004720,
              "event_value": 473.2
            },
            {
              "subject_name": "C1-6-D-35082",
              "subject_time": 1556005020,
              "event_value": 457.2
            },
            {
              "subject_name": "C1-6-D-35083",
              "subject_time": 1556004960,
              "event_value": 467.2
            },
            {
              "subject_name": "C1-6-D-35084",
              "subject_time": 1558382940,
              "event_value": 494.2
            },
            {
              "subject_name": "C1-6-D-35085",
              "subject_time": 1556006160,
              "event_value": 485.9
            },
            {
              "subject_name": "C1-6-D-35086",
              "subject_time": 1556020860,
              "event_value": 464.6
            },
            {
              "subject_name": "C1-6-D-35087",
              "subject_time": 1556021220,
              "event_value": 463.8
            },
            {
              "subject_name": "C1-6-D-35088",
              "subject_time": 1556008260,
              "event_value": 468.9
            },
            {
              "subject_name": "C1-6-D-35089",
              "subject_time": 1556008380,
              "event_value": 508
            },
            {
              "subject_name": "C1-6-D-35090",
              "subject_time": 1557431760,
              "event_value": 462.9
            },
            {
              "subject_name": "C1-6-D-35091",
              "subject_time": 1556008620,
              "event_value": 535.5
            },
            {
              "subject_name": "C1-6-D-35092",
              "subject_time": 1556008740,
              "event_value": 428.8
            },
            {
              "subject_name": "C1-6-D-35093",
              "subject_time": 1556010180,
              "event_value": 485.1
            },
            {
              "subject_name": "C1-6-D-35094",
              "subject_time": 1556006640,
              "event_value": 558.4
            },
            {
              "subject_name": "C1-6-D-35095",
              "subject_time": 1556006400,
              "event_value": 489.3
            },
            {
              "subject_name": "C1-6-D-35096",
              "subject_time": 1556007120,
              "event_value": 444.9
            },
            {
              "subject_name": "C1-6-D-35097",
              "subject_time": 1556020500,
              "event_value": 453.7
            },
            {
              "subject_name": "C1-6-D-35098",
              "subject_time": 1556020620,
              "event_value": 493.9
            },
            {
              "subject_name": "C1-6-D-35099",
              "subject_time": 1556020800,
              "event_value": 459.7
            },
            {
              "subject_name": "C1-6-D-35100",
              "subject_time": 1556022240,
              "event_value": 452.7
            },
            {
              "subject_name": "C1-6-D-35101",
              "subject_time": 1556022780,
              "event_value": 539.2
            },
            {
              "subject_name": "C1-6-D-35102",
              "subject_time": 1556022600,
              "event_value": 453.3
            },
            {
              "subject_name": "C1-6-D-35103",
              "subject_time": 1556023020,
              "event_value": 486
            },
            {
              "subject_name": "C1-6-D-35104",
              "subject_time": 1556023020,
              "event_value": 474
            },
            {
              "subject_name": "C1-6-D-35105",
              "subject_time": 1556023560,
              "event_value": 432.9
            },
            {
              "subject_name": "C1-6-D-35106",
              "subject_time": 1556031600,
              "event_value": 489.5
            },
            {
              "subject_name": "C1-6-D-35107",
              "subject_time": 1556031540,
              "event_value": 476.2
            },
            {
              "subject_name": "C1-6-D-35108",
              "subject_time": 1556031780,
              "event_value": 476.3
            },
            {
              "subject_name": "C1-6-D-35109",
              "subject_time": 1556031960,
              "event_value": 467.6
            },
            {
              "subject_name": "C1-6-D-35110",
              "subject_time": 1556032200,
              "event_value": 489.9
            },
            {
              "subject_name": "C1-6-D-35111",
              "subject_time": 1556032620,
              "event_value": 481
            },
            {
              "subject_name": "C1-6-D-35112",
              "subject_time": 1556033220,
              "event_value": 525
            },
            {
              "subject_name": "C1-6-D-35113",
              "subject_time": 1556033520,
              "event_value": 445.3
            },
            {
              "subject_name": "C1-6-D-35116",
              "subject_time": 1556033640,
              "event_value": 452.4
            },
            {
              "subject_name": "C1-6-D-35117",
              "subject_time": 1556033760,
              "event_value": 503.1
            },
            {
              "subject_name": "C1-6-D-35118",
              "subject_time": 1556034900,
              "event_value": 475.5
            },
            {
              "subject_name": "C1-6-D-35119",
              "subject_time": 1556034000,
              "event_value": 476.1
            },
            {
              "subject_name": "C1-6-D-35120",
              "subject_time": 1556050800,
              "event_value": 534.6
            },
            {
              "subject_name": "C1-6-D-35121",
              "subject_time": 1556050860,
              "event_value": 455
            },
            {
              "subject_name": "C1-6-D-35122",
              "subject_time": 1556052660,
              "event_value": 478.5
            },
            {
              "subject_name": "C1-6-D-35123",
              "subject_time": 1556051340,
              "event_value": 490
            },
            {
              "subject_name": "C1-6-D-35124",
              "subject_time": 1556053140,
              "event_value": 529.1
            },
            {
              "subject_name": "C1-6-D-35125",
              "subject_time": 1556053260,
              "event_value": 458.9
            },
            {
              "subject_name": "C1-6-D-35126",
              "subject_time": 1556091660,
              "event_value": 498.7
            },
            {
              "subject_name": "C1-6-D-35127",
              "subject_time": 1556091840,
              "event_value": 454.3
            },
            {
              "subject_name": "C1-6-D-35128",
              "subject_time": 1556091960,
              "event_value": 442.7
            },
            {
              "subject_name": "C1-6-D-35129",
              "subject_time": 1556092080,
              "event_value": 553.3
            },
            {
              "subject_name": "C1-6-D-35130",
              "subject_time": 1557523920,
              "event_value": 460
            },
            {
              "subject_name": "C1-6-D-35131",
              "subject_time": 1556092260,
              "event_value": 524.6
            },
            {
              "subject_name": "C1-6-D-35132",
              "subject_time": 1556104380,
              "event_value": 448.8
            },
            {
              "subject_name": "C1-6-D-35133",
              "subject_time": 1556104620,
              "event_value": 454.4
            },
            {
              "subject_name": "C1-6-D-35134",
              "subject_time": 1556104680,
              "event_value": 469.2
            },
            {
              "subject_name": "C1-6-D-35135",
              "subject_time": 1556136720,
              "event_value": 470.7
            },
            {
              "subject_name": "C1-6-D-35136",
              "subject_time": 1556104800,
              "event_value": 451
            },
            {
              "subject_name": "C1-6-D-35137",
              "subject_time": 1556104860,
              "event_value": 437.7
            },
            {
              "subject_name": "C1-6-D-35138",
              "subject_time": 1556105700,
              "event_value": 424.5
            },
            {
              "subject_name": "C1-6-D-35139",
              "subject_time": 1556105640,
              "event_value": 419.6
            },
            {
              "subject_name": "C1-6-D-35140",
              "subject_time": 1556104980,
              "event_value": 440.8
            },
            {
              "subject_name": "C1-6-D-35141",
              "subject_time": 1556106960,
              "event_value": 446.5
            },
            {
              "subject_name": "C1-6-D-35142",
              "subject_time": 1556107080,
              "event_value": 437.7
            },
            {
              "subject_name": "C1-6-D-35144",
              "subject_time": 1556107380,
              "event_value": 467.7
            },
            {
              "subject_name": "C1-6-D-35145",
              "subject_time": 1556109180,
              "event_value": 478.7
            },
            {
              "subject_name": "C1-6-D-35146",
              "subject_time": 1556109360,
              "event_value": 465.9
            },
            {
              "subject_name": "C1-6-D-35147",
              "subject_time": 1556108760,
              "event_value": 527.9
            },
            {
              "subject_name": "C1-6-D-35148",
              "subject_time": 1556109420,
              "event_value": 481.8
            },
            {
              "subject_name": "C1-6-D-35149",
              "subject_time": 1556109600,
              "event_value": 452.1
            },
            {
              "subject_name": "C1-6-D-35150",
              "subject_time": 1556116980,
              "event_value": 463.2
            },
            {
              "subject_name": "C1-6-D-35151",
              "subject_time": 1556117220,
              "event_value": 443.1
            },
            {
              "subject_name": "C1-6-D-35152",
              "subject_time": 1556117700,
              "event_value": 482.5
            },
            {
              "subject_name": "C1-6-D-35153",
              "subject_time": 1556117760,
              "event_value": 449.5
            },
            {
              "subject_name": "C1-6-D-35154",
              "subject_time": 1556118300,
              "event_value": 454.4
            },
            {
              "subject_name": "C1-6-D-35155",
              "subject_time": 1556118300,
              "event_value": 428.4
            },
            {
              "subject_name": "C1-6-D-35156",
              "subject_time": 1556133960,
              "event_value": 493.5
            },
            {
              "subject_name": "C1-6-D-35157",
              "subject_time": 1556134260,
              "event_value": 465.8
            },
            {
              "subject_name": "C1-6-D-35158",
              "subject_time": 1556134320,
              "event_value": 537.2
            },
            {
              "subject_name": "C1-6-D-35160",
              "subject_time": 1556134680,
              "event_value": 455.2
            },
            {
              "subject_name": "C1-6-D-35161",
              "subject_time": 1556134740,
              "event_value": 547.9
            },
            {
              "subject_name": "C1-6-D-35162",
              "subject_time": 1556134980,
              "event_value": 415.7
            },
            {
              "subject_name": "C1-6-D-35163",
              "subject_time": 1556141340,
              "event_value": 517.5
            },
            {
              "subject_name": "C1-6-D-35164",
              "subject_time": 1556141460,
              "event_value": 473.3
            },
            {
              "subject_name": "C1-6-D-35165",
              "subject_time": 1556142900,
              "event_value": 433.3
            },
            {
              "subject_name": "C1-6-D-35166",
              "subject_time": 1556142060,
              "event_value": 546.4
            },
            {
              "subject_name": "C1-6-D-35167",
              "subject_time": 1556142360,
              "event_value": 431.7
            },
            {
              "subject_name": "C1-6-D-35168",
              "subject_time": 1556142480,
              "event_value": 446.7
            },
            {
              "subject_name": "C1-6-D-35169",
              "subject_time": 1556178060,
              "event_value": 485.8
            },
            {
              "subject_name": "C1-6-D-35170",
              "subject_time": 1556178240,
              "event_value": 454.9
            },
            {
              "subject_name": "C1-6-D-35171",
              "subject_time": 1556178300,
              "event_value": 479.2
            },
            {
              "subject_name": "C1-6-D-35172",
              "subject_time": 1556178420,
              "event_value": 440.7
            },
            {
              "subject_name": "C1-6-D-35173",
              "subject_time": 1556178480,
              "event_value": 435.8
            },
            {
              "subject_name": "C1-6-D-35174",
              "subject_time": 1556178600,
              "event_value": 433.1
            },
            {
              "subject_name": "C1-6-D-35175",
              "subject_time": 1556183640,
              "event_value": 436.7
            },
            {
              "subject_name": "C1-6-D-35176",
              "subject_time": 1556183760,
              "event_value": 474.1
            },
            {
              "subject_name": "C1-6-D-35177",
              "subject_time": 1556183880,
              "event_value": 454.6
            },
            {
              "subject_name": "C1-6-D-35178",
              "subject_time": 1556184300,
              "event_value": 505.9
            },
            {
              "subject_name": "C1-6-D-35179",
              "subject_time": 1556184000,
              "event_value": 436.6
            },
            {
              "subject_name": "C1-6-D-35180",
              "subject_time": 1556184300,
              "event_value": 453.9
            },
            {
              "subject_name": "C1-6-D-35181",
              "subject_time": 1556181060,
              "event_value": 459.8
            },
            {
              "subject_name": "C1-6-D-35182",
              "subject_time": 1556180940,
              "event_value": 565.4
            },
            {
              "subject_name": "C1-6-D-35183",
              "subject_time": 1556183100,
              "event_value": 525.4
            },
            {
              "subject_name": "C1-6-D-35184",
              "subject_time": 1556183340,
              "event_value": 550.7
            },
            {
              "subject_name": "C1-6-D-35185",
              "subject_time": 1556183520,
              "event_value": 535.1
            },
            {
              "subject_name": "C1-6-D-35186",
              "subject_time": 1556183220,
              "event_value": 460.8
            },
            {
              "subject_name": "C1-6-D-35187",
              "subject_time": 1556191800,
              "event_value": 469.9
            },
            {
              "subject_name": "C1-6-D-35188",
              "subject_time": 1556192160,
              "event_value": 497.5
            },
            {
              "subject_name": "C1-6-D-35189",
              "subject_time": 1556191980,
              "event_value": 445.7
            },
            {
              "subject_name": "C1-6-D-35190",
              "subject_time": 1556193300,
              "event_value": 456.1
            },
            {
              "subject_name": "C1-6-D-35191",
              "subject_time": 1556192400,
              "event_value": 456.4
            },
            {
              "subject_name": "C1-6-D-35192",
              "subject_time": 1556193480,
              "event_value": 504.4
            },
            {
              "subject_name": "C1-6-D-35193",
              "subject_time": 1556195100,
              "event_value": 471.8
            },
            {
              "subject_name": "C1-6-D-35194",
              "subject_time": 1556195340,
              "event_value": 501.4
            },
            {
              "subject_name": "C1-6-D-35195",
              "subject_time": 1556195640,
              "event_value": 471.6
            },
            {
              "subject_name": "C1-6-D-35196",
              "subject_time": 1556195580,
              "event_value": 495.6
            },
            {
              "subject_name": "C1-6-D-35197",
              "subject_time": 1556195760,
              "event_value": 516.3
            },
            {
              "subject_name": "C1-6-D-35198",
              "subject_time": 1556202060,
              "event_value": 441.8
            },
            {
              "subject_name": "C1-6-D-35199",
              "subject_time": 1556203380,
              "event_value": 437
            },
            {
              "subject_name": "C1-6-D-35200",
              "subject_time": 1556204220,
              "event_value": 423.3
            },
            {
              "subject_name": "C1-6-D-35201",
              "subject_time": 1556203680,
              "event_value": 465.5
            },
            {
              "subject_name": "C1-6-D-35202",
              "subject_time": 1556203920,
              "event_value": 442.2
            },
            {
              "subject_name": "C1-6-D-35203",
              "subject_time": 1556204160,
              "event_value": 470.4
            },
            {
              "subject_name": "C1-6-D-35204",
              "subject_time": 1556220660,
              "event_value": 494.1
            },
            {
              "subject_name": "C1-6-D-35205",
              "subject_time": 1556220660,
              "event_value": 462.2
            },
            {
              "subject_name": "C1-6-D-35206",
              "subject_time": 1556221560,
              "event_value": 457.9
            },
            {
              "subject_name": "C1-6-D-35207",
              "subject_time": 1556221380,
              "event_value": 507.9
            },
            {
              "subject_name": "C1-6-D-35208",
              "subject_time": 1556221980,
              "event_value": 527.4
            },
            {
              "subject_name": "C1-6-D-35209",
              "subject_time": 1556221920,
              "event_value": 494.5
            },
            {
              "subject_name": "C1-6-D-35210",
              "subject_time": 1556223000,
              "event_value": 465
            },
            {
              "subject_name": "C1-6-D-35211",
              "subject_time": 1556223060,
              "event_value": 457.2
            },
            {
              "subject_name": "C1-6-D-35212",
              "subject_time": 1556223600,
              "event_value": 458.3
            },
            {
              "subject_name": "C1-6-D-35213",
              "subject_time": 1556223540,
              "event_value": 455
            },
            {
              "subject_name": "C1-6-D-35214",
              "subject_time": 1556224200,
              "event_value": 449.8
            },
            {
              "subject_name": "C1-6-D-35215",
              "subject_time": 1556223960,
              "event_value": 487
            },
            {
              "subject_name": "C1-6-D-35216",
              "subject_time": 1557215400,
              "event_value": 436
            },
            {
              "subject_name": "C1-6-D-35217",
              "subject_time": 1557223020,
              "event_value": 451.4
            },
            {
              "subject_name": "C1-6-D-35218",
              "subject_time": 1557215400,
              "event_value": 517.5
            },
            {
              "subject_name": "C1-6-D-35219",
              "subject_time": 1557215640,
              "event_value": 496.4
            },
            {
              "subject_name": "C1-6-D-35220",
              "subject_time": 1557215760,
              "event_value": 458
            },
            {
              "subject_name": "C1-6-D-35221",
              "subject_time": 1557216060,
              "event_value": 442.6
            },
            {
              "subject_name": "C1-6-D-35222",
              "subject_time": 1557216300,
              "event_value": 443.8
            },
            {
              "subject_name": "C1-6-D-35223",
              "subject_time": 1557216660,
              "event_value": 442.4
            },
            {
              "subject_name": "C1-6-D-35224",
              "subject_time": 1557216900,
              "event_value": 455.9
            },
            {
              "subject_name": "C1-6-D-35225",
              "subject_time": 1558382820,
              "event_value": 492.7
            },
            {
              "subject_name": "C1-6-D-35226",
              "subject_time": 1557217020,
              "event_value": 529.4
            },
            {
              "subject_name": "C1-6-D-35228",
              "subject_time": 1557217320,
              "event_value": 467.9
            },
            {
              "subject_name": "C1-6-D-35229",
              "subject_time": 1557217920,
              "event_value": 546.2
            },
            {
              "subject_name": "C1-6-D-35230",
              "subject_time": 1558344000,
              "event_value": 459.3
            },
            {
              "subject_name": "C1-6-D-35231",
              "subject_time": 1557222780,
              "event_value": 444.4
            },
            {
              "subject_name": "C1-6-D-35232",
              "subject_time": 1557222960,
              "event_value": 440
            },
            {
              "subject_name": "C1-6-D-35233",
              "subject_time": 1557227460,
              "event_value": 475.4
            },
            {
              "subject_name": "C1-6-D-35234",
              "subject_time": 1557227580,
              "event_value": 434.3
            },
            {
              "subject_name": "C1-6-D-35235",
              "subject_time": 1557230100,
              "event_value": 529.7
            },
            {
              "subject_name": "C1-6-D-35236",
              "subject_time": 1557229740,
              "event_value": 456.1
            },
            {
              "subject_name": "C1-6-D-35237",
              "subject_time": 1557230400,
              "event_value": 549.6
            },
            {
              "subject_name": "C1-6-D-35238",
              "subject_time": 1557230280,
              "event_value": 440.8
            },
            {
              "subject_name": "C1-6-D-35239",
              "subject_time": 1557230640,
              "event_value": 501
            },
            {
              "subject_name": "C1-6-D-35240",
              "subject_time": 1557229560,
              "event_value": 442.2
            },
            {
              "subject_name": "C1-6-D-35241",
              "subject_time": 1557221280,
              "event_value": 440.8
            },
            {
              "subject_name": "C1-6-D-35242",
              "subject_time": 1557231360,
              "event_value": 464.7
            },
            {
              "subject_name": "C1-6-D-35243",
              "subject_time": 1557231780,
              "event_value": 541.1
            },
            {
              "subject_name": "C1-6-D-35244",
              "subject_time": 1557231840,
              "event_value": 476.3
            },
            {
              "subject_name": "C1-6-D-35245",
              "subject_time": 1557232140,
              "event_value": 439.8
            },
            {
              "subject_name": "C1-6-D-35246",
              "subject_time": 1557240060,
              "event_value": 537.7
            },
            {
              "subject_name": "C1-6-D-35247",
              "subject_time": 1557240000,
              "event_value": 448.4
            },
            {
              "subject_name": "C1-6-D-35248",
              "subject_time": 1557240120,
              "event_value": 453.3
            },
            {
              "subject_name": "C1-6-D-35249",
              "subject_time": 1557240240,
              "event_value": 463.8
            },
            {
              "subject_name": "C1-6-D-35250",
              "subject_time": 1557240300,
              "event_value": 520.9
            },
            {
              "subject_name": "C1-6-D-35251",
              "subject_time": 1557240420,
              "event_value": 465.9
            },
            {
              "subject_name": "C1-6-D-35252",
              "subject_time": 1557242760,
              "event_value": 446.6
            },
            {
              "subject_name": "C1-6-D-35253",
              "subject_time": 1557241020,
              "event_value": ""
            },
            {
              "subject_name": "C1-6-D-35254",
              "subject_time": 1557242880,
              "event_value": 560.2
            },
            {
              "subject_name": "C1-6-D-35255",
              "subject_time": 1557243060,
              "event_value": 447.1
            },
            {
              "subject_name": "C1-6-D-35256",
              "subject_time": 1557243000,
              "event_value": 439.3
            },
            {
              "subject_name": "C1-6-D-35257",
              "subject_time": 1557243300,
              "event_value": 469.2
            },
            {
              "subject_name": "C1-6-D-35258",
              "subject_time": 1557257820,
              "event_value": 493.2
            },
            {
              "subject_name": "C1-6-D-35259",
              "subject_time": 1557257880,
              "event_value": 456.6
            },
            {
              "subject_name": "C1-6-D-35260",
              "subject_time": 1557258240,
              "event_value": 493.2
            },
            {
              "subject_name": "C1-6-D-35261",
              "subject_time": 1557258300,
              "event_value": 515.4
            },
            {
              "subject_name": "C1-6-D-35262",
              "subject_time": 1557258960,
              "event_value": 449.6
            },
            {
              "subject_name": "C1-6-D-35263",
              "subject_time": 1557258900,
              "event_value": 449.3
            },
            {
              "subject_name": "C1-6-D-35264",
              "subject_time": 1557263280,
              "event_value": 429
            },
            {
              "subject_name": "C1-6-D-35265",
              "subject_time": 1557263340,
              "event_value": 459.8
            },
            {
              "subject_name": "C1-6-D-35266",
              "subject_time": 1557264060,
              "event_value": 454.5
            },
            {
              "subject_name": "C1-6-D-35267",
              "subject_time": 1557264000,
              "event_value": 480.3
            },
            {
              "subject_name": "C1-6-D-35268",
              "subject_time": 1557264300,
              "event_value": 523.4
            },
            {
              "subject_name": "C1-6-D-35269",
              "subject_time": 1557264360,
              "event_value": 444.8
            },
            {
              "subject_name": "C1-6-D-35270",
              "subject_time": 1557307140,
              "event_value": 483
            },
            {
              "subject_name": "C1-6-D-35271",
              "subject_time": 1557307080,
              "event_value": 468.2
            },
            {
              "subject_name": "C1-6-D-35272",
              "subject_time": 1557307200,
              "event_value": 487.5
            },
            {
              "subject_name": "C1-6-D-35273",
              "subject_time": 1557307320,
              "event_value": 455.3
            },
            {
              "subject_name": "C1-6-D-35274",
              "subject_time": 1557307680,
              "event_value": 503.9
            },
            {
              "subject_name": "C1-6-D-35275",
              "subject_time": 1557307440,
              "event_value": 535.2
            },
            {
              "subject_name": "C1-6-D-35276",
              "subject_time": 1557302340,
              "event_value": 511.3
            },
            {
              "subject_name": "C1-6-D-35277",
              "subject_time": 1557302400,
              "event_value": 447.6
            },
            {
              "subject_name": "C1-6-D-35278",
              "subject_time": 1557302640,
              "event_value": 496.4
            },
            {
              "subject_name": "C1-6-D-35279",
              "subject_time": 1558351920,
              "event_value": 474.5
            },
            {
              "subject_name": "C1-6-D-35280",
              "subject_time": 1557309240,
              "event_value": 565.5
            },
            {
              "subject_name": "C1-6-D-35281",
              "subject_time": 1557309360,
              "event_value": 480.9
            },
            {
              "subject_name": "C1-6-D-35282",
              "subject_time": 1557313800,
              "event_value": 470.7
            },
            {
              "subject_name": "C1-6-D-35283",
              "subject_time": 1557313860,
              "event_value": 463.4
            },
            {
              "subject_name": "C1-6-D-35284",
              "subject_time": 1557314100,
              "event_value": 504.5
            },
            {
              "subject_name": "C1-6-D-35285",
              "subject_time": 1557300900,
              "event_value": 469.5
            },
            {
              "subject_name": "C1-6-D-35286",
              "subject_time": 1557301860,
              "event_value": 576.5
            },
            {
              "subject_name": "C1-6-D-35287",
              "subject_time": 1557301080,
              "event_value": 494.5
            },
            {
              "subject_name": "C1-6-D-35288",
              "subject_time": 1557325920,
              "event_value": 562.2
            },
            {
              "subject_name": "C1-6-D-35289",
              "subject_time": 1557326100,
              "event_value": 430.5
            },
            {
              "subject_name": "C1-6-D-35290",
              "subject_time": 1557326640,
              "event_value": 475
            },
            {
              "subject_name": "C1-6-D-35291",
              "subject_time": 1557327060,
              "event_value": 448.4
            },
            {
              "subject_name": "C1-6-D-35292",
              "subject_time": 1557325740,
              "event_value": ""
            },
            {
              "subject_name": "C1-6-D-35293",
              "subject_time": 1557328140,
              "event_value": 447.8
            },
            {
              "subject_name": "C1-6-D-35294",
              "subject_time": 1557343920,
              "event_value": 501.3
            },
            {
              "subject_name": "C1-6-D-35295",
              "subject_time": 1557344280,
              "event_value": 499.7
            },
            {
              "subject_name": "C1-6-D-35296",
              "subject_time": 1557344760,
              "event_value": 528.6
            },
            {
              "subject_name": "C1-6-D-35297",
              "subject_time": 1557344760,
              "event_value": 443.7
            },
            {
              "subject_name": "C1-6-D-35298",
              "subject_time": 1557345120,
              "event_value": 520
            },
            {
              "subject_name": "C1-6-D-35299",
              "subject_time": 1557345120,
              "event_value": 555
            },
            {
              "subject_name": "C1-6-D-34730",
              "subject_time": 1556116980,
              "event_value": 425.9
            },
            {
              "subject_name": "C1-6-D-34740",
              "subject_time": 1556019900,
              "event_value": ""
            },
            {
              "subject_name": "C1-6-D-34740",
              "subject_time": 1557393360,
              "event_value": ""
            },
            {
              "subject_name": "C1-6-D-34740",
              "subject_time": 1557996060,
              "event_value": 484.1
            },
            {
              "subject_name": "C1-6-D-34747",
              "subject_time": 1555918560,
              "event_value": 521.9
            },
            {
              "subject_name": "C1-6-D-34754",
              "subject_time": 1555917480,
              "event_value": ""
            },
            {
              "subject_name": "C1-6-D-34754",
              "subject_time": 1557394740,
              "event_value": 473.7
            },
            {
              "subject_name": "C1-6-D-34759",
              "subject_time": 1556021040,
              "event_value": 490.1
            },
            {
              "subject_name": "C1-6-D-34790",
              "subject_time": 1555961220,
              "event_value": 503.8
            },
            {
              "subject_name": "C1-6-D-34834",
              "subject_time": 1555918800,
              "event_value": 530.5
            },
            {
              "subject_name": "C1-6-D-34858",
              "subject_time": 1556020260,
              "event_value": ""
            },
            {
              "subject_name": "C1-6-D-34858",
              "subject_time": 1557394260,
              "event_value": 481.9
            },
            {
              "subject_name": "C1-6-D-34865",
              "subject_time": 1557523320,
              "event_value": 490.2
            },
            {
              "subject_name": "C1-6-D-35500",
              "subject_time": 1557909780,
              "event_value": 542.5
            },
            {
              "subject_name": "C1-6-D-35501",
              "subject_time": 1557909840,
              "event_value": 469.7
            },
            {
              "subject_name": "C1-6-D-35503",
              "subject_time": 1557910140,
              "event_value": 461.2
            },
            {
              "subject_name": "C1-6-D-35504",
              "subject_time": 1557910020,
              "event_value": 458.6
            },
            {
              "subject_name": "C1-6-D-35505",
              "subject_time": 1557911580,
              "event_value": 438.6
            },
            {
              "subject_name": "C1-6-D-35506",
              "subject_time": 1557918600,
              "event_value": 462
            },
            {
              "subject_name": "C1-6-D-35507",
              "subject_time": 1557914160,
              "event_value": 446.9
            },
            {
              "subject_name": "C1-6-D-35508",
              "subject_time": 1557918540,
              "event_value": 522.7
            },
            {
              "subject_name": "C1-6-D-35509",
              "subject_time": 1557918960,
              "event_value": 441.9
            },
            {
              "subject_name": "C1-6-D-35510",
              "subject_time": 1557918720,
              "event_value": 478.3
            },
            {
              "subject_name": "C1-6-D-35511",
              "subject_time": 1557919080,
              "event_value": 437.9
            },
            {
              "subject_name": "C1-6-D-35512",
              "subject_time": 1557924120,
              "event_value": 507.5
            },
            {
              "subject_name": "C1-6-D-35513",
              "subject_time": 1557923760,
              "event_value": 424.1
            },
            {
              "subject_name": "C1-6-D-35514",
              "subject_time": 1557922140,
              "event_value": 441.1
            },
            {
              "subject_name": "C1-6-D-35515",
              "subject_time": 1557922440,
              "event_value": 520.2
            },
            {
              "subject_name": "C1-6-D-35516",
              "subject_time": 1557922800,
              "event_value": 470.1
            },
            {
              "subject_name": "C1-6-D-35517",
              "subject_time": 1557922260,
              "event_value": 506.7
            },
            {
              "subject_name": "C1-6-D-35518",
              "subject_time": 1557922740,
              "event_value": 455
            },
            {
              "subject_name": "C1-6-D-35519",
              "subject_time": 1557922980,
              "event_value": 485.1
            },
            {
              "subject_name": "C1-6-D-35520",
              "subject_time": 1557930120,
              "event_value": 451.5
            },
            {
              "subject_name": "C1-6-D-35521",
              "subject_time": 1557930300,
              "event_value": 461.7
            },
            {
              "subject_name": "C1-6-D-35522",
              "subject_time": 1557930600,
              "event_value": 441.5
            },
            {
              "subject_name": "C1-6-D-35523",
              "subject_time": 1557930420,
              "event_value": 456.7
            },
            {
              "subject_name": "C1-6-D-35524",
              "subject_time": 1557930540,
              "event_value": 499.1
            },
            {
              "subject_name": "C1-6-D-35526",
              "subject_time": 1557948720,
              "event_value": 468.8
            },
            {
              "subject_name": "C1-6-D-35527",
              "subject_time": 1557948900,
              "event_value": 437.5
            },
            {
              "subject_name": "C1-6-D-35528",
              "subject_time": 1557949320,
              "event_value": 492.4
            },
            {
              "subject_name": "C1-6-D-35529",
              "subject_time": 1557949440,
              "event_value": 444.1
            },
            {
              "subject_name": "C1-6-D-35530",
              "subject_time": 1557992040,
              "event_value": 475.8
            },
            {
              "subject_name": "C1-6-D-35531",
              "subject_time": 1557950880,
              "event_value": 475.4
            },
            {
              "subject_name": "C1-6-D-35532",
              "subject_time": 1557992160,
              "event_value": 457.3
            },
            {
              "subject_name": "C1-6-D-35533",
              "subject_time": 1557992400,
              "event_value": 458.6
            },
            {
              "subject_name": "C1-6-D-35534",
              "subject_time": 1557992220,
              "event_value": 494.9
            },
            {
              "subject_name": "C1-6-D-35535",
              "subject_time": 1557992460,
              "event_value": 456.7
            },
            {
              "subject_name": "C1-6-D-35536",
              "subject_time": 1557992640,
              "event_value": 450.7
            },
            {
              "subject_name": "C1-6-D-35537",
              "subject_time": 1557992700,
              "event_value": 488.9
            },
            {
              "subject_name": "C1-6-D-35538",
              "subject_time": 1557993180,
              "event_value": 499.6
            },
            {
              "subject_name": "C1-6-D-35539",
              "subject_time": 1557955860,
              "event_value": 476.5
            },
            {
              "subject_name": "C1-6-D-35540",
              "subject_time": 1557955620,
              "event_value": 470.6
            },
            {
              "subject_name": "C1-6-D-35541",
              "subject_time": 1557956220,
              "event_value": 519.2
            },
            {
              "subject_name": "C1-6-D-35542",
              "subject_time": 1557956160,
              "event_value": 504.3
            },
            {
              "subject_name": "C1-6-D-35543",
              "subject_time": 1557956520,
              "event_value": 473.5
            },
            {
              "subject_name": "C1-6-D-35544",
              "subject_time": 1557999540,
              "event_value": 484.3
            },
            {
              "subject_name": "C1-6-D-35545",
              "subject_time": 1557999780,
              "event_value": 453.6
            },
            {
              "subject_name": "C1-6-D-35546",
              "subject_time": 1557999900,
              "event_value": 433.2
            },
            {
              "subject_name": "C1-6-D-35548",
              "subject_time": 1558000140,
              "event_value": 452
            },
            {
              "subject_name": "C1-6-D-35549",
              "subject_time": 1557999960,
              "event_value": 516.2
            },
            {
              "subject_name": "C1-6-D-35550",
              "subject_time": 1558000500,
              "event_value": 508.7
            },
            {
              "subject_name": "C1-6-D-35551",
              "subject_time": 1558006620,
              "event_value": 445.8
            },
            {
              "subject_name": "C1-6-D-35552",
              "subject_time": 1558006260,
              "event_value": 447.7
            },
            {
              "subject_name": "C1-6-D-35553",
              "subject_time": 1558006380,
              "event_value": 522.5
            },
            {
              "subject_name": "C1-6-D-35554",
              "subject_time": 1558006860,
              "event_value": 484
            },
            {
              "subject_name": "C1-6-D-35555",
              "subject_time": 1558007760,
              "event_value": 504.8
            },
            {
              "subject_name": "C1-6-D-35558",
              "subject_time": 1558011060,
              "event_value": 468.9
            },
            {
              "subject_name": "C1-6-D-35559",
              "subject_time": 1558011240,
              "event_value": 537.7
            },
            {
              "subject_name": "C1-6-D-35561",
              "subject_time": 1558010400,
              "event_value": 539.4
            },
            {
              "subject_name": "C1-6-D-35562",
              "subject_time": 1558010640,
              "event_value": 461.5
            },
            {
              "subject_name": "C1-6-D-35563",
              "subject_time": 1558010460,
              "event_value": 465.1
            },
            {
              "subject_name": "C1-6-D-35564",
              "subject_time": 1558010880,
              "event_value": 467.3
            },
            {
              "subject_name": "C1-6-D-35565",
              "subject_time": 1558010820,
              "event_value": 446.7
            },
            {
              "subject_name": "C1-6-D-35566",
              "subject_time": 1558011000,
              "event_value": 445.3
            },
            {
              "subject_name": "C1-6-D-35567",
              "subject_time": 1558037220,
              "event_value": 487.2
            },
            {
              "subject_name": "C1-6-D-35568",
              "subject_time": 1558016340,
              "event_value": 437.7
            },
            {
              "subject_name": "C1-6-D-35569",
              "subject_time": 1558016520,
              "event_value": 451.4
            },
            {
              "subject_name": "C1-6-D-35570",
              "subject_time": 1558017480,
              "event_value": 506.7
            },
            {
              "subject_name": "C1-6-D-35571",
              "subject_time": 1558016760,
              "event_value": 476.7
            },
            {
              "subject_name": "C1-6-D-35572",
              "subject_time": 1558016880,
              "event_value": 434.8
            },
            {
              "subject_name": "C1-6-D-35573",
              "subject_time": 1558017840,
              "event_value": 429.5
            },
            {
              "subject_name": "C1-6-D-35574",
              "subject_time": 1558037280,
              "event_value": 465.6
            },
            {
              "subject_name": "C1-6-D-35575",
              "subject_time": 1558039980,
              "event_value": 534.8
            },
            {
              "subject_name": "C1-6-D-35576",
              "subject_time": 1558038120,
              "event_value": 587.5
            },
            {
              "subject_name": "C1-6-D-35577",
              "subject_time": 1558038540,
              "event_value": 495.8
            },
            {
              "subject_name": "C1-6-D-35578",
              "subject_time": 1558040220,
              "event_value": 456.6
            },
            {
              "subject_name": "C1-6-D-35579",
              "subject_time": 1558078920,
              "event_value": 475.2
            },
            {
              "subject_name": "C1-6-D-35580",
              "subject_time": 1558079100,
              "event_value": 477.9
            },
            {
              "subject_name": "C1-6-D-35581",
              "subject_time": 1558078980,
              "event_value": 436.7
            },
            {
              "subject_name": "C1-6-D-35582",
              "subject_time": 1558079220,
              "event_value": 504
            },
            {
              "subject_name": "C1-6-D-35583",
              "subject_time": 1558079460,
              "event_value": 450.3
            },
            {
              "subject_name": "C1-6-D-35584",
              "subject_time": 1558079640,
              "event_value": 438.9
            },
            {
              "subject_name": "C1-6-D-35585",
              "subject_time": 1558080300,
              "event_value": 483.9
            },
            {
              "subject_name": "C1-6-D-35586",
              "subject_time": 1558080480,
              "event_value": 428.5
            },
            {
              "subject_name": "C1-6-D-35587",
              "subject_time": 1558080540,
              "event_value": 461.9
            },
            {
              "subject_name": "C1-6-D-35589",
              "subject_time": 1558081080,
              "event_value": 477.6
            },
            {
              "subject_name": "C1-6-D-35591",
              "subject_time": 1558080900,
              "event_value": 470.5
            },
            {
              "subject_name": "C1-6-D-35592",
              "subject_time": 1558082460,
              "event_value": 478.9
            },
            {
              "subject_name": "C1-6-D-35593",
              "subject_time": 1558082700,
              "event_value": 495.4
            },
            {
              "subject_name": "C1-6-D-35594",
              "subject_time": 1558083000,
              "event_value": 536.5
            },
            {
              "subject_name": "C1-6-D-35595",
              "subject_time": 1558082880,
              "event_value": 491.5
            },
            {
              "subject_name": "C1-6-D-35596",
              "subject_time": 1558084680,
              "event_value": 483.9
            },
            {
              "subject_name": "C1-6-D-35597",
              "subject_time": 1558084140,
              "event_value": 468.8
            },
            {
              "subject_name": "C1-6-D-35598",
              "subject_time": 1558094040,
              "event_value": 549.6
            },
            {
              "subject_name": "C1-6-D-35599",
              "subject_time": 1558093860,
              "event_value": 513.8
            },
            {
              "subject_name": "C1-6-D-35600",
              "subject_time": 1558094400,
              "event_value": 548.5
            },
            {
              "subject_name": "C1-6-D-35601",
              "subject_time": 1558094340,
              "event_value": 567
            },
            {
              "subject_name": "C1-6-D-35602",
              "subject_time": 1558094580,
              "event_value": 454.6
            },
            {
              "subject_name": "C1-6-D-35604",
              "subject_time": 1558094160,
              "event_value": 474.2
            },
            {
              "subject_name": "C1-6-D-35605",
              "subject_time": 1558094640,
              "event_value": 478
            },
            {
              "subject_name": "C1-6-D-35606",
              "subject_time": 1558096260,
              "event_value": 428.3
            },
            {
              "subject_name": "C1-6-D-35607",
              "subject_time": 1558096080,
              "event_value": 492.1
            },
            {
              "subject_name": "C1-6-D-35608",
              "subject_time": 1558096380,
              "event_value": 432.9
            },
            {
              "subject_name": "C1-6-D-35609",
              "subject_time": 1558096620,
              "event_value": 488.5
            },
            {
              "subject_name": "C1-6-D-35610",
              "subject_time": 1558096740,
              "event_value": 430.8
            },
            {
              "subject_name": "C1-6-D-35611",
              "subject_time": 1558097040,
              "event_value": 471.9
            },
            {
              "subject_name": "C1-6-D-35612",
              "subject_time": 1558104000,
              "event_value": 447.7
            },
            {
              "subject_name": "C1-6-D-35613",
              "subject_time": 1558104060,
              "event_value": 490.6
            },
            {
              "subject_name": "C1-6-D-35614",
              "subject_time": 1558104240,
              "event_value": 460.4
            },
            {
              "subject_name": "C1-6-D-35615",
              "subject_time": 1558104180,
              "event_value": 482.1
            },
            {
              "subject_name": "C1-6-D-35616",
              "subject_time": 1558104480,
              "event_value": 523.5
            },
            {
              "subject_name": "C1-6-D-35617",
              "subject_time": 1558104420,
              "event_value": 500
            },
            {
              "subject_name": "C1-6-D-35618",
              "subject_time": 1558121460,
              "event_value": 498.7
            },
            {
              "subject_name": "C1-6-D-35619",
              "subject_time": 1558121340,
              "event_value": 534.5
            },
            {
              "subject_name": "C1-6-D-35620",
              "subject_time": 1558122000,
              "event_value": 477.8
            },
            {
              "subject_name": "C1-6-D-35621",
              "subject_time": 1558122060,
              "event_value": 457.4
            },
            {
              "subject_name": "C1-6-D-35622",
              "subject_time": 1558122660,
              "event_value": 517.5
            },
            {
              "subject_name": "C1-6-D-35623",
              "subject_time": 1558122300,
              "event_value": 474.3
            },
            {
              "subject_name": "C1-6-D-35624",
              "subject_time": 1558126500,
              "event_value": 498.7
            },
            {
              "subject_name": "C1-6-D-35625",
              "subject_time": 1558126560,
              "event_value": 457.3
            },
            {
              "subject_name": "C1-6-D-35626",
              "subject_time": 1558127100,
              "event_value": 470.8
            },
            {
              "subject_name": "C1-6-D-35628",
              "subject_time": 1558127040,
              "event_value": 458.1
            },
            {
              "subject_name": "C1-6-D-35629",
              "subject_time": 1558127880,
              "event_value": 542.5
            },
            {
              "subject_name": "C1-6-D-35630",
              "subject_time": 1558127880,
              "event_value": 593.7
            },
            {
              "subject_name": "C1-6-D-35631",
              "subject_time": 1558338060,
              "event_value": 517.3
            },
            {
              "subject_name": "C1-6-D-35632",
              "subject_time": 1558338360,
              "event_value": 458.9
            },
            {
              "subject_name": "C1-6-D-35633",
              "subject_time": 1558338840,
              "event_value": 443
            },
            {
              "subject_name": "C1-6-D-35634",
              "subject_time": 1558338360,
              "event_value": 516.5
            },
            {
              "subject_name": "C1-6-D-35635",
              "subject_time": 1558338720,
              "event_value": 452.6
            },
            {
              "subject_name": "C1-6-D-35636",
              "subject_time": 1558338900,
              "event_value": 462.3
            },
            {
              "subject_name": "C1-6-D-35637",
              "subject_time": 1558343940,
              "event_value": 515.1
            },
            {
              "subject_name": "C1-6-D-35638",
              "subject_time": 1558344240,
              "event_value": 466.7
            },
            {
              "subject_name": "C1-6-D-35639",
              "subject_time": 1558354800,
              "event_value": 449.5
            },
            {
              "subject_name": "C1-6-D-35640",
              "subject_time": 1558355040,
              "event_value": 463.3
            },
            {
              "subject_name": "C1-6-D-35641",
              "subject_time": 1558355280,
              "event_value": 533.6
            },
            {
              "subject_name": "C1-6-D-35642",
              "subject_time": 1558355340,
              "event_value": 458.2
            },
            {
              "subject_name": "C1-6-D-35643",
              "subject_time": 1558355460,
              "event_value": 437.9
            },
            {
              "subject_name": "C1-6-D-35644",
              "subject_time": 1558355580,
              "event_value": 486.2
            },
            {
              "subject_name": "C1-6-D-35645",
              "subject_time": 1558353180,
              "event_value": 446.3
            },
            {
              "subject_name": "C1-6-D-35646",
              "subject_time": 1558352280,
              "event_value": 500.9
            },
            {
              "subject_name": "C1-6-D-35647",
              "subject_time": 1558353000,
              "event_value": 477
            },
            {
              "subject_name": "C1-6-D-35648",
              "subject_time": 1558353060,
              "event_value": 488.6
            },
            {
              "subject_name": "C1-6-D-35649",
              "subject_time": 1558353240,
              "event_value": 493.3
            },
            {
              "subject_name": "C1-6-D-35650",
              "subject_time": 1558355700,
              "event_value": 476.7
            },
            {
              "subject_name": "C1-6-D-35651",
              "subject_time": 1558380720,
              "event_value": 518
            },
            {
              "subject_name": "C1-6-D-35652",
              "subject_time": 1558381260,
              "event_value": 485.5
            },
            {
              "subject_name": "C1-6-D-35653",
              "subject_time": 1558381140,
              "event_value": 462.4
            },
            {
              "subject_name": "C1-6-D-35654",
              "subject_time": 1558381680,
              "event_value": 491.1
            },
            {
              "subject_name": "C1-6-D-35655",
              "subject_time": 1558381680,
              "event_value": 508.1
            },
            {
              "subject_name": "C1-6-D-35656",
              "subject_time": 1558382220,
              "event_value": 466.5
            },
            {
              "subject_name": "C1-6-D-35657",
              "subject_time": 1558387560,
              "event_value": 554.5
            },
            {
              "subject_name": "C1-6-D-35658",
              "subject_time": 1558388040,
              "event_value": 454.9
            },
            {
              "subject_name": "C1-6-D-35660",
              "subject_time": 1558387980,
              "event_value": 489.7
            },
            {
              "subject_name": "C1-6-D-35661",
              "subject_time": 1558388700,
              "event_value": 503.8
            },
            {
              "subject_name": "C1-6-D-35663",
              "subject_time": 1558388520,
              "event_value": 507.9
            },
            {
              "subject_name": "C1-6-D-35664",
              "subject_time": 1558389120,
              "event_value": 499.4
            },
            {
              "subject_name": "C1-6-D-35665",
              "subject_time": 1558427400,
              "event_value": 567.5
            },
            {
              "subject_name": "C1-6-D-35666",
              "subject_time": 1558427880,
              "event_value": 566.7
            },
            {
              "subject_name": "C1-6-D-35667",
              "subject_time": 1558428000,
              "event_value": 465.9
            },
            {
              "subject_name": "C1-6-D-35668",
              "subject_time": 1558428480,
              "event_value": 515.2
            },
            {
              "subject_name": "C1-6-D-35669",
              "subject_time": 1558428180,
              "event_value": 481
            },
            {
              "subject_name": "C1-6-D-35670",
              "subject_time": 1558428600,
              "event_value": 489.5
            },
            {
              "subject_name": "C1-6-D-35671",
              "subject_time": 1558439340,
              "event_value": 507
            },
            {
              "subject_name": "C1-6-D-35673",
              "subject_time": 1558438380,
              "event_value": 477.3
            },
            {
              "subject_name": "C1-6-D-35675",
              "subject_time": 1558439460,
              "event_value": 420.7
            },
            {
              "subject_name": "C1-6-D-35676",
              "subject_time": 1558439520,
              "event_value": 492.1
            },
            {
              "subject_name": "C1-6-D-35677",
              "subject_time": 1558439700,
              "event_value": 462
            },
            {
              "subject_name": "C1-6-D-35678",
              "subject_time": 1558441500,
              "event_value": 460.2
            },
            {
              "subject_name": "C1-6-D-35679",
              "subject_time": 1558441560,
              "event_value": 433.4
            },
            {
              "subject_name": "C1-6-D-35680",
              "subject_time": 1558441680,
              "event_value": 417.8
            },
            {
              "subject_name": "C1-6-D-35681",
              "subject_time": 1558441740,
              "event_value": 431.7
            },
            {
              "subject_name": "C1-6-D-35682",
              "subject_time": 1558441860,
              "event_value": 448
            },
            {
              "subject_name": "C1-6-D-35683",
              "subject_time": 1558442220,
              "event_value": 426.7
            },
            {
              "subject_name": "C1-6-D-35685",
              "subject_time": 1558467540,
              "event_value": 439.1
            },
            {
              "subject_name": "C1-6-D-35686",
              "subject_time": 1558467480,
              "event_value": 471
            },
            {
              "subject_name": "C1-6-D-35687",
              "subject_time": 1558467900,
              "event_value": 450.6
            },
            {
              "subject_name": "C1-6-D-35688",
              "subject_time": 1558468080,
              "event_value": 441.4
            },
            {
              "subject_name": "C1-6-D-35689",
              "subject_time": 1558468380,
              "event_value": 455.2
            },
            {
              "subject_name": "C1-6-D-35690",
              "subject_time": 1558468380,
              "event_value": 520.7
            },
            {
              "subject_name": "C1-6-D-35300",
              "subject_time": 1557345960,
              "event_value": 510
            },
            {
              "subject_name": "C1-6-D-35301",
              "subject_time": 1557346080,
              "event_value": 464
            },
            {
              "subject_name": "C1-6-D-35302",
              "subject_time": 1557346740,
              "event_value": 457.7
            },
            {
              "subject_name": "C1-6-D-35303",
              "subject_time": 1557346440,
              "event_value": 476.8
            },
            {
              "subject_name": "C1-6-D-35304",
              "subject_time": 1557346980,
              "event_value": 541.5
            },
            {
              "subject_name": "C1-6-D-35305",
              "subject_time": 1557346980,
              "event_value": 474.2
            },
            {
              "subject_name": "C1-6-D-35306",
              "subject_time": 1557349200,
              "event_value": 547.1
            },
            {
              "subject_name": "C1-6-D-35307",
              "subject_time": 1557349260,
              "event_value": 510.9
            },
            {
              "subject_name": "C1-6-D-35308",
              "subject_time": 1557349800,
              "event_value": 466.8
            },
            {
              "subject_name": "C1-6-D-35309",
              "subject_time": 1557349620,
              "event_value": 522.4
            },
            {
              "subject_name": "C1-6-D-35310",
              "subject_time": 1557350100,
              "event_value": 489.4
            },
            {
              "subject_name": "C1-6-D-35311",
              "subject_time": 1557350100,
              "event_value": 466.4
            },
            {
              "subject_name": "C1-6-D-35312",
              "subject_time": 1557402060,
              "event_value": 453.7
            },
            {
              "subject_name": "C1-6-D-35313",
              "subject_time": 1557401940,
              "event_value": 471
            },
            {
              "subject_name": "C1-6-D-35314",
              "subject_time": 1557402120,
              "event_value": 486
            },
            {
              "subject_name": "C1-6-D-35315",
              "subject_time": 1557402420,
              "event_value": 486.5
            },
            {
              "subject_name": "C1-6-D-35316",
              "subject_time": 1557402480,
              "event_value": 512.2
            },
            {
              "subject_name": "C1-6-D-35317",
              "subject_time": 1557402720,
              "event_value": 444
            },
            {
              "subject_name": "C1-6-D-35318",
              "subject_time": 1558034820,
              "event_value": 453.7
            },
            {
              "subject_name": "C1-6-D-35319",
              "subject_time": 1557394440,
              "event_value": 442.7
            },
            {
              "subject_name": "C1-6-D-35320",
              "subject_time": 1557394980,
              "event_value": 467.5
            },
            {
              "subject_name": "C1-6-D-35321",
              "subject_time": 1557409260,
              "event_value": 442.3
            },
            {
              "subject_name": "C1-6-D-35322",
              "subject_time": 1557409080,
              "event_value": 452.3
            },
            {
              "subject_name": "C1-6-D-35323",
              "subject_time": 1557409380,
              "event_value": 457.3
            },
            {
              "subject_name": "C1-6-D-35324",
              "subject_time": 1557409680,
              "event_value": 418.5
            },
            {
              "subject_name": "C1-6-D-35325",
              "subject_time": 1557409740,
              "event_value": 509
            },
            {
              "subject_name": "C1-6-D-35326",
              "subject_time": 1557409560,
              "event_value": 479.9
            },
            {
              "subject_name": "C1-6-D-35327",
              "subject_time": 1557392760,
              "event_value": 479.6
            },
            {
              "subject_name": "C1-6-D-35328",
              "subject_time": 1557393300,
              "event_value": 467.2
            },
            {
              "subject_name": "C1-6-D-35329",
              "subject_time": 1557392880,
              "event_value": 491.3
            },
            {
              "subject_name": "C1-6-D-35331",
              "subject_time": 1557413580,
              "event_value": 509.1
            },
            {
              "subject_name": "C1-6-D-35332",
              "subject_time": 1557414660,
              "event_value": 476.2
            },
            {
              "subject_name": "C1-6-D-35333",
              "subject_time": 1557414720,
              "event_value": 501.4
            },
            {
              "subject_name": "C1-6-D-35334",
              "subject_time": 1557414900,
              "event_value": 456.4
            },
            {
              "subject_name": "C1-6-D-35335",
              "subject_time": 1557415080,
              "event_value": ""
            },
            {
              "subject_name": "C1-6-D-35336",
              "subject_time": 1557414480,
              "event_value": 438.2
            },
            {
              "subject_name": "C1-6-D-35337",
              "subject_time": 1557411600,
              "event_value": 430.6
            },
            {
              "subject_name": "C1-6-D-35338",
              "subject_time": 1557411780,
              "event_value": 425.3
            },
            {
              "subject_name": "C1-6-D-35339",
              "subject_time": 1557412380,
              "event_value": 466.2
            },
            {
              "subject_name": "C1-6-D-35340",
              "subject_time": 1557411960,
              "event_value": 472.8
            },
            {
              "subject_name": "C1-6-D-35341",
              "subject_time": 1557412740,
              "event_value": 501.9
            },
            {
              "subject_name": "C1-6-D-35342",
              "subject_time": 1557412260,
              "event_value": 449.6
            },
            {
              "subject_name": "C1-6-D-35343",
              "subject_time": 1557432480,
              "event_value": 463.4
            },
            {
              "subject_name": "C1-6-D-35344",
              "subject_time": 1557432600,
              "event_value": 531.6
            },
            {
              "subject_name": "C1-6-D-35346",
              "subject_time": 1557433020,
              "event_value": 519.7
            },
            {
              "subject_name": "C1-6-D-35347",
              "subject_time": 1557433080,
              "event_value": 433.9
            },
            {
              "subject_name": "C1-6-D-35348",
              "subject_time": 1558035060,
              "event_value": 521.3
            },
            {
              "subject_name": "C1-6-D-35349",
              "subject_time": 1557433440,
              "event_value": 464.6
            },
            {
              "subject_name": "C1-6-D-35350",
              "subject_time": 1557473760,
              "event_value": 550.6
            },
            {
              "subject_name": "C1-6-D-35351",
              "subject_time": 1557473820,
              "event_value": 447.9
            },
            {
              "subject_name": "C1-6-D-35352",
              "subject_time": 1557473940,
              "event_value": 515.9
            },
            {
              "subject_name": "C1-6-D-35353",
              "subject_time": 1557474060,
              "event_value": 444.4
            },
            {
              "subject_name": "C1-6-D-35354",
              "subject_time": 1557474240,
              "event_value": 552.8
            },
            {
              "subject_name": "C1-6-D-35355",
              "subject_time": 1557474240,
              "event_value": 462.1
            },
            {
              "subject_name": "C1-6-D-35356",
              "subject_time": 1557476880,
              "event_value": 509.7
            },
            {
              "subject_name": "C1-6-D-35357",
              "subject_time": 1557476820,
              "event_value": 484
            },
            {
              "subject_name": "C1-6-D-35359",
              "subject_time": 1557477600,
              "event_value": 478
            },
            {
              "subject_name": "C1-6-D-35360",
              "subject_time": 1557477240,
              "event_value": 494.1
            },
            {
              "subject_name": "C1-6-D-35361",
              "subject_time": 1557477180,
              "event_value": 460.6
            },
            {
              "subject_name": "C1-6-D-35362",
              "subject_time": 1557477600,
              "event_value": 472.8
            },
            {
              "subject_name": "C1-6-D-35363",
              "subject_time": 1557489900,
              "event_value": 550.7
            },
            {
              "subject_name": "C1-6-D-35364",
              "subject_time": 1557490080,
              "event_value": 457.5
            },
            {
              "subject_name": "C1-6-D-35365",
              "subject_time": 1557490140,
              "event_value": 475.5
            },
            {
              "subject_name": "C1-6-D-35366",
              "subject_time": 1557490260,
              "event_value": 474.2
            },
            {
              "subject_name": "C1-6-D-35367",
              "subject_time": 1557490440,
              "event_value": 453.8
            },
            {
              "subject_name": "C1-6-D-35368",
              "subject_time": 1557491520,
              "event_value": 484.4
            },
            {
              "subject_name": "C1-6-D-35369",
              "subject_time": 1557492000,
              "event_value": 507.1
            },
            {
              "subject_name": "C1-6-D-35370",
              "subject_time": 1557491700,
              "event_value": 439.5
            },
            {
              "subject_name": "C1-6-D-35371",
              "subject_time": 1557492240,
              "event_value": 429.7
            },
            {
              "subject_name": "C1-6-D-35373",
              "subject_time": 1557492300,
              "event_value": 457.4
            },
            {
              "subject_name": "C1-6-D-35374",
              "subject_time": 1557492360,
              "event_value": 485.5
            },
            {
              "subject_name": "C1-6-D-35375",
              "subject_time": 1557474960,
              "event_value": 472.1
            },
            {
              "subject_name": "C1-6-D-35376",
              "subject_time": 1557489960,
              "event_value": 444.3
            },
            {
              "subject_name": "C1-6-D-35377",
              "subject_time": 1557498060,
              "event_value": 520.4
            },
            {
              "subject_name": "C1-6-D-35378",
              "subject_time": 1557498180,
              "event_value": 539
            },
            {
              "subject_name": "C1-6-D-35379",
              "subject_time": 1557498240,
              "event_value": 503.9
            },
            {
              "subject_name": "C1-6-D-35380",
              "subject_time": 1557498600,
              "event_value": 483.2
            },
            {
              "subject_name": "C1-6-D-35381",
              "subject_time": 1557498660,
              "event_value": 518.3
            },
            {
              "subject_name": "C1-6-D-35382",
              "subject_time": 1557498360,
              "event_value": 503
            },
            {
              "subject_name": "C1-6-D-35383",
              "subject_time": 1557500580,
              "event_value": 511.8
            },
            {
              "subject_name": "C1-6-D-35384",
              "subject_time": 1557501000,
              "event_value": 483.9
            },
            {
              "subject_name": "C1-6-D-35385",
              "subject_time": 1557501960,
              "event_value": 531.8
            },
            {
              "subject_name": "C1-6-D-35387",
              "subject_time": 1557501900,
              "event_value": 437.5
            },
            {
              "subject_name": "C1-6-D-35388",
              "subject_time": 1557502320,
              "event_value": 491.9
            },
            {
              "subject_name": "C1-6-D-35389",
              "subject_time": 1557502740,
              "event_value": 530.6
            },
            {
              "subject_name": "C1-6-D-35391",
              "subject_time": 1557500700,
              "event_value": 506.2
            },
            {
              "subject_name": "C1-6-D-35392",
              "subject_time": 1557500820,
              "event_value": 550.8
            },
            {
              "subject_name": "C1-6-D-35393",
              "subject_time": 1557501480,
              "event_value": 446.9
            },
            {
              "subject_name": "C1-6-D-35394",
              "subject_time": 1558035300,
              "event_value": 451.7
            },
            {
              "subject_name": "C1-6-D-35395",
              "subject_time": 1557500940,
              "event_value": 460.7
            },
            {
              "subject_name": "C1-6-D-35396",
              "subject_time": 1557516660,
              "event_value": 471.1
            },
            {
              "subject_name": "C1-6-D-35397",
              "subject_time": 1557516720,
              "event_value": 511.7
            },
            {
              "subject_name": "C1-6-D-35398",
              "subject_time": 1557517140,
              "event_value": 509.1
            },
            {
              "subject_name": "C1-6-D-35399",
              "subject_time": 1557517440,
              "event_value": 462.3
            },
            {
              "subject_name": "C1-6-D-35400",
              "subject_time": 1557517860,
              "event_value": 459.7
            },
            {
              "subject_name": "C1-6-D-35401",
              "subject_time": 1557517860,
              "event_value": 440.9
            },
            {
              "subject_name": "C1-6-D-35403",
              "subject_time": 1557734280,
              "event_value": 440.3
            },
            {
              "subject_name": "C1-6-D-35404",
              "subject_time": 1557734520,
              "event_value": 452
            },
            {
              "subject_name": "C1-6-D-35405",
              "subject_time": 1557734400,
              "event_value": 499.8
            },
            {
              "subject_name": "C1-6-D-35406",
              "subject_time": 1557734640,
              "event_value": 488.7
            },
            {
              "subject_name": "C1-6-D-35407",
              "subject_time": 1557734760,
              "event_value": 460.3
            },
            {
              "subject_name": "C1-6-D-35408",
              "subject_time": 1557523980,
              "event_value": 454.2
            },
            {
              "subject_name": "C1-6-D-35409",
              "subject_time": 1557524280,
              "event_value": 467
            },
            {
              "subject_name": "C1-6-D-35410",
              "subject_time": 1557524520,
              "event_value": 483.8
            },
            {
              "subject_name": "C1-6-D-35411",
              "subject_time": 1557746340,
              "event_value": 502.5
            },
            {
              "subject_name": "C1-6-D-35412",
              "subject_time": 1557746280,
              "event_value": 477.1
            },
            {
              "subject_name": "C1-6-D-35414",
              "subject_time": 1557747360,
              "event_value": 449.5
            },
            {
              "subject_name": "C1-6-D-35415",
              "subject_time": 1557747480,
              "event_value": 465.3
            },
            {
              "subject_name": "C1-6-D-35416",
              "subject_time": 1557747240,
              "event_value": 466.5
            },
            {
              "subject_name": "C1-6-D-35417",
              "subject_time": 1557747120,
              "event_value": 438.9
            },
            {
              "subject_name": "C1-6-D-35418",
              "subject_time": 1557741000,
              "event_value": 462.1
            },
            {
              "subject_name": "C1-6-D-35419",
              "subject_time": 1557741180,
              "event_value": 463.4
            },
            {
              "subject_name": "C1-6-D-35420",
              "subject_time": 1557745680,
              "event_value": 438
            },
            {
              "subject_name": "C1-6-D-35421",
              "subject_time": 1557758760,
              "event_value": 441.5
            },
            {
              "subject_name": "C1-6-D-35422",
              "subject_time": 1557758820,
              "event_value": 442.4
            },
            {
              "subject_name": "C1-6-D-35423",
              "subject_time": 1557759000,
              "event_value": 460.7
            },
            {
              "subject_name": "C1-6-D-35424",
              "subject_time": 1557759600,
              "event_value": 448.1
            },
            {
              "subject_name": "C1-6-D-35425",
              "subject_time": 1557759060,
              "event_value": 451.6
            },
            {
              "subject_name": "C1-6-D-35426",
              "subject_time": 1557759660,
              "event_value": 481.1
            },
            {
              "subject_name": "C1-6-D-35427",
              "subject_time": 1557759960,
              "event_value": 449.9
            },
            {
              "subject_name": "C1-6-D-35428",
              "subject_time": 1557760080,
              "event_value": 426.4
            },
            {
              "subject_name": "C1-6-D-35430",
              "subject_time": 1557760260,
              "event_value": 475.9
            },
            {
              "subject_name": "C1-6-D-35431",
              "subject_time": 1557760380,
              "event_value": 479.5
            },
            {
              "subject_name": "C1-6-D-35432",
              "subject_time": 1557760440,
              "event_value": 502.5
            },
            {
              "subject_name": "C1-6-D-35433",
              "subject_time": 1557760560,
              "event_value": 515.2
            },
            {
              "subject_name": "C1-6-D-35434",
              "subject_time": 1557777000,
              "event_value": 493.3
            },
            {
              "subject_name": "C1-6-D-35435",
              "subject_time": 1557777360,
              "event_value": 500.6
            },
            {
              "subject_name": "C1-6-D-35436",
              "subject_time": 1557777720,
              "event_value": 496.4
            },
            {
              "subject_name": "C1-6-D-35437",
              "subject_time": 1557778020,
              "event_value": 461.3
            },
            {
              "subject_name": "C1-6-D-35438",
              "subject_time": 1557778320,
              "event_value": 478.7
            },
            {
              "subject_name": "C1-6-D-35439",
              "subject_time": 1557778620,
              "event_value": 571.6
            },
            {
              "subject_name": "C1-6-D-35440",
              "subject_time": 1557781500,
              "event_value": 503
            },
            {
              "subject_name": "C1-6-D-35441",
              "subject_time": 1557781440,
              "event_value": 436.6
            },
            {
              "subject_name": "C1-6-D-35442",
              "subject_time": 1557782160,
              "event_value": 562.5
            },
            {
              "subject_name": "C1-6-D-35443",
              "subject_time": 1557782160,
              "event_value": 498.3
            },
            {
              "subject_name": "C1-6-D-35444",
              "subject_time": 1557782400,
              "event_value": 462.5
            },
            {
              "subject_name": "C1-6-D-35445",
              "subject_time": 1557782640,
              "event_value": 461.7
            },
            {
              "subject_name": "C1-6-D-35446",
              "subject_time": 1557818940,
              "event_value": 473
            },
            {
              "subject_name": "C1-6-D-35447",
              "subject_time": 1557819000,
              "event_value": 499.8
            },
            {
              "subject_name": "C1-6-D-35448",
              "subject_time": 1557819480,
              "event_value": 452.2
            },
            {
              "subject_name": "C1-6-D-35449",
              "subject_time": 1557819420,
              "event_value": 446.8
            },
            {
              "subject_name": "C1-6-D-35450",
              "subject_time": 1557819660,
              "event_value": 541.9
            },
            {
              "subject_name": "C1-6-D-35451",
              "subject_time": 1557819780,
              "event_value": 374.8
            },
            {
              "subject_name": "C1-6-D-35452",
              "subject_time": 1557827640,
              "event_value": 515.2
            },
            {
              "subject_name": "C1-6-D-35453",
              "subject_time": 1557827460,
              "event_value": 495.4
            },
            {
              "subject_name": "C1-6-D-35454",
              "subject_time": 1557827820,
              "event_value": 493.2
            },
            {
              "subject_name": "C1-6-D-35455",
              "subject_time": 1557827940,
              "event_value": 457.8
            },
            {
              "subject_name": "C1-6-D-35456",
              "subject_time": 1557832320,
              "event_value": 487.2
            },
            {
              "subject_name": "C1-6-D-35457",
              "subject_time": 1557832620,
              "event_value": 463.9
            },
            {
              "subject_name": "C1-6-D-35458",
              "subject_time": 1557833340,
              "event_value": 490.8
            },
            {
              "subject_name": "C1-6-D-35459",
              "subject_time": 1557833580,
              "event_value": 493.5
            },
            {
              "subject_name": "C1-6-D-35460",
              "subject_time": 1557834900,
              "event_value": 554.7
            },
            {
              "subject_name": "C1-6-D-35461",
              "subject_time": 1557834720,
              "event_value": 504
            },
            {
              "subject_name": "C1-6-D-35462",
              "subject_time": 1557835260,
              "event_value": 459.7
            },
            {
              "subject_name": "C1-6-D-35463",
              "subject_time": 1557834660,
              "event_value": 447.5
            },
            {
              "subject_name": "C1-6-D-35464",
              "subject_time": 1557820560,
              "event_value": 438.8
            },
            {
              "subject_name": "C1-6-D-35465",
              "subject_time": 1557820920,
              "event_value": 546.9
            },
            {
              "subject_name": "C1-6-D-35467",
              "subject_time": 1557820620,
              "event_value": 433.3
            },
            {
              "subject_name": "C1-6-D-35468",
              "subject_time": 1557835980,
              "event_value": 510
            },
            {
              "subject_name": "C1-6-D-35469",
              "subject_time": 1557836520,
              "event_value": 368.3
            },
            {
              "subject_name": "C1-6-D-35470",
              "subject_time": 1557844440,
              "event_value": 489.4
            },
            {
              "subject_name": "C1-6-D-35471",
              "subject_time": 1557844440,
              "event_value": 440.1
            },
            {
              "subject_name": "C1-6-D-35472",
              "subject_time": 1557845340,
              "event_value": 430
            },
            {
              "subject_name": "C1-6-D-35473",
              "subject_time": 1557845160,
              "event_value": 488.4
            },
            {
              "subject_name": "C1-6-D-35474",
              "subject_time": 1557845520,
              "event_value": 487.4
            },
            {
              "subject_name": "C1-6-D-35475",
              "subject_time": 1557845640,
              "event_value": 446.8
            },
            {
              "subject_name": "C1-6-D-35476",
              "subject_time": 1557846300,
              "event_value": 549.4
            },
            {
              "subject_name": "C1-6-D-35478",
              "subject_time": 1557846540,
              "event_value": 450
            },
            {
              "subject_name": "C1-6-D-35479",
              "subject_time": 1557846600,
              "event_value": 462.4
            },
            {
              "subject_name": "C1-6-D-35480",
              "subject_time": 1557846420,
              "event_value": 469.6
            },
            {
              "subject_name": "C1-6-D-35481",
              "subject_time": 1557846900,
              "event_value": 434.9
            },
            {
              "subject_name": "C1-6-D-35482",
              "subject_time": 1557864480,
              "event_value": 527
            },
            {
              "subject_name": "C1-6-D-35483",
              "subject_time": 1557862260,
              "event_value": ""
            },
            {
              "subject_name": "C1-6-D-35484",
              "subject_time": 1557865200,
              "event_value": 543.2
            },
            {
              "subject_name": "C1-6-D-35485",
              "subject_time": 1557865320,
              "event_value": 469.2
            },
            {
              "subject_name": "C1-6-D-35486",
              "subject_time": 1557865680,
              "event_value": 462.9
            },
            {
              "subject_name": "C1-6-D-35487",
              "subject_time": 1557865680,
              "event_value": 538.1
            },
            {
              "subject_name": "C1-6-D-35488",
              "subject_time": 1557905820,
              "event_value": 460.6
            },
            {
              "subject_name": "C1-6-D-35489",
              "subject_time": 1557906540,
              "event_value": 469.7
            },
            {
              "subject_name": "C1-6-D-35490",
              "subject_time": 1557906060,
              "event_value": 583.3
            },
            {
              "subject_name": "C1-6-D-35491",
              "subject_time": 1557906660,
              "event_value": 513.2
            },
            {
              "subject_name": "C1-6-D-35492",
              "subject_time": 1557906360,
              "event_value": 464.2
            },
            {
              "subject_name": "C1-6-D-35493",
              "subject_time": 1557906840,
              "event_value": 452
            },
            {
              "subject_name": "C1-6-D-35494",
              "subject_time": 1557877860,
              "event_value": 479.5
            },
            {
              "subject_name": "C1-6-D-35495",
              "subject_time": 1557877740,
              "event_value": 450.3
            },
            {
              "subject_name": "C1-6-D-35496",
              "subject_time": 1557878460,
              "event_value": 470.6
            },
            {
              "subject_name": "C1-6-D-35497",
              "subject_time": 1557878340,
              "event_value": 451.2
            },
            {
              "subject_name": "C1-6-D-35498",
              "subject_time": 1557878700,
              "event_value": 546.7
            },
            {
              "subject_name": "C1-6-D-35499",
              "subject_time": 1557878820,
              "event_value": 570.2
            },
            {
              "subject_name": "C1-6-D-36034",
              "subject_time": 1561429860,
              "event_value": 438.5
            },
            {
              "subject_name": "C1-6-D-36046",
              "subject_time": 1561430100,
              "event_value": 488.7
            },
            {
              "subject_name": "C1-6-D-36700",
              "subject_time": 1562070360,
              "event_value": 521.4
            },
            {
              "subject_name": "C1-6-D-36701",
              "subject_time": 1562070000,
              "event_value": 507.3
            },
            {
              "subject_name": "C1-6-D-36702",
              "subject_time": 1562070840,
              "event_value": 563.5
            },
            {
              "subject_name": "C1-6-D-36703",
              "subject_time": 1562071080,
              "event_value": 547.2
            },
            {
              "subject_name": "C1-6-D-36704",
              "subject_time": 1562108160,
              "event_value": 559.8
            },
            {
              "subject_name": "C1-6-D-36705",
              "subject_time": 1562928420,
              "event_value": 562.4
            },
            {
              "subject_name": "C1-6-D-36706",
              "subject_time": 1562108280,
              "event_value": 672.2
            },
            {
              "subject_name": "C1-6-D-36707",
              "subject_time": 1562108400,
              "event_value": 544.9
            },
            {
              "subject_name": "C1-6-D-36708",
              "subject_time": 1562108640,
              "event_value": 563.3
            },
            {
              "subject_name": "C1-6-D-36709",
              "subject_time": 1562108700,
              "event_value": 570.3
            },
            {
              "subject_name": "C1-6-D-36710",
              "subject_time": 1562110260,
              "event_value": 628.9
            },
            {
              "subject_name": "C1-6-D-36711",
              "subject_time": 1562110080,
              "event_value": 561
            },
            {
              "subject_name": "C1-6-D-36712",
              "subject_time": 1562110740,
              "event_value": 620.9
            },
            {
              "subject_name": "C1-6-D-36713",
              "subject_time": 1562110860,
              "event_value": 579.5
            },
            {
              "subject_name": "C1-6-D-36714",
              "subject_time": 1562110980,
              "event_value": 573
            },
            {
              "subject_name": "C1-6-D-36715",
              "subject_time": 1562121000,
              "event_value": 598.7
            },
            {
              "subject_name": "C1-6-D-36716",
              "subject_time": 1562122020,
              "event_value": 538.2
            },
            {
              "subject_name": "C1-6-D-36717",
              "subject_time": 1562121900,
              "event_value": 553.2
            },
            {
              "subject_name": "C1-6-D-36718",
              "subject_time": 1562122140,
              "event_value": 541.3
            },
            {
              "subject_name": "C1-6-D-36719",
              "subject_time": 1562122320,
              "event_value": 534.5
            },
            {
              "subject_name": "C1-6-D-36720",
              "subject_time": 1562115300,
              "event_value": 308
            },
            {
              "subject_name": "C1-6-D-36721",
              "subject_time": 1562123100,
              "event_value": 639.6
            },
            {
              "subject_name": "C1-6-D-36722",
              "subject_time": 1562123340,
              "event_value": 607.8
            },
            {
              "subject_name": "C1-6-D-36723",
              "subject_time": 1562123520,
              "event_value": 610.1
            },
            {
              "subject_name": "C1-6-D-36724",
              "subject_time": 1562130960,
              "event_value": 542.7
            },
            {
              "subject_name": "C1-6-D-36725",
              "subject_time": 1562131080,
              "event_value": 541.2
            },
            {
              "subject_name": "C1-6-D-36726",
              "subject_time": 1562131500,
              "event_value": 537.5
            },
            {
              "subject_name": "C1-6-D-36727",
              "subject_time": 1562131740,
              "event_value": -129776.1
            },
            {
              "subject_name": "C1-6-D-36728",
              "subject_time": 1562132100,
              "event_value": 543.4
            },
            {
              "subject_name": "C1-6-D-36729",
              "subject_time": 1562131860,
              "event_value": 569.7
            },
            {
              "subject_name": "C1-6-D-36730",
              "subject_time": 1562151540,
              "event_value": 538.1
            },
            {
              "subject_name": "C1-6-D-36731",
              "subject_time": 1562151600,
              "event_value": 549.5
            },
            {
              "subject_name": "C1-6-D-36732",
              "subject_time": 1562151960,
              "event_value": 533.3
            },
            {
              "subject_name": "C1-6-D-36733",
              "subject_time": 1562152020,
              "event_value": 559.8
            },
            {
              "subject_name": "C1-6-D-36734",
              "subject_time": 1562152680,
              "event_value": 610.6
            },
            {
              "subject_name": "C1-6-D-36735",
              "subject_time": 1562152620,
              "event_value": 548.2
            },
            {
              "subject_name": "C1-6-D-36736",
              "subject_time": 1562153220,
              "event_value": 550.2
            },
            {
              "subject_name": "C1-6-D-36737",
              "subject_time": 1562153100,
              "event_value": 558.3
            },
            {
              "subject_name": "C1-6-D-36738",
              "subject_time": 1562155440,
              "event_value": 563.1
            },
            {
              "subject_name": "C1-6-D-36739",
              "subject_time": 1562155320,
              "event_value": 531.8
            },
            {
              "subject_name": "C1-6-D-36740",
              "subject_time": 1562156040,
              "event_value": 581.4
            },
            {
              "subject_name": "C1-6-D-36741",
              "subject_time": 1562156100,
              "event_value": 512
            },
            {
              "subject_name": "C1-6-D-36742",
              "subject_time": 1562156580,
              "event_value": 639.6
            },
            {
              "subject_name": "C1-6-D-36743",
              "subject_time": 1562156700,
              "event_value": 504.8
            },
            {
              "subject_name": "C1-6-D-36744",
              "subject_time": 1562157120,
              "event_value": 533.6
            },
            {
              "subject_name": "C1-6-D-36745",
              "subject_time": 1562157180,
              "event_value": 507.5
            },
            {
              "subject_name": "C1-6-D-36746",
              "subject_time": 1562157540,
              "event_value": 531.7
            },
            {
              "subject_name": "C1-6-D-36747",
              "subject_time": 1562157660,
              "event_value": 516.8
            },
            {
              "subject_name": "C1-6-D-36748",
              "subject_time": 1562194020,
              "event_value": 609
            },
            {
              "subject_name": "C1-6-D-36749",
              "subject_time": 1562194320,
              "event_value": 539.5
            },
            {
              "subject_name": "C1-6-D-36750",
              "subject_time": 1562194500,
              "event_value": 533.1
            },
            {
              "subject_name": "C1-6-D-36751",
              "subject_time": 1562194680,
              "event_value": 534.7
            },
            {
              "subject_name": "C1-6-D-36752",
              "subject_time": 1562194920,
              "event_value": 536.9
            },
            {
              "subject_name": "C1-6-D-36753",
              "subject_time": 1562194980,
              "event_value": 494.9
            },
            {
              "subject_name": "C1-6-D-36754",
              "subject_time": 1562199360,
              "event_value": 533.7
            },
            {
              "subject_name": "C1-6-D-36755",
              "subject_time": 1562208960,
              "event_value": 501.5
            },
            {
              "subject_name": "C1-6-D-36756",
              "subject_time": 1562209020,
              "event_value": 635.7
            },
            {
              "subject_name": "C1-6-D-36757",
              "subject_time": 1562209260,
              "event_value": 497.3
            },
            {
              "subject_name": "C1-6-D-36758",
              "subject_time": 1562209440,
              "event_value": 497.9
            },
            {
              "subject_name": "C1-6-D-36759",
              "subject_time": 1562209320,
              "event_value": 488.4
            },
            {
              "subject_name": "C1-6-D-36760",
              "subject_time": 1562209560,
              "event_value": 513.3
            },
            {
              "subject_name": "C1-6-D-36761",
              "subject_time": 1562212380,
              "event_value": 515.3
            },
            {
              "subject_name": "C1-6-D-36762",
              "subject_time": 1562212620,
              "event_value": 500.7
            },
            {
              "subject_name": "C1-6-D-36763",
              "subject_time": 1562212800,
              "event_value": 617.7
            },
            {
              "subject_name": "C1-6-D-36764",
              "subject_time": 1562212920,
              "event_value": 490.4
            },
            {
              "subject_name": "C1-6-D-36765",
              "subject_time": 1562216700,
              "event_value": 578.2
            },
            {
              "subject_name": "C1-6-D-36766",
              "subject_time": 1562215260,
              "event_value": 496.5
            },
            {
              "subject_name": "C1-6-D-36767",
              "subject_time": 1562200740,
              "event_value": 531.4
            },
            {
              "subject_name": "C1-6-D-36769",
              "subject_time": 1562219580,
              "event_value": 516.2
            },
            {
              "subject_name": "C1-6-D-36770",
              "subject_time": 1562219460,
              "event_value": 503.7
            },
            {
              "subject_name": "C1-6-D-36771",
              "subject_time": 1562220000,
              "event_value": 503.5
            },
            {
              "subject_name": "C1-6-D-36772",
              "subject_time": 1562219940,
              "event_value": 510.3
            },
            {
              "subject_name": "C1-6-D-36773",
              "subject_time": 1562220180,
              "event_value": 502.5
            },
            {
              "subject_name": "C1-6-D-36774",
              "subject_time": 1562220300,
              "event_value": 525.4
            },
            {
              "subject_name": "C1-6-D-36775",
              "subject_time": 1562236200,
              "event_value": 544.1
            },
            {
              "subject_name": "C1-6-D-36776",
              "subject_time": 1562236260,
              "event_value": 508.4
            },
            {
              "subject_name": "C1-6-D-36777",
              "subject_time": 1562236620,
              "event_value": 520.8
            },
            {
              "subject_name": "C1-6-D-36778",
              "subject_time": 1562236740,
              "event_value": 498.8
            },
            {
              "subject_name": "C1-6-D-36779",
              "subject_time": 1562237100,
              "event_value": 592
            },
            {
              "subject_name": "C1-6-D-36780",
              "subject_time": 1562237220,
              "event_value": 583.2
            },
            {
              "subject_name": "C1-6-D-36781",
              "subject_time": 1562237520,
              "event_value": 619.1
            },
            {
              "subject_name": "C1-6-D-36782",
              "subject_time": 1562237640,
              "event_value": 589.7
            },
            {
              "subject_name": "C1-6-D-36783",
              "subject_time": 1562238240,
              "event_value": 605.8
            },
            {
              "subject_name": "C1-6-D-36784",
              "subject_time": 1562238180,
              "event_value": 507.7
            },
            {
              "subject_name": "C1-6-D-36785",
              "subject_time": 1562238420,
              "event_value": 617
            },
            {
              "subject_name": "C1-6-D-36786",
              "subject_time": 1562238600,
              "event_value": 597.2
            },
            {
              "subject_name": "C1-6-D-36787",
              "subject_time": 1562280300,
              "event_value": 531.9
            },
            {
              "subject_name": "C1-6-D-36790",
              "subject_time": 1562280240,
              "event_value": 569.9
            },
            {
              "subject_name": "C1-6-D-36791",
              "subject_time": 1562280480,
              "event_value": 605.7
            },
            {
              "subject_name": "C1-6-D-36792",
              "subject_time": 1562280540,
              "event_value": 570.7
            },
            {
              "subject_name": "C1-6-D-36793",
              "subject_time": 1562280960,
              "event_value": 607
            },
            {
              "subject_name": "C1-6-D-36794",
              "subject_time": 1562288220,
              "event_value": 657.2
            },
            {
              "subject_name": "C1-6-D-36795",
              "subject_time": 1562288100,
              "event_value": 611.5
            },
            {
              "subject_name": "C1-6-D-36796",
              "subject_time": 1562292720,
              "event_value": 592.1
            },
            {
              "subject_name": "C1-6-D-36797",
              "subject_time": 1562292600,
              "event_value": 622.4
            },
            {
              "subject_name": "C1-6-D-36798",
              "subject_time": 1562293020,
              "event_value": 495.8
            },
            {
              "subject_name": "C1-6-D-36799",
              "subject_time": 1562292780,
              "event_value": 527.7
            },
            {
              "subject_name": "C1-6-D-36800",
              "subject_time": 1562283660,
              "event_value": 538.7
            },
            {
              "subject_name": "C1-6-D-36801",
              "subject_time": 1562283840,
              "event_value": 521.5
            },
            {
              "subject_name": "C1-6-D-36802",
              "subject_time": 1562285340,
              "event_value": 540.1
            },
            {
              "subject_name": "C1-6-D-36804",
              "subject_time": 1562285580,
              "event_value": 513
            },
            {
              "subject_name": "C1-6-D-36805",
              "subject_time": 1562285640,
              "event_value": 527.9
            },
            {
              "subject_name": "C1-6-D-36806",
              "subject_time": 1562293860,
              "event_value": 584
            },
            {
              "subject_name": "C1-6-D-36807",
              "subject_time": 1562294160,
              "event_value": 495
            },
            {
              "subject_name": "C1-6-D-36810",
              "subject_time": 1562294220,
              "event_value": 526.9
            },
            {
              "subject_name": "C1-6-D-36811",
              "subject_time": 1562295060,
              "event_value": 498.2
            },
            {
              "subject_name": "C1-6-D-36812",
              "subject_time": 1562295540,
              "event_value": 524.4
            },
            {
              "subject_name": "C1-6-D-36813",
              "subject_time": 1562295480,
              "event_value": 511.3
            },
            {
              "subject_name": "C1-6-D-36814",
              "subject_time": 1562281380,
              "event_value": 517.9
            },
            {
              "subject_name": "C1-6-D-36816",
              "subject_time": 1562281620,
              "event_value": 541.4
            },
            {
              "subject_name": "C1-6-D-36817",
              "subject_time": 1562281860,
              "event_value": 533.7
            },
            {
              "subject_name": "C1-6-D-36818",
              "subject_time": 1562296800,
              "event_value": 561.2
            },
            {
              "subject_name": "C1-6-D-36819",
              "subject_time": 1562296980,
              "event_value": 513.5
            },
            {
              "subject_name": "C1-6-D-36820",
              "subject_time": 1562297100,
              "event_value": 512.5
            },
            {
              "subject_name": "C1-6-D-36821",
              "subject_time": 1562297160,
              "event_value": 509.5
            },
            {
              "subject_name": "C1-6-D-36822",
              "subject_time": 1562297400,
              "event_value": 509.1
            },
            {
              "subject_name": "C1-6-D-36823",
              "subject_time": 1562297460,
              "event_value": 517.7
            },
            {
              "subject_name": "C1-6-D-36824",
              "subject_time": 1562322480,
              "event_value": 527.8
            },
            {
              "subject_name": "C1-6-D-36825",
              "subject_time": 1562322840,
              "event_value": 563.3
            },
            {
              "subject_name": "C1-6-D-36826",
              "subject_time": 1562322960,
              "event_value": 526.5
            },
            {
              "subject_name": "C1-6-D-36827",
              "subject_time": 1562323320,
              "event_value": 518
            },
            {
              "subject_name": "C1-6-D-36828",
              "subject_time": 1562323380,
              "event_value": 531.3
            },
            {
              "subject_name": "C1-6-D-36830",
              "subject_time": 1562323920,
              "event_value": 525.9
            },
            {
              "subject_name": "C1-6-D-36831",
              "subject_time": 1562324040,
              "event_value": 538.4
            },
            {
              "subject_name": "C1-6-D-36832",
              "subject_time": 1562324700,
              "event_value": 499.6
            },
            {
              "subject_name": "C1-6-D-36833",
              "subject_time": 1562324820,
              "event_value": 573.3
            },
            {
              "subject_name": "C1-6-D-36834",
              "subject_time": 1562325060,
              "event_value": 650.9
            },
            {
              "subject_name": "C1-6-D-36835",
              "subject_time": 1562324580,
              "event_value": 573.3
            },
            {
              "subject_name": "C1-6-D-36836",
              "subject_time": 1562540460,
              "event_value": 635.8
            },
            {
              "subject_name": "C1-6-D-36837",
              "subject_time": 1562540520,
              "event_value": 585.3
            },
            {
              "subject_name": "C1-6-D-36838",
              "subject_time": 1563331980,
              "event_value": 524.3
            },
            {
              "subject_name": "C1-6-D-36839",
              "subject_time": 1562540760,
              "event_value": 534
            },
            {
              "subject_name": "C1-6-D-36841",
              "subject_time": 1562540880,
              "event_value": 523
            },
            {
              "subject_name": "C1-6-D-36842",
              "subject_time": 1562541300,
              "event_value": 625.1
            },
            {
              "subject_name": "C1-6-D-36843",
              "subject_time": 1562543160,
              "event_value": ""
            },
            {
              "subject_name": "C1-6-D-36843",
              "subject_time": 1563233400,
              "event_value": ""
            },
            {
              "subject_name": "C1-6-D-36844",
              "subject_time": 1562543820,
              "event_value": 603.7
            },
            {
              "subject_name": "C1-6-D-36845",
              "subject_time": 1562545380,
              "event_value": 597.4
            },
            {
              "subject_name": "C1-6-D-36846",
              "subject_time": 1562545260,
              "event_value": 577.2
            },
            {
              "subject_name": "C1-6-D-36847",
              "subject_time": 1562545560,
              "event_value": 606.1
            },
            {
              "subject_name": "C1-6-D-36848",
              "subject_time": 1562545680,
              "event_value": 569.5
            },
            {
              "subject_name": "C1-6-D-36850",
              "subject_time": 1562554440,
              "event_value": 529.6
            },
            {
              "subject_name": "C1-6-D-36851",
              "subject_time": 1562554380,
              "event_value": 534.1
            },
            {
              "subject_name": "C1-6-D-36852",
              "subject_time": 1562554560,
              "event_value": 572.7
            },
            {
              "subject_name": "C1-6-D-36853",
              "subject_time": 1562554680,
              "event_value": 527.9
            },
            {
              "subject_name": "C1-6-D-36854",
              "subject_time": 1562554920,
              "event_value": 583.4
            },
            {
              "subject_name": "C1-6-D-36855",
              "subject_time": 1562554740,
              "event_value": 599.1
            },
            {
              "subject_name": "C1-6-D-36857",
              "subject_time": 1562542140,
              "event_value": 629.5
            },
            {
              "subject_name": "C1-6-D-36858",
              "subject_time": 1562556360,
              "event_value": 575.4
            },
            {
              "subject_name": "C1-6-D-36859",
              "subject_time": 1562556300,
              "event_value": 563.9
            },
            {
              "subject_name": "C1-6-D-36860",
              "subject_time": 1562558340,
              "event_value": 585.4
            },
            {
              "subject_name": "C1-6-D-36861",
              "subject_time": 1562562360,
              "event_value": 534
            },
            {
              "subject_name": "C1-6-D-36862",
              "subject_time": 1562562540,
              "event_value": 531
            },
            {
              "subject_name": "C1-6-D-36863",
              "subject_time": 1562562720,
              "event_value": 522
            },
            {
              "subject_name": "C1-6-D-36864",
              "subject_time": 1562563140,
              "event_value": 597.1
            },
            {
              "subject_name": "C1-6-D-36865",
              "subject_time": 1562562900,
              "event_value": 616.8
            },
            {
              "subject_name": "C1-6-D-36866",
              "subject_time": 1562582100,
              "event_value": 639.4
            },
            {
              "subject_name": "C1-6-D-36867",
              "subject_time": 1562582220,
              "event_value": 570
            },
            {
              "subject_name": "C1-6-D-36868",
              "subject_time": 1562582640,
              "event_value": 603.4
            },
            {
              "subject_name": "C1-6-D-36869",
              "subject_time": 1562582700,
              "event_value": 577.3
            },
            {
              "subject_name": "C1-6-D-36870",
              "subject_time": 1562583180,
              "event_value": 618.5
            },
            {
              "subject_name": "C1-6-D-36871",
              "subject_time": 1562583240,
              "event_value": 582.8
            },
            {
              "subject_name": "C1-6-D-36872",
              "subject_time": 1562583660,
              "event_value": 603.5
            },
            {
              "subject_name": "C1-6-D-36873",
              "subject_time": 1562583720,
              "event_value": 553
            },
            {
              "subject_name": "C1-6-D-36874",
              "subject_time": 1562584140,
              "event_value": 578.4
            },
            {
              "subject_name": "C1-6-D-36875",
              "subject_time": 1562584200,
              "event_value": 576.4
            },
            {
              "subject_name": "C1-6-D-36876",
              "subject_time": 1562584560,
              "event_value": 602.3
            },
            {
              "subject_name": "C1-6-D-36877",
              "subject_time": 1562584500,
              "event_value": 575.1
            },
            {
              "subject_name": "C1-6-D-36878",
              "subject_time": 1562625120,
              "event_value": 607.1
            },
            {
              "subject_name": "C1-6-D-36879",
              "subject_time": 1562625180,
              "event_value": 553.1
            },
            {
              "subject_name": "C1-6-D-36880",
              "subject_time": 1562625420,
              "event_value": 567.5
            },
            {
              "subject_name": "C1-6-D-36881",
              "subject_time": 1562625480,
              "event_value": 540.4
            },
            {
              "subject_name": "C1-6-D-36882",
              "subject_time": 1562625780,
              "event_value": 561.4
            },
            {
              "subject_name": "C1-6-D-36884",
              "subject_time": 1562625840,
              "event_value": 557.2
            },
            {
              "subject_name": "C1-6-D-36886",
              "subject_time": 1562626560,
              "event_value": 564
            },
            {
              "subject_name": "C1-6-D-36887",
              "subject_time": 1562627040,
              "event_value": 579.5
            },
            {
              "subject_name": "C1-6-D-36888",
              "subject_time": 1562626980,
              "event_value": 526.2
            },
            {
              "subject_name": "C1-6-D-36889",
              "subject_time": 1562627280,
              "event_value": 581.3
            },
            {
              "subject_name": "C1-6-D-36890",
              "subject_time": 1562627400,
              "event_value": 595.8
            },
            {
              "subject_name": "C1-6-D-36891",
              "subject_time": 1562639220,
              "event_value": 610
            },
            {
              "subject_name": "C1-6-D-36892",
              "subject_time": 1562639460,
              "event_value": 591.4
            },
            {
              "subject_name": "C1-6-D-36893",
              "subject_time": 1562640060,
              "event_value": 571.1
            },
            {
              "subject_name": "C1-6-D-36894",
              "subject_time": 1562639700,
              "event_value": 543.6
            },
            {
              "subject_name": "C1-6-D-36895",
              "subject_time": 1562641680,
              "event_value": 552
            },
            {
              "subject_name": "C1-6-D-36896",
              "subject_time": 1562641620,
              "event_value": 527.6
            },
            {
              "subject_name": "C1-6-D-36897",
              "subject_time": 1562641500,
              "event_value": 558.6
            },
            {
              "subject_name": "C1-6-D-36898",
              "subject_time": 1562642040,
              "event_value": 565
            },
            {
              "subject_name": "C1-6-D-36899",
              "subject_time": 1562641980,
              "event_value": 540.6
            },
            {
              "subject_name": "C1-6-D-36431",
              "subject_time": 1562539140,
              "event_value": 608.2
            },
            {
              "subject_name": "C1-6-D-36467",
              "subject_time": 1562538720,
              "event_value": ""
            },
            {
              "subject_name": "C1-6-D-36467",
              "subject_time": 1563331920,
              "event_value": 583
            },
            {
              "subject_name": "C1-6-D-36172",
              "subject_time": 1561517460,
              "event_value": 468
            },
            {
              "subject_name": "C1-6-D-36503",
              "subject_time": 1561331700,
              "event_value": 530.8
            },
            {
              "subject_name": "C1-6-D-36504",
              "subject_time": 1561331820,
              "event_value": 545.9
            },
            {
              "subject_name": "C1-6-D-36505",
              "subject_time": 1561331940,
              "event_value": 575.9
            },
            {
              "subject_name": "C1-6-D-36506",
              "subject_time": 1561332060,
              "event_value": 536.6
            },
            {
              "subject_name": "C1-6-D-36507",
              "subject_time": 1561332660,
              "event_value": 537.8
            },
            {
              "subject_name": "C1-6-D-36508",
              "subject_time": 1561332180,
              "event_value": 616.1
            },
            {
              "subject_name": "C1-6-D-36509",
              "subject_time": 1561336800,
              "event_value": 543
            },
            {
              "subject_name": "C1-6-D-36510",
              "subject_time": 1561336920,
              "event_value": 621.1
            },
            {
              "subject_name": "C1-6-D-36511",
              "subject_time": 1561337100,
              "event_value": 636
            },
            {
              "subject_name": "C1-6-D-36512",
              "subject_time": 1561336980,
              "event_value": 590.6
            },
            {
              "subject_name": "C1-6-D-36513",
              "subject_time": 1561337400,
              "event_value": 511.5
            },
            {
              "subject_name": "C1-6-D-36514",
              "subject_time": 1561337340,
              "event_value": 490.8
            },
            {
              "subject_name": "C1-6-D-36515",
              "subject_time": 1561345680,
              "event_value": 609.2
            },
            {
              "subject_name": "C1-6-D-36516",
              "subject_time": 1561346100,
              "event_value": 478.6
            },
            {
              "subject_name": "C1-6-D-36517",
              "subject_time": 1561345860,
              "event_value": 498
            },
            {
              "subject_name": "C1-6-D-36518",
              "subject_time": 1561346160,
              "event_value": 634.4
            },
            {
              "subject_name": "C1-6-D-36519",
              "subject_time": 1561346640,
              "event_value": 480.1
            },
            {
              "subject_name": "C1-6-D-36520",
              "subject_time": 1561346520,
              "event_value": 502.9
            },
            {
              "subject_name": "C1-6-D-36521",
              "subject_time": 1561347540,
              "event_value": 498.3
            },
            {
              "subject_name": "C1-6-D-36522",
              "subject_time": 1561347600,
              "event_value": 492.2
            },
            {
              "subject_name": "C1-6-D-36523",
              "subject_time": 1561347960,
              "event_value": 579.7
            },
            {
              "subject_name": "C1-6-D-36524",
              "subject_time": 1561347900,
              "event_value": 525.3
            },
            {
              "subject_name": "C1-6-D-36525",
              "subject_time": 1561348200,
              "event_value": 526.5
            },
            {
              "subject_name": "C1-6-D-36526",
              "subject_time": 1561348320,
              "event_value": 478.1
            },
            {
              "subject_name": "C1-6-D-36527",
              "subject_time": 1561353660,
              "event_value": 515.6
            },
            {
              "subject_name": "C1-6-D-36528",
              "subject_time": 1561353600,
              "event_value": 536.7
            },
            {
              "subject_name": "C1-6-D-36529",
              "subject_time": 1561371540,
              "event_value": 505.4
            },
            {
              "subject_name": "C1-6-D-36530",
              "subject_time": 1561371840,
              "event_value": 479.7
            },
            {
              "subject_name": "C1-6-D-36531",
              "subject_time": 1561371960,
              "event_value": 513.6
            },
            {
              "subject_name": "C1-6-D-36532",
              "subject_time": 1561372380,
              "event_value": 481.2
            },
            {
              "subject_name": "C1-6-D-36533",
              "subject_time": 1561372260,
              "event_value": 508.8
            },
            {
              "subject_name": "C1-6-D-36534",
              "subject_time": 1561375320,
              "event_value": 494.2
            },
            {
              "subject_name": "C1-6-D-36535",
              "subject_time": 1561375620,
              "event_value": 507.2
            },
            {
              "subject_name": "C1-6-D-36536",
              "subject_time": 1561375740,
              "event_value": 508.4
            },
            {
              "subject_name": "C1-6-D-36537",
              "subject_time": 1561377240,
              "event_value": 538.6
            },
            {
              "subject_name": "C1-6-D-36538",
              "subject_time": 1561377540,
              "event_value": 484.1
            },
            {
              "subject_name": "C1-6-D-36539",
              "subject_time": 1561378500,
              "event_value": 532.4
            },
            {
              "subject_name": "C1-6-D-36540",
              "subject_time": 1561378800,
              "event_value": 542.2
            },
            {
              "subject_name": "C1-6-D-36541",
              "subject_time": 1561378980,
              "event_value": 519
            },
            {
              "subject_name": "C1-6-D-36542",
              "subject_time": 1561379220,
              "event_value": 536.4
            },
            {
              "subject_name": "C1-6-D-36543",
              "subject_time": 1561379220,
              "event_value": 509.9
            },
            {
              "subject_name": "C1-6-D-36544",
              "subject_time": 1561379640,
              "event_value": 518.9
            },
            {
              "subject_name": "C1-6-D-36545",
              "subject_time": 1561416780,
              "event_value": 509.1
            },
            {
              "subject_name": "C1-6-D-36546",
              "subject_time": 1561416840,
              "event_value": 505.6
            },
            {
              "subject_name": "C1-6-D-36547",
              "subject_time": 1562539320,
              "event_value": 520.4
            },
            {
              "subject_name": "C1-6-D-36548",
              "subject_time": 1561417260,
              "event_value": 512
            },
            {
              "subject_name": "C1-6-D-36549",
              "subject_time": 1561417080,
              "event_value": 517.5
            },
            {
              "subject_name": "C1-6-D-36550",
              "subject_time": 1561417500,
              "event_value": 505.4
            },
            {
              "subject_name": "C1-6-D-36551",
              "subject_time": 1561422120,
              "event_value": 509.9
            },
            {
              "subject_name": "C1-6-D-36552",
              "subject_time": 1561421820,
              "event_value": 518.3
            },
            {
              "subject_name": "C1-6-D-36553",
              "subject_time": 1561422420,
              "event_value": 506.8
            },
            {
              "subject_name": "C1-6-D-36554",
              "subject_time": 1561422660,
              "event_value": 500.5
            },
            {
              "subject_name": "C1-6-D-36555",
              "subject_time": 1561422600,
              "event_value": 510.5
            },
            {
              "subject_name": "C1-6-D-36556",
              "subject_time": 1561422240,
              "event_value": ""
            },
            {
              "subject_name": "C1-6-D-36556",
              "subject_time": 1562539440,
              "event_value": 513.9
            },
            {
              "subject_name": "C1-6-D-36557",
              "subject_time": 1561430160,
              "event_value": 522.7
            },
            {
              "subject_name": "C1-6-D-36558",
              "subject_time": 1562539800,
              "event_value": 518.9
            },
            {
              "subject_name": "C1-6-D-36559",
              "subject_time": 1561433400,
              "event_value": 485.3
            },
            {
              "subject_name": "C1-6-D-36560",
              "subject_time": 1561433460,
              "event_value": 510.9
            },
            {
              "subject_name": "C1-6-D-36562",
              "subject_time": 1561434000,
              "event_value": 480.9
            },
            {
              "subject_name": "C1-6-D-36564",
              "subject_time": 1561433760,
              "event_value": 532.3
            },
            {
              "subject_name": "C1-6-D-36565",
              "subject_time": 1561433700,
              "event_value": 542.9
            },
            {
              "subject_name": "C1-6-D-36566",
              "subject_time": 1561434240,
              "event_value": 573
            },
            {
              "subject_name": "C1-6-D-36567",
              "subject_time": 1561434420,
              "event_value": 613.1
            },
            {
              "subject_name": "C1-6-D-36568",
              "subject_time": 1561434360,
              "event_value": 542.5
            },
            {
              "subject_name": "C1-6-D-36569",
              "subject_time": 1561434600,
              "event_value": 519.9
            },
            {
              "subject_name": "C1-6-D-36570",
              "subject_time": 1561434660,
              "event_value": 634.9
            },
            {
              "subject_name": "C1-6-D-36571",
              "subject_time": 1561460340,
              "event_value": 630.7
            },
            {
              "subject_name": "C1-6-D-36572",
              "subject_time": 1561460280,
              "event_value": 547.1
            },
            {
              "subject_name": "C1-6-D-36573",
              "subject_time": 1561460700,
              "event_value": 514.2
            },
            {
              "subject_name": "C1-6-D-36574",
              "subject_time": 1561460880,
              "event_value": 555.1
            },
            {
              "subject_name": "C1-6-D-36575",
              "subject_time": 1561461840,
              "event_value": 547.9
            },
            {
              "subject_name": "C1-6-D-36576",
              "subject_time": 1561458540,
              "event_value": 552.6
            },
            {
              "subject_name": "C1-6-D-36577",
              "subject_time": 1561458480,
              "event_value": 568.1
            },
            {
              "subject_name": "C1-6-D-36578",
              "subject_time": 1561459020,
              "event_value": 562.5
            },
            {
              "subject_name": "C1-6-D-36579",
              "subject_time": 1561459200,
              "event_value": 549.9
            },
            {
              "subject_name": "C1-6-D-36580",
              "subject_time": 1561459860,
              "event_value": 552.1
            },
            {
              "subject_name": "C1-6-D-36581",
              "subject_time": 1561459740,
              "event_value": 543.8
            },
            {
              "subject_name": "C1-6-D-36582",
              "subject_time": 1561466760,
              "event_value": 590.1
            },
            {
              "subject_name": "C1-6-D-36583",
              "subject_time": 1561466700,
              "event_value": 515.2
            },
            {
              "subject_name": "C1-6-D-36584",
              "subject_time": 1561467120,
              "event_value": 532
            },
            {
              "subject_name": "C1-6-D-36585",
              "subject_time": 1561467240,
              "event_value": 567.4
            },
            {
              "subject_name": "C1-6-D-36586",
              "subject_time": 1561467480,
              "event_value": 515.1
            },
            {
              "subject_name": "C1-6-D-36587",
              "subject_time": 1561471380,
              "event_value": 533.5
            },
            {
              "subject_name": "C1-6-D-36588",
              "subject_time": 1561504680,
              "event_value": 562.2
            },
            {
              "subject_name": "C1-6-D-36589",
              "subject_time": 1561504740,
              "event_value": 502
            },
            {
              "subject_name": "C1-6-D-36590",
              "subject_time": 1561504800,
              "event_value": 501.8
            },
            {
              "subject_name": "C1-6-D-36591",
              "subject_time": 1561505040,
              "event_value": 509
            },
            {
              "subject_name": "C1-6-D-36592",
              "subject_time": 1561505160,
              "event_value": 504.3
            },
            {
              "subject_name": "C1-6-D-36593",
              "subject_time": 1561505460,
              "event_value": 515.2
            },
            {
              "subject_name": "C1-6-D-36594",
              "subject_time": 1561517340,
              "event_value": 566.8
            },
            {
              "subject_name": "C1-6-D-36595",
              "subject_time": 1561517580,
              "event_value": 644.8
            },
            {
              "subject_name": "C1-6-D-36596",
              "subject_time": 1561517640,
              "event_value": 627.4
            },
            {
              "subject_name": "C1-6-D-36597",
              "subject_time": 1561517880,
              "event_value": 557.5
            },
            {
              "subject_name": "C1-6-D-36598",
              "subject_time": 1561517820,
              "event_value": 602.5
            },
            {
              "subject_name": "C1-6-D-36599",
              "subject_time": 1561519800,
              "event_value": 535.1
            },
            {
              "subject_name": "C1-6-D-36600",
              "subject_time": 1561519740,
              "event_value": 600.3
            },
            {
              "subject_name": "C1-6-D-36601",
              "subject_time": 1561520100,
              "event_value": 505.6
            },
            {
              "subject_name": "C1-6-D-36602",
              "subject_time": 1561520040,
              "event_value": 632.2
            },
            {
              "subject_name": "C1-6-D-36603",
              "subject_time": 1561520580,
              "event_value": 608.5
            },
            {
              "subject_name": "C1-6-D-36604",
              "subject_time": 1561526820,
              "event_value": 677.6
            },
            {
              "subject_name": "C1-6-D-36605",
              "subject_time": 1561527000,
              "event_value": 512.5
            },
            {
              "subject_name": "C1-6-D-36606",
              "subject_time": 1562759940,
              "event_value": 502.7
            },
            {
              "subject_name": "C1-6-D-36607",
              "subject_time": 1561527120,
              "event_value": 519.8
            },
            {
              "subject_name": "C1-6-D-36608",
              "subject_time": 1561527360,
              "event_value": 502.8
            },
            {
              "subject_name": "C1-6-D-36609",
              "subject_time": 1561549740,
              "event_value": 602.7
            },
            {
              "subject_name": "C1-6-D-36610",
              "subject_time": 1561550040,
              "event_value": 618.2
            },
            {
              "subject_name": "C1-6-D-36611",
              "subject_time": 1561550760,
              "event_value": 641.6
            },
            {
              "subject_name": "C1-6-D-36612",
              "subject_time": 1561550580,
              "event_value": 542.1
            },
            {
              "subject_name": "C1-6-D-36613",
              "subject_time": 1561551120,
              "event_value": 650.2
            },
            {
              "subject_name": "C1-6-D-36614",
              "subject_time": 1561552260,
              "event_value": 681.9
            },
            {
              "subject_name": "C1-6-D-36615",
              "subject_time": 1561552140,
              "event_value": 575.3
            },
            {
              "subject_name": "C1-6-D-36616",
              "subject_time": 1561552680,
              "event_value": 620.7
            },
            {
              "subject_name": "C1-6-D-36617",
              "subject_time": 1561552740,
              "event_value": 628
            },
            {
              "subject_name": "C1-6-D-36618",
              "subject_time": 1561553460,
              "event_value": 642.6
            },
            {
              "subject_name": "C1-6-D-36619",
              "subject_time": 1561553460,
              "event_value": 525
            },
            {
              "subject_name": "C1-6-D-36620",
              "subject_time": 1561936740,
              "event_value": 513.7
            },
            {
              "subject_name": "C1-6-D-36621",
              "subject_time": 1561936440,
              "event_value": 511.4
            },
            {
              "subject_name": "C1-6-D-36622",
              "subject_time": 1561936860,
              "event_value": 557
            },
            {
              "subject_name": "C1-6-D-36623",
              "subject_time": 1561936920,
              "event_value": 526.7
            },
            {
              "subject_name": "C1-6-D-36624",
              "subject_time": 1561937220,
              "event_value": 515.9
            },
            {
              "subject_name": "C1-6-D-36625",
              "subject_time": 1561937340,
              "event_value": 533.2
            },
            {
              "subject_name": "C1-6-D-36626",
              "subject_time": 1561941600,
              "event_value": 551.9
            },
            {
              "subject_name": "C1-6-D-36627",
              "subject_time": 1561941720,
              "event_value": 527.7
            },
            {
              "subject_name": "C1-6-D-36628",
              "subject_time": 1561941960,
              "event_value": 673.6
            },
            {
              "subject_name": "C1-6-D-36629",
              "subject_time": 1561942020,
              "event_value": 600
            },
            {
              "subject_name": "C1-6-D-36630",
              "subject_time": 1561942380,
              "event_value": 658
            },
            {
              "subject_name": "C1-6-D-36631",
              "subject_time": 1562760660,
              "event_value": ""
            },
            {
              "subject_name": "C1-6-D-36632",
              "subject_time": 1561948620,
              "event_value": 632
            },
            {
              "subject_name": "C1-6-D-36633",
              "subject_time": 1561948500,
              "event_value": 614.5
            },
            {
              "subject_name": "C1-6-D-36634",
              "subject_time": 1561948800,
              "event_value": 618
            },
            {
              "subject_name": "C1-6-D-36635",
              "subject_time": 1561949220,
              "event_value": 519.9
            },
            {
              "subject_name": "C1-6-D-36636",
              "subject_time": 1561949100,
              "event_value": 653.3
            },
            {
              "subject_name": "C1-6-D-36637",
              "subject_time": 1561948980,
              "event_value": 529.3
            },
            {
              "subject_name": "C1-6-D-36638",
              "subject_time": 1561951080,
              "event_value": 509.2
            },
            {
              "subject_name": "C1-6-D-36639",
              "subject_time": 1561951740,
              "event_value": 520.5
            },
            {
              "subject_name": "C1-6-D-36640",
              "subject_time": 1561951200,
              "event_value": 523.1
            },
            {
              "subject_name": "C1-6-D-36641",
              "subject_time": 1561951380,
              "event_value": 509.7
            },
            {
              "subject_name": "C1-6-D-36642",
              "subject_time": 1561951440,
              "event_value": 517.8
            },
            {
              "subject_name": "C1-6-D-36643",
              "subject_time": 1561959360,
              "event_value": 612.1
            },
            {
              "subject_name": "C1-6-D-36644",
              "subject_time": 1561959180,
              "event_value": 517.1
            },
            {
              "subject_name": "C1-6-D-36645",
              "subject_time": 1561959780,
              "event_value": 524.6
            },
            {
              "subject_name": "C1-6-D-36646",
              "subject_time": 1561959600,
              "event_value": 516.2
            },
            {
              "subject_name": "C1-6-D-36647",
              "subject_time": 1561960020,
              "event_value": 515.3
            },
            {
              "subject_name": "C1-6-D-36648",
              "subject_time": 1561978200,
              "event_value": 533.9
            },
            {
              "subject_name": "C1-6-D-36649",
              "subject_time": 1561978260,
              "event_value": 613.1
            },
            {
              "subject_name": "C1-6-D-36650",
              "subject_time": 1561978620,
              "event_value": 528.6
            },
            {
              "subject_name": "C1-6-D-36651",
              "subject_time": 1561978680,
              "event_value": 508.6
            },
            {
              "subject_name": "C1-6-D-36652",
              "subject_time": 1561979100,
              "event_value": 514.7
            },
            {
              "subject_name": "C1-6-D-36653",
              "subject_time": 1561979580,
              "event_value": 547.5
            },
            {
              "subject_name": "C1-6-D-36654",
              "subject_time": 1561980000,
              "event_value": 634.4
            },
            {
              "subject_name": "C1-6-D-36655",
              "subject_time": 1561979880,
              "event_value": 545.6
            },
            {
              "subject_name": "C1-6-D-36656",
              "subject_time": 1561980420,
              "event_value": 642.6
            },
            {
              "subject_name": "C1-6-D-36657",
              "subject_time": 1561980300,
              "event_value": 525.6
            },
            {
              "subject_name": "C1-6-D-36658",
              "subject_time": 1563246720,
              "event_value": 510.4
            },
            {
              "subject_name": "C1-6-D-36659",
              "subject_time": 1562020560,
              "event_value": 534.4
            },
            {
              "subject_name": "C1-6-D-36660",
              "subject_time": 1562020620,
              "event_value": 602.5
            },
            {
              "subject_name": "C1-6-D-36661",
              "subject_time": 1562020860,
              "event_value": 651.1
            },
            {
              "subject_name": "C1-6-D-36662",
              "subject_time": 1562020920,
              "event_value": 618.7
            },
            {
              "subject_name": "C1-6-D-36663",
              "subject_time": 1562021460,
              "event_value": 655
            },
            {
              "subject_name": "C1-6-D-36664",
              "subject_time": 1562021340,
              "event_value": 636.1
            },
            {
              "subject_name": "C1-6-D-36665",
              "subject_time": 1562034960,
              "event_value": 522.2
            },
            {
              "subject_name": "C1-6-D-36666",
              "subject_time": 1562035860,
              "event_value": 671.2
            },
            {
              "subject_name": "C1-6-D-36667",
              "subject_time": 1562034420,
              "event_value": ""
            },
            {
              "subject_name": "C1-6-D-36668",
              "subject_time": 1562036100,
              "event_value": 540.3
            },
            {
              "subject_name": "C1-6-D-36669",
              "subject_time": 1562037060,
              "event_value": 544.5
            },
            {
              "subject_name": "C1-6-D-36670",
              "subject_time": 1562036400,
              "event_value": 543.7
            },
            {
              "subject_name": "C1-6-D-36671",
              "subject_time": 1562036520,
              "event_value": 564.3
            },
            {
              "subject_name": "C1-6-D-36672",
              "subject_time": 1562036760,
              "event_value": 554.4
            },
            {
              "subject_name": "C1-6-D-36673",
              "subject_time": 1562037120,
              "event_value": 535.4
            },
            {
              "subject_name": "C1-6-D-36674",
              "subject_time": 1562024580,
              "event_value": 676.3
            },
            {
              "subject_name": "C1-6-D-36675",
              "subject_time": 1562024640,
              "event_value": 640.3
            },
            {
              "subject_name": "C1-6-D-36676",
              "subject_time": 1562024880,
              "event_value": 569.8
            },
            {
              "subject_name": "C1-6-D-36677",
              "subject_time": 1562024940,
              "event_value": 505.8
            },
            {
              "subject_name": "C1-6-D-36678",
              "subject_time": 1562026320,
              "event_value": 629.4
            },
            {
              "subject_name": "C1-6-D-36679",
              "subject_time": 1562026620,
              "event_value": 503.6
            },
            {
              "subject_name": "C1-6-D-36680",
              "subject_time": 1562046180,
              "event_value": 515.9
            },
            {
              "subject_name": "C1-6-D-36681",
              "subject_time": 1562046480,
              "event_value": 500
            },
            {
              "subject_name": "C1-6-D-36682",
              "subject_time": 1562046600,
              "event_value": 523.9
            },
            {
              "subject_name": "C1-6-D-36683",
              "subject_time": 1562046720,
              "event_value": 532.5
            },
            {
              "subject_name": "C1-6-D-36684",
              "subject_time": 1562046960,
              "event_value": 541.1
            },
            {
              "subject_name": "C1-6-D-36685",
              "subject_time": 1562047080,
              "event_value": 535.6
            },
            {
              "subject_name": "C1-6-D-36686",
              "subject_time": 1562066520,
              "event_value": 554.6
            },
            {
              "subject_name": "C1-6-D-36687",
              "subject_time": 1562066940,
              "event_value": 603
            },
            {
              "subject_name": "C1-6-D-36688",
              "subject_time": 1562066580,
              "event_value": 632
            },
            {
              "subject_name": "C1-6-D-36689",
              "subject_time": 1562068440,
              "event_value": 641.4
            },
            {
              "subject_name": "C1-6-D-36690",
              "subject_time": 1562069280,
              "event_value": 621.7
            },
            {
              "subject_name": "C1-6-D-36691",
              "subject_time": 1562069100,
              "event_value": 627.7
            },
            {
              "subject_name": "C1-6-D-36692",
              "subject_time": 1562071380,
              "event_value": 660.1
            },
            {
              "subject_name": "C1-6-D-36693",
              "subject_time": 1562071620,
              "event_value": 647.7
            },
            {
              "subject_name": "C1-6-D-36694",
              "subject_time": 1562071860,
              "event_value": 522.8
            },
            {
              "subject_name": "C1-6-D-36695",
              "subject_time": 1562071920,
              "event_value": 531.7
            },
            {
              "subject_name": "C1-6-D-36696",
              "subject_time": 1562072220,
              "event_value": 572
            },
            {
              "subject_name": "C1-6-D-36697",
              "subject_time": 1562884680,
              "event_value": 557.4
            },
            {
              "subject_name": "C1-6-D-36698",
              "subject_time": 1562070480,
              "event_value": 605.9
            },
            {
              "subject_name": "C1-6-D-36699",
              "subject_time": 1562069940,
              "event_value": 564.6
            },
            {
              "subject_name": "C1-6-D-36901",
              "subject_time": 1562649300,
              "event_value": 594.4
            },
            {
              "subject_name": "C1-6-D-36902",
              "subject_time": 1562649060,
              "event_value": 563.5
            },
            {
              "subject_name": "C1-6-D-36903",
              "subject_time": 1562649420,
              "event_value": 553
            },
            {
              "subject_name": "C1-6-D-36904",
              "subject_time": 1562649540,
              "event_value": 602.4
            },
            {
              "subject_name": "C1-6-D-36906",
              "subject_time": 1562649660,
              "event_value": 531.8
            },
            {
              "subject_name": "C1-6-D-36907",
              "subject_time": 1562649960,
              "event_value": 541.2
            },
            {
              "subject_name": "C1-6-D-36908",
              "subject_time": 1562671440,
              "event_value": 547.6
            },
            {
              "subject_name": "C1-6-D-36909",
              "subject_time": 1562673000,
              "event_value": 578.9
            },
            {
              "subject_name": "C1-6-D-36910",
              "subject_time": 1562671740,
              "event_value": 546.5
            },
            {
              "subject_name": "C1-6-D-36911",
              "subject_time": 1562673240,
              "event_value": 553.2
            },
            {
              "subject_name": "C1-6-D-36912",
              "subject_time": 1562673900,
              "event_value": 535.1
            },
            {
              "subject_name": "C1-6-D-36913",
              "subject_time": 1562674200,
              "event_value": 564.9
            },
            {
              "subject_name": "C1-6-D-36914",
              "subject_time": 1562674320,
              "event_value": 536.4
            },
            {
              "subject_name": "C1-6-D-36915",
              "subject_time": 1562673780,
              "event_value": ""
            },
            {
              "subject_name": "C1-6-D-36916",
              "subject_time": 1562674740,
              "event_value": 591.4
            },
            {
              "subject_name": "C1-6-D-36918",
              "subject_time": 1562675100,
              "event_value": 528.5
            },
            {
              "subject_name": "C1-6-D-36919",
              "subject_time": 1562675100,
              "event_value": 607.8
            },
            {
              "subject_name": "C1-6-D-36920",
              "subject_time": 1562676540,
              "event_value": 580.2
            },
            {
              "subject_name": "C1-6-D-36921",
              "subject_time": 1562713080,
              "event_value": 601.7
            },
            {
              "subject_name": "C1-6-D-36922",
              "subject_time": 1562713320,
              "event_value": 570.2
            },
            {
              "subject_name": "C1-6-D-36923",
              "subject_time": 1562713380,
              "event_value": 580.3
            },
            {
              "subject_name": "C1-6-D-36924",
              "subject_time": 1562713200,
              "event_value": 618.9
            },
            {
              "subject_name": "C1-6-D-36927",
              "subject_time": 1562713500,
              "event_value": 642.3
            },
            {
              "subject_name": "C1-6-D-36928",
              "subject_time": 1563405900,
              "event_value": 603.8
            },
            {
              "subject_name": "C1-6-D-36929",
              "subject_time": 1562714580,
              "event_value": 564.3
            },
            {
              "subject_name": "C1-6-D-36930",
              "subject_time": 1562715240,
              "event_value": 570.8
            },
            {
              "subject_name": "C1-6-D-36931",
              "subject_time": 1562715300,
              "event_value": 576
            },
            {
              "subject_name": "C1-6-D-36932",
              "subject_time": 1562715840,
              "event_value": 630.7
            },
            {
              "subject_name": "C1-6-D-36933",
              "subject_time": 1562715720,
              "event_value": 580.3
            },
            {
              "subject_name": "C1-6-D-36934",
              "subject_time": 1562760720,
              "event_value": 533.7
            },
            {
              "subject_name": "C1-6-D-36935",
              "subject_time": 1562760960,
              "event_value": 559
            },
            {
              "subject_name": "C1-6-D-36936",
              "subject_time": 1562761140,
              "event_value": 535.3
            },
            {
              "subject_name": "C1-6-D-36937",
              "subject_time": 1562755680,
              "event_value": 553.8
            },
            {
              "subject_name": "C1-6-D-36938",
              "subject_time": 1562756340,
              "event_value": 542.2
            },
            {
              "subject_name": "C1-6-D-36939",
              "subject_time": 1562756040,
              "event_value": 556.2
            },
            {
              "subject_name": "C1-6-D-36940",
              "subject_time": 1562756760,
              "event_value": ""
            },
            {
              "subject_name": "C1-6-D-36941",
              "subject_time": 1562756880,
              "event_value": 578
            },
            {
              "subject_name": "C1-6-D-36942",
              "subject_time": 1562757180,
              "event_value": 621
            },
            {
              "subject_name": "C1-6-D-36943",
              "subject_time": 1562758140,
              "event_value": 546.4
            },
            {
              "subject_name": "C1-6-D-36944",
              "subject_time": 1562757540,
              "event_value": 619.3
            },
            {
              "subject_name": "C1-6-D-36945",
              "subject_time": 1562757600,
              "event_value": 549.3
            },
            {
              "subject_name": "C1-6-D-36946",
              "subject_time": 1562759700,
              "event_value": 567.3
            },
            {
              "subject_name": "C1-6-D-36947",
              "subject_time": 1562758080,
              "event_value": ""
            },
            {
              "subject_name": "C1-6-D-36948",
              "subject_time": 1562798580,
              "event_value": 563.9
            },
            {
              "subject_name": "C1-6-D-36949",
              "subject_time": 1562798520,
              "event_value": 544.9
            },
            {
              "subject_name": "C1-6-D-36950",
              "subject_time": 1562799000,
              "event_value": 558.9
            },
            {
              "subject_name": "C1-6-D-36951",
              "subject_time": 1562798940,
              "event_value": 602.1
            },
            {
              "subject_name": "C1-6-D-36952",
              "subject_time": 1562799660,
              "event_value": 540
            },
            {
              "subject_name": "C1-6-D-36953",
              "subject_time": 1562799240,
              "event_value": 567.4
            },
            {
              "subject_name": "C1-6-D-36955",
              "subject_time": 1562801400,
              "event_value": 586.6
            },
            {
              "subject_name": "C1-6-D-36956",
              "subject_time": 1562800620,
              "event_value": 585.5
            },
            {
              "subject_name": "C1-6-D-36960",
              "subject_time": 1562800920,
              "event_value": 615.6
            },
            {
              "subject_name": "C1-6-D-36961",
              "subject_time": 1562801100,
              "event_value": 576.1
            },
            {
              "subject_name": "C1-6-D-36962",
              "subject_time": 1562801460,
              "event_value": 629.9
            },
            {
              "subject_name": "C1-6-D-36963",
              "subject_time": 1562804820,
              "event_value": 607.3
            },
            {
              "subject_name": "C1-6-D-36964",
              "subject_time": 1562802840,
              "event_value": ""
            },
            {
              "subject_name": "C1-6-D-36965",
              "subject_time": 1562804700,
              "event_value": 573.6
            },
            {
              "subject_name": "C1-6-D-36966",
              "subject_time": 1562780340,
              "event_value": ""
            },
            {
              "subject_name": "C1-6-D-36968",
              "subject_time": 1562805300,
              "event_value": 591.2
            },
            {
              "subject_name": "C1-6-D-36969",
              "subject_time": 1562805420,
              "event_value": 536.2
            },
            {
              "subject_name": "C1-6-D-36971",
              "subject_time": 1562813280,
              "event_value": 561.8
            },
            {
              "subject_name": "C1-6-D-36972",
              "subject_time": 1562813520,
              "event_value": 629
            },
            {
              "subject_name": "C1-6-D-36973",
              "subject_time": 1562813700,
              "event_value": 534.3
            },
            {
              "subject_name": "C1-6-D-36974",
              "subject_time": 1562814240,
              "event_value": 548.8
            },
            {
              "subject_name": "C1-6-D-36975",
              "subject_time": 1562814420,
              "event_value": 599.7
            },
            {
              "subject_name": "C1-6-D-36976",
              "subject_time": 1563362580,
              "event_value": 626.9
            },
            {
              "subject_name": "C1-6-D-36977",
              "subject_time": 1562815020,
              "event_value": 547.3
            },
            {
              "subject_name": "C1-6-D-36978",
              "subject_time": 1562846460,
              "event_value": 614
            },
            {
              "subject_name": "C1-6-D-36979",
              "subject_time": 1562928000,
              "event_value": ""
            },
            {
              "subject_name": "C1-6-D-36980",
              "subject_time": 1562847000,
              "event_value": 532.3
            },
            {
              "subject_name": "C1-6-D-36981",
              "subject_time": 1562886660,
              "event_value": 577
            },
            {
              "subject_name": "C1-6-D-36982",
              "subject_time": 1562886300,
              "event_value": 659.2
            },
            {
              "subject_name": "C1-6-D-36983",
              "subject_time": 1562886780,
              "event_value": 559.2
            },
            {
              "subject_name": "C1-6-D-36984",
              "subject_time": 1562886600,
              "event_value": 565.7
            },
            {
              "subject_name": "C1-6-D-36985",
              "subject_time": 1562886960,
              "event_value": 534.8
            },
            {
              "subject_name": "C1-6-D-36986",
              "subject_time": 1562887140,
              "event_value": 544.4
            },
            {
              "subject_name": "C1-6-D-36987",
              "subject_time": 1562908800,
              "event_value": 541.4
            },
            {
              "subject_name": "C1-6-D-36988",
              "subject_time": 1562903760,
              "event_value": 548.8
            },
            {
              "subject_name": "C1-6-D-36989",
              "subject_time": 1562909040,
              "event_value": 529.7
            },
            {
              "subject_name": "C1-6-D-36990",
              "subject_time": 1562904180,
              "event_value": 601
            },
            {
              "subject_name": "C1-6-D-36991",
              "subject_time": 1562909220,
              "event_value": 616.3
            },
            {
              "subject_name": "C1-6-D-36992",
              "subject_time": 1562909460,
              "event_value": 580.9
            },
            {
              "subject_name": "C1-6-D-36993",
              "subject_time": 1562927220,
              "event_value": 616.1
            },
            {
              "subject_name": "C1-6-D-36994",
              "subject_time": 1562926800,
              "event_value": 639.4
            },
            {
              "subject_name": "C1-6-D-36996",
              "subject_time": 1562926560,
              "event_value": 603
            },
            {
              "subject_name": "C1-6-D-36997",
              "subject_time": 1562927340,
              "event_value": 626
            },
            {
              "subject_name": "C1-6-D-36998",
              "subject_time": 1562928540,
              "event_value": 584.2
            },
            {
              "subject_name": "C1-6-D-36999",
              "subject_time": 1562928060,
              "event_value": 590
            },
            {
              "subject_name": "C1-6-D-37000",
              "subject_time": 1562929320,
              "event_value": 630.3
            },
            {
              "subject_name": "C1-6-D-37001",
              "subject_time": 1562930040,
              "event_value": 541.9
            },
            {
              "subject_name": "C1-6-D-37002",
              "subject_time": 1562929620,
              "event_value": 658.8
            },
            {
              "subject_name": "C1-6-D-37003",
              "subject_time": 1562929980,
              "event_value": ""
            },
            {
              "subject_name": "C1-6-D-37004",
              "subject_time": 1563232620,
              "event_value": 636.5
            },
            {
              "subject_name": "C1-6-D-37005",
              "subject_time": 1563232320,
              "event_value": 580.9
            },
            {
              "subject_name": "C1-6-D-37006",
              "subject_time": 1563232980,
              "event_value": 624.2
            },
            {
              "subject_name": "C1-6-D-37008",
              "subject_time": 1563232500,
              "event_value": 635.8
            },
            {
              "subject_name": "C1-6-D-37009",
              "subject_time": 1563232920,
              "event_value": 648.3
            },
            {
              "subject_name": "C1-6-D-37100",
              "subject_time": 1563490560,
              "event_value": 578.8
            },
            {
              "subject_name": "C1-6-D-37101",
              "subject_time": 1563490680,
              "event_value": 536.5
            },
            {
              "subject_name": "C1-6-D-37102",
              "subject_time": 1563490800,
              "event_value": 589.5
            },
            {
              "subject_name": "C1-6-D-37103",
              "subject_time": 1563490920,
              "event_value": 542.9
            },
            {
              "subject_name": "C1-6-D-37104",
              "subject_time": 1563490920,
              "event_value": 562.6
            },
            {
              "subject_name": "C1-6-D-37105",
              "subject_time": 1563491160,
              "event_value": 530.9
            },
            {
              "subject_name": "C1-6-D-37106",
              "subject_time": 1563493020,
              "event_value": 576.4
            },
            {
              "subject_name": "C1-6-D-37107",
              "subject_time": 1563493080,
              "event_value": 519.4
            },
            {
              "subject_name": "C1-6-D-37108",
              "subject_time": 1563493140,
              "event_value": 544.5
            },
            {
              "subject_name": "C1-6-D-37109",
              "subject_time": 1563493260,
              "event_value": 533.3
            },
            {
              "subject_name": "C1-6-D-37110",
              "subject_time": 1563493320,
              "event_value": 568.9
            },
            {
              "subject_name": "C1-6-D-37111",
              "subject_time": 1563493440,
              "event_value": 534.6
            },
            {
              "subject_name": "C1-6-D-37112",
              "subject_time": 1563503280,
              "event_value": 543.9
            },
            {
              "subject_name": "C1-6-D-37113",
              "subject_time": 1563503220,
              "event_value": 542.6
            },
            {
              "subject_name": "C1-6-D-37114",
              "subject_time": 1563503520,
              "event_value": 531.1
            },
            {
              "subject_name": "C1-6-D-37115",
              "subject_time": 1563503580,
              "event_value": 558.4
            },
            {
              "subject_name": "C1-6-D-37116",
              "subject_time": 1563504060,
              "event_value": 584.3
            },
            {
              "subject_name": "C1-6-D-37117",
              "subject_time": 1563504000,
              "event_value": 550.4
            },
            {
              "subject_name": "C1-6-D-37118",
              "subject_time": 1563504360,
              "event_value": 546
            },
            {
              "subject_name": "C1-6-D-37119",
              "subject_time": 1563504420,
              "event_value": 598.4
            },
            {
              "subject_name": "C1-6-D-37120",
              "subject_time": 1563505440,
              "event_value": 548.4
            },
            {
              "subject_name": "C1-6-D-37121",
              "subject_time": 1563515700,
              "event_value": 595.2
            },
            {
              "subject_name": "C1-6-D-37122",
              "subject_time": 1563515640,
              "event_value": 523.1
            },
            {
              "subject_name": "C1-6-D-37123",
              "subject_time": 1563516060,
              "event_value": 558.5
            },
            {
              "subject_name": "C1-6-D-37124",
              "subject_time": 1563516060,
              "event_value": 559.7
            },
            {
              "subject_name": "C1-6-D-37125",
              "subject_time": 1563516420,
              "event_value": 545.3
            },
            {
              "subject_name": "C1-6-D-37126",
              "subject_time": 1563516480,
              "event_value": 562.4
            },
            {
              "subject_name": "C1-6-D-37127",
              "subject_time": 1563513840,
              "event_value": 620.6
            },
            {
              "subject_name": "C1-6-D-37128",
              "subject_time": 1563513900,
              "event_value": 505.3
            },
            {
              "subject_name": "C1-6-D-37129",
              "subject_time": 1563513960,
              "event_value": 574.2
            },
            {
              "subject_name": "C1-6-D-37130",
              "subject_time": 1563514200,
              "event_value": 522.7
            },
            {
              "subject_name": "C1-6-D-37131",
              "subject_time": 1563513540,
              "event_value": ""
            },
            {
              "subject_name": "C1-6-D-37132",
              "subject_time": 1563514440,
              "event_value": 550.3
            },
            {
              "subject_name": "C1-6-D-37133",
              "subject_time": 1563531540,
              "event_value": 568.6
            },
            {
              "subject_name": "C1-6-D-37134",
              "subject_time": 1563531900,
              "event_value": 531.3
            },
            {
              "subject_name": "C1-6-D-37135",
              "subject_time": 1563532140,
              "event_value": 556
            },
            {
              "subject_name": "C1-6-D-37136",
              "subject_time": 1563531480,
              "event_value": ""
            },
            {
              "subject_name": "C1-6-D-37137",
              "subject_time": 1563532500,
              "event_value": 595.4
            },
            {
              "subject_name": "C1-6-D-37138",
              "subject_time": 1563532680,
              "event_value": 558.5
            },
            {
              "subject_name": "C1-6-D-37139",
              "subject_time": 1563533040,
              "event_value": 525.2
            },
            {
              "subject_name": "C1-6-D-37140",
              "subject_time": 1563533100,
              "event_value": 540
            },
            {
              "subject_name": "C1-6-D-37141",
              "subject_time": 1563533460,
              "event_value": 544.8
            },
            {
              "subject_name": "C1-6-D-37142",
              "subject_time": 1563533520,
              "event_value": 538.9
            },
            {
              "subject_name": "C1-6-D-37144",
              "subject_time": 1563533940,
              "event_value": 517.1
            },
            {
              "subject_name": "C1-6-D-37145",
              "subject_time": 1563534120,
              "event_value": 543.1
            },
            {
              "subject_name": "C1-6-D-37147",
              "subject_time": 1563750060,
              "event_value": 536.4
            },
            {
              "subject_name": "C1-6-D-37148",
              "subject_time": 1563750360,
              "event_value": 538.2
            },
            {
              "subject_name": "C1-6-D-37149",
              "subject_time": 1563750300,
              "event_value": 574.8
            },
            {
              "subject_name": "C1-6-D-37150",
              "subject_time": 1563750600,
              "event_value": 548.6
            },
            {
              "subject_name": "C1-6-D-37151",
              "subject_time": 1563750720,
              "event_value": 547.7
            },
            {
              "subject_name": "C1-6-D-37152",
              "subject_time": 1563751740,
              "event_value": 594
            },
            {
              "subject_name": "C1-6-D-37154",
              "subject_time": 1563751920,
              "event_value": 632.9
            },
            {
              "subject_name": "C1-6-D-37155",
              "subject_time": 1563752220,
              "event_value": 670.4
            },
            {
              "subject_name": "C1-6-D-37156",
              "subject_time": 1563752220,
              "event_value": 560.5
            },
            {
              "subject_name": "C1-6-D-37157",
              "subject_time": 1563752580,
              "event_value": 549.3
            },
            {
              "subject_name": "C1-6-D-37158",
              "subject_time": 1563748500,
              "event_value": 559.7
            },
            {
              "subject_name": "C1-6-D-37159",
              "subject_time": 1563748860,
              "event_value": 555.6
            },
            {
              "subject_name": "C1-6-D-37160",
              "subject_time": 1563748980,
              "event_value": 562.1
            },
            {
              "subject_name": "C1-6-D-37161",
              "subject_time": 1563749580,
              "event_value": 643.5
            },
            {
              "subject_name": "C1-6-D-37162",
              "subject_time": 1563749340,
              "event_value": 630
            },
            {
              "subject_name": "C1-6-D-37163",
              "subject_time": 1563748920,
              "event_value": ""
            },
            {
              "subject_name": "C1-6-D-37164",
              "subject_time": 1563762540,
              "event_value": 521.3
            },
            {
              "subject_name": "C1-6-D-37165",
              "subject_time": 1563754440,
              "event_value": 654
            },
            {
              "subject_name": "C1-6-D-37166",
              "subject_time": 1563754560,
              "event_value": 561.7
            },
            {
              "subject_name": "C1-6-D-37167",
              "subject_time": 1563754680,
              "event_value": 595.8
            },
            {
              "subject_name": "C1-6-D-37168",
              "subject_time": 1563754860,
              "event_value": 557.7
            },
            {
              "subject_name": "C1-6-D-37169",
              "subject_time": 1563754980,
              "event_value": 626.8
            },
            {
              "subject_name": "C1-6-D-37170",
              "subject_time": 1563755400,
              "event_value": 549.3
            },
            {
              "subject_name": "C1-6-D-37171",
              "subject_time": 1563756300,
              "event_value": 551.4
            },
            {
              "subject_name": "C1-6-D-37173",
              "subject_time": 1563761340,
              "event_value": 559
            },
            {
              "subject_name": "C1-6-D-37174",
              "subject_time": 1563756480,
              "event_value": 524.9
            },
            {
              "subject_name": "C1-6-D-37175",
              "subject_time": 1563756600,
              "event_value": 621.8
            },
            {
              "subject_name": "C1-6-D-37176",
              "subject_time": 1563756720,
              "event_value": 533.3
            },
            {
              "subject_name": "C1-6-D-37177",
              "subject_time": 1563756900,
              "event_value": 544.6
            },
            {
              "subject_name": "C1-6-D-37010",
              "subject_time": 1563246120,
              "event_value": 542.7
            },
            {
              "subject_name": "C1-6-D-37011",
              "subject_time": 1563246240,
              "event_value": 562
            },
            {
              "subject_name": "C1-6-D-37012",
              "subject_time": 1563246420,
              "event_value": 616.5
            },
            {
              "subject_name": "C1-6-D-37013",
              "subject_time": 1563246480,
              "event_value": 605.9
            },
            {
              "subject_name": "C1-6-D-37014",
              "subject_time": 1563246060,
              "event_value": 581.9
            },
            {
              "subject_name": "C1-6-D-37015",
              "subject_time": 1563277800,
              "event_value": ""
            },
            {
              "subject_name": "C1-6-D-37016",
              "subject_time": 1563275880,
              "event_value": 581
            },
            {
              "subject_name": "C1-6-D-37017",
              "subject_time": 1563276300,
              "event_value": 552.6
            },
            {
              "subject_name": "C1-6-D-37018",
              "subject_time": 1563279000,
              "event_value": 623.4
            },
            {
              "subject_name": "C1-6-D-37020",
              "subject_time": 1563278520,
              "event_value": 539.3
            },
            {
              "subject_name": "C1-6-D-37021",
              "subject_time": 1563279900,
              "event_value": 637.9
            },
            {
              "subject_name": "C1-6-D-37022",
              "subject_time": 1563318300,
              "event_value": 572.2
            },
            {
              "subject_name": "C1-6-D-37023",
              "subject_time": 1563316080,
              "event_value": 567.3
            },
            {
              "subject_name": "C1-6-D-37025",
              "subject_time": 1563316680,
              "event_value": 555
            },
            {
              "subject_name": "C1-6-D-37026",
              "subject_time": 1563318660,
              "event_value": 583.9
            },
            {
              "subject_name": "C1-6-D-37028",
              "subject_time": 1563317040,
              "event_value": 654.8
            },
            {
              "subject_name": "C1-6-D-37029",
              "subject_time": 1563318120,
              "event_value": 567.3
            },
            {
              "subject_name": "C1-6-D-37030",
              "subject_time": 1563321240,
              "event_value": 548.1
            },
            {
              "subject_name": "C1-6-D-37032",
              "subject_time": 1563319620,
              "event_value": 310.8
            },
            {
              "subject_name": "C1-6-D-37033",
              "subject_time": 1563322440,
              "event_value": 545.8
            },
            {
              "subject_name": "C1-6-D-37034",
              "subject_time": 1563322500,
              "event_value": 704.8
            },
            {
              "subject_name": "C1-6-D-37035",
              "subject_time": 1563322680,
              "event_value": 561.3
            },
            {
              "subject_name": "C1-6-D-37036",
              "subject_time": 1563322740,
              "event_value": 625.1
            },
            {
              "subject_name": "C1-6-D-37037",
              "subject_time": 1563332460,
              "event_value": 616.8
            },
            {
              "subject_name": "C1-6-D-37038",
              "subject_time": 1563332520,
              "event_value": 627.1
            },
            {
              "subject_name": "C1-6-D-37039",
              "subject_time": 1563332700,
              "event_value": 635.2
            },
            {
              "subject_name": "C1-6-D-37040",
              "subject_time": 1563332820,
              "event_value": 652.2
            },
            {
              "subject_name": "C1-6-D-37041",
              "subject_time": 1563333780,
              "event_value": 625.5
            },
            {
              "subject_name": "C1-6-D-37042",
              "subject_time": 1563333720,
              "event_value": 630
            },
            {
              "subject_name": "C1-6-D-37043",
              "subject_time": 1563334920,
              "event_value": 590.4
            },
            {
              "subject_name": "C1-6-D-37046",
              "subject_time": 1563362460,
              "event_value": 625.6
            },
            {
              "subject_name": "C1-6-D-37047",
              "subject_time": 1563364560,
              "event_value": 549.6
            },
            {
              "subject_name": "C1-6-D-37048",
              "subject_time": 1563364440,
              "event_value": 614.1
            },
            {
              "subject_name": "C1-6-D-37049",
              "subject_time": 1563365040,
              "event_value": 561.4
            },
            {
              "subject_name": "C1-6-D-37050",
              "subject_time": 1563364920,
              "event_value": 631.5
            },
            {
              "subject_name": "C1-6-D-37051",
              "subject_time": 1563360900,
              "event_value": 612.2
            },
            {
              "subject_name": "C1-6-D-37052",
              "subject_time": 1563361380,
              "event_value": 595.3
            },
            {
              "subject_name": "C1-6-D-37053",
              "subject_time": 1563361200,
              "event_value": 656.3
            },
            {
              "subject_name": "C1-6-D-37054",
              "subject_time": 1563361620,
              "event_value": 602.7
            },
            {
              "subject_name": "C1-6-D-37055",
              "subject_time": 1563361680,
              "event_value": 597.4
            },
            {
              "subject_name": "C1-6-D-37056",
              "subject_time": 1563362160,
              "event_value": 653.4
            },
            {
              "subject_name": "C1-6-D-37057",
              "subject_time": 1563365400,
              "event_value": 568.8
            },
            {
              "subject_name": "C1-6-D-37058",
              "subject_time": 1563365520,
              "event_value": 633.9
            },
            {
              "subject_name": "C1-6-D-37059",
              "subject_time": 1563365880,
              "event_value": 593.3
            },
            {
              "subject_name": "C1-6-D-37060",
              "subject_time": 1563365940,
              "event_value": 657.1
            },
            {
              "subject_name": "C1-6-D-37061",
              "subject_time": 1563365820,
              "event_value": 593.3
            },
            {
              "subject_name": "C1-6-D-37062",
              "subject_time": 1563366360,
              "event_value": 657.1
            },
            {
              "subject_name": "C1-6-D-37063",
              "subject_time": 1563403320,
              "event_value": 653.3
            },
            {
              "subject_name": "C1-6-D-37064",
              "subject_time": 1563403200,
              "event_value": 608.5
            },
            {
              "subject_name": "C1-6-D-37065",
              "subject_time": 1563403680,
              "event_value": 667.7
            },
            {
              "subject_name": "C1-6-D-37066",
              "subject_time": 1563403680,
              "event_value": 568.4
            },
            {
              "subject_name": "C1-6-D-37067",
              "subject_time": 1563402660,
              "event_value": ""
            },
            {
              "subject_name": "C1-6-D-37068",
              "subject_time": 1563405060,
              "event_value": 574.2
            },
            {
              "subject_name": "C1-6-D-37069",
              "subject_time": 1563421020,
              "event_value": 578.6
            },
            {
              "subject_name": "C1-6-D-37070",
              "subject_time": 1563421140,
              "event_value": 550.2
            },
            {
              "subject_name": "C1-6-D-37071",
              "subject_time": 1563421680,
              "event_value": 627.4
            },
            {
              "subject_name": "C1-6-D-37072",
              "subject_time": 1563421740,
              "event_value": 534.9
            },
            {
              "subject_name": "C1-6-D-37073",
              "subject_time": 1563422040,
              "event_value": 559.7
            },
            {
              "subject_name": "C1-6-D-37075",
              "subject_time": 1563420720,
              "event_value": ""
            },
            {
              "subject_name": "C1-6-D-37076",
              "subject_time": 1563418920,
              "event_value": 535.1
            },
            {
              "subject_name": "C1-6-D-37077",
              "subject_time": 1563418500,
              "event_value": 554.3
            },
            {
              "subject_name": "C1-6-D-37078",
              "subject_time": 1563418560,
              "event_value": 537.8
            },
            {
              "subject_name": "C1-6-D-37079",
              "subject_time": 1563418860,
              "event_value": 557.3
            },
            {
              "subject_name": "C1-6-D-37081",
              "subject_time": 1563427620,
              "event_value": 628.6
            },
            {
              "subject_name": "C1-6-D-37082",
              "subject_time": 1563427980,
              "event_value": 547
            },
            {
              "subject_name": "C1-6-D-37083",
              "subject_time": 1563427740,
              "event_value": 605.9
            },
            {
              "subject_name": "C1-6-D-37084",
              "subject_time": 1563428160,
              "event_value": 594.2
            },
            {
              "subject_name": "C1-6-D-37085",
              "subject_time": 1563428460,
              "event_value": 625.8
            },
            {
              "subject_name": "C1-6-D-37086",
              "subject_time": 1563428280,
              "event_value": 527.6
            },
            {
              "subject_name": "C1-6-D-37087",
              "subject_time": 1563448620,
              "event_value": 527.9
            },
            {
              "subject_name": "C1-6-D-37089",
              "subject_time": 1563451620,
              "event_value": 512.5
            },
            {
              "subject_name": "C1-6-D-37090",
              "subject_time": 1563448920,
              "event_value": 543.5
            },
            {
              "subject_name": "C1-6-D-37091",
              "subject_time": 1563449340,
              "event_value": 592.7
            },
            {
              "subject_name": "C1-6-D-37092",
              "subject_time": 1563450660,
              "event_value": 548.3
            },
            {
              "subject_name": "C1-6-D-37093",
              "subject_time": 1563451080,
              "event_value": 541.9
            },
            {
              "subject_name": "C1-6-D-37094",
              "subject_time": 1563451740,
              "event_value": 589.2
            },
            {
              "subject_name": "C1-6-D-37095",
              "subject_time": 1563452940,
              "event_value": 535.1
            },
            {
              "subject_name": "C1-6-D-37096",
              "subject_time": 1563452160,
              "event_value": 576.5
            },
            {
              "subject_name": "C1-6-D-37097",
              "subject_time": 1563452580,
              "event_value": 512.7
            },
            {
              "subject_name": "C1-6-D-37098",
              "subject_time": 1563452640,
              "event_value": 557.2
            },
            {
              "subject_name": "C1-6-D-37099",
              "subject_time": 1563453120,
              "event_value": 544
            }
          ]
    ];

    private visualizationData2 = [
        {
          "subject_name": "C1-6-D-34928",
          "subject_time": 1557523380,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-35033",
          "subject_time": 1555925220,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-35034",
          "subject_time": 1555925280,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-35035",
          "subject_time": 1555924980,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-35036",
          "subject_time": 1555925580,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-35037",
          "subject_time": 1555925940,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-35038",
          "subject_time": 1555926120,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-35039",
          "subject_time": 1555919580,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-35040",
          "subject_time": 1555918860,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-35041",
          "subject_time": 1555919040,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35042",
          "subject_time": 1555933560,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35043",
          "subject_time": 1555932480,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35044",
          "subject_time": 1555933380,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35045",
          "subject_time": 1555934100,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35046",
          "subject_time": 1555933920,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35047",
          "subject_time": 1555934280,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35048",
          "subject_time": 1555920300,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-35049",
          "subject_time": 1555920600,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-35050",
          "subject_time": 1555920780,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-35051",
          "subject_time": 1555935120,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35052",
          "subject_time": 1555935180,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35053",
          "subject_time": 1555935420,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35054",
          "subject_time": 1555935540,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35055",
          "subject_time": 1555936140,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35056",
          "subject_time": 1555961400,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35057",
          "subject_time": 1555961820,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35058",
          "subject_time": 1555962180,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35059",
          "subject_time": 1555962420,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35060",
          "subject_time": 1555962720,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35061",
          "subject_time": 1555962660,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35062",
          "subject_time": 1555943700,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35063",
          "subject_time": 1555943940,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35064",
          "subject_time": 1555944060,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35065",
          "subject_time": 1555944360,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35066",
          "subject_time": 1555944240,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35067",
          "subject_time": 1555944420,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35068",
          "subject_time": 1555968240,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35069",
          "subject_time": 1555967700,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35070",
          "subject_time": 1555968720,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35071",
          "subject_time": 1555968540,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35072",
          "subject_time": 1555968900,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35073",
          "subject_time": 1555969080,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35074",
          "subject_time": 1555970100,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35075",
          "subject_time": 1555970280,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35076",
          "subject_time": 1555975320,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35077",
          "subject_time": 1555975560,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35078",
          "subject_time": 1556047020,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35079",
          "subject_time": 1555975800,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35080",
          "subject_time": 1556004540,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35081",
          "subject_time": 1556004720,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35082",
          "subject_time": 1556005020,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35083",
          "subject_time": 1556004960,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35084",
          "subject_time": 1558382940,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35085",
          "subject_time": 1556006160,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35086",
          "subject_time": 1556020860,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35087",
          "subject_time": 1556021220,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35088",
          "subject_time": 1556008260,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35089",
          "subject_time": 1556008380,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35090",
          "subject_time": 1557431760,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35091",
          "subject_time": 1556008620,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35092",
          "subject_time": 1556008740,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35093",
          "subject_time": 1556010180,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35094",
          "subject_time": 1556006640,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35095",
          "subject_time": 1556006400,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35096",
          "subject_time": 1556007120,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35097",
          "subject_time": 1556020500,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35098",
          "subject_time": 1556020620,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35099",
          "subject_time": 1556020800,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35100",
          "subject_time": 1556022240,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35101",
          "subject_time": 1556022780,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35102",
          "subject_time": 1556022600,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35103",
          "subject_time": 1556023020,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35104",
          "subject_time": 1556023020,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35105",
          "subject_time": 1556023560,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35106",
          "subject_time": 1556031600,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35107",
          "subject_time": 1556031540,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35108",
          "subject_time": 1556031780,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35109",
          "subject_time": 1556031960,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35110",
          "subject_time": 1556032200,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35111",
          "subject_time": 1556032620,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35112",
          "subject_time": 1556033220,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35113",
          "subject_time": 1556033520,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35116",
          "subject_time": 1556033640,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35117",
          "subject_time": 1556033760,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35118",
          "subject_time": 1556034900,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35119",
          "subject_time": 1556034000,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35120",
          "subject_time": 1556050800,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35121",
          "subject_time": 1556050860,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35122",
          "subject_time": 1556052660,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35123",
          "subject_time": 1556051340,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35124",
          "subject_time": 1556053140,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35125",
          "subject_time": 1556053260,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35126",
          "subject_time": 1556091660,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35127",
          "subject_time": 1556091840,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35128",
          "subject_time": 1556091960,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35129",
          "subject_time": 1556092080,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35130",
          "subject_time": 1557523920,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35131",
          "subject_time": 1556092260,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35132",
          "subject_time": 1556104380,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35133",
          "subject_time": 1556104620,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35134",
          "subject_time": 1556104680,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35135",
          "subject_time": 1556136720,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35136",
          "subject_time": 1556104800,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35137",
          "subject_time": 1556104860,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35138",
          "subject_time": 1556105700,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35139",
          "subject_time": 1556105640,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35140",
          "subject_time": 1556104980,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35141",
          "subject_time": 1556106960,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35142",
          "subject_time": 1556107080,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35144",
          "subject_time": 1556107380,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35145",
          "subject_time": 1556109180,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35146",
          "subject_time": 1556109360,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35147",
          "subject_time": 1556108760,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35148",
          "subject_time": 1556109420,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35149",
          "subject_time": 1556109600,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35150",
          "subject_time": 1556116980,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35151",
          "subject_time": 1556117220,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35152",
          "subject_time": 1556117700,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35153",
          "subject_time": 1556117760,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35154",
          "subject_time": 1556118300,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35155",
          "subject_time": 1556118300,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35156",
          "subject_time": 1556133960,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35157",
          "subject_time": 1556134260,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35158",
          "subject_time": 1556134320,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35160",
          "subject_time": 1556134680,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35161",
          "subject_time": 1556134740,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35162",
          "subject_time": 1556134980,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35163",
          "subject_time": 1556141340,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35164",
          "subject_time": 1556141460,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35165",
          "subject_time": 1556142900,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35166",
          "subject_time": 1556142060,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35167",
          "subject_time": 1556142360,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35168",
          "subject_time": 1556142480,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35169",
          "subject_time": 1556178060,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35170",
          "subject_time": 1556178240,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35171",
          "subject_time": 1556178300,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35172",
          "subject_time": 1556178420,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35173",
          "subject_time": 1556178480,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35174",
          "subject_time": 1556178600,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35175",
          "subject_time": 1556183640,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35176",
          "subject_time": 1556183760,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35177",
          "subject_time": 1556183880,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35178",
          "subject_time": 1556184300,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35179",
          "subject_time": 1556184000,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35180",
          "subject_time": 1556184300,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35181",
          "subject_time": 1556181060,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35182",
          "subject_time": 1556180940,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35183",
          "subject_time": 1556183100,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35184",
          "subject_time": 1556183340,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35185",
          "subject_time": 1556183520,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35186",
          "subject_time": 1556183220,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35187",
          "subject_time": 1556191800,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35188",
          "subject_time": 1556192160,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35189",
          "subject_time": 1556191980,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35190",
          "subject_time": 1556193300,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35191",
          "subject_time": 1556192400,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35192",
          "subject_time": 1556193480,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35193",
          "subject_time": 1556195100,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35194",
          "subject_time": 1556195340,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35195",
          "subject_time": 1556195640,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35196",
          "subject_time": 1556195580,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35197",
          "subject_time": 1556195760,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35198",
          "subject_time": 1556202060,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35199",
          "subject_time": 1556203380,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35200",
          "subject_time": 1556204220,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35201",
          "subject_time": 1556203680,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35202",
          "subject_time": 1556203920,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35203",
          "subject_time": 1556204160,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35204",
          "subject_time": 1556220660,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35205",
          "subject_time": 1556220660,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35206",
          "subject_time": 1556221560,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35207",
          "subject_time": 1556221380,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35208",
          "subject_time": 1556221980,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35209",
          "subject_time": 1556221920,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35210",
          "subject_time": 1556223000,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35211",
          "subject_time": 1556223060,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35212",
          "subject_time": 1556223600,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35213",
          "subject_time": 1556223540,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35214",
          "subject_time": 1556224200,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35215",
          "subject_time": 1556223960,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35216",
          "subject_time": 1557215400,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35217",
          "subject_time": 1557223020,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35218",
          "subject_time": 1557215400,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35219",
          "subject_time": 1557215640,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35220",
          "subject_time": 1557215760,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35221",
          "subject_time": 1557216060,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35222",
          "subject_time": 1557216300,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35223",
          "subject_time": 1557216660,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35224",
          "subject_time": 1557216900,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35225",
          "subject_time": 1558382820,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35226",
          "subject_time": 1557217020,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35228",
          "subject_time": 1557217320,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35229",
          "subject_time": 1557217920,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35230",
          "subject_time": 1558344000,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35231",
          "subject_time": 1557222780,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35232",
          "subject_time": 1557222960,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35233",
          "subject_time": 1557227460,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35234",
          "subject_time": 1557227580,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35235",
          "subject_time": 1557230100,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35236",
          "subject_time": 1557229740,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35237",
          "subject_time": 1557230400,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35238",
          "subject_time": 1557230280,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35239",
          "subject_time": 1557230640,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35240",
          "subject_time": 1557229560,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35241",
          "subject_time": 1557221280,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35242",
          "subject_time": 1557231360,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35243",
          "subject_time": 1557231780,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35244",
          "subject_time": 1557231840,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35245",
          "subject_time": 1557232140,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35246",
          "subject_time": 1557240060,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35247",
          "subject_time": 1557240000,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35248",
          "subject_time": 1557240120,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35249",
          "subject_time": 1557240240,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35250",
          "subject_time": 1557240300,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35251",
          "subject_time": 1557240420,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35252",
          "subject_time": 1557242760,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35253",
          "subject_time": 1557241020,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35254",
          "subject_time": 1557242880,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35255",
          "subject_time": 1557243060,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35256",
          "subject_time": 1557243000,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35257",
          "subject_time": 1557243300,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35258",
          "subject_time": 1557257820,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35259",
          "subject_time": 1557257880,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35260",
          "subject_time": 1557258240,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35261",
          "subject_time": 1557258300,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35262",
          "subject_time": 1557258960,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35263",
          "subject_time": 1557258900,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35264",
          "subject_time": 1557263280,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35265",
          "subject_time": 1557263340,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35266",
          "subject_time": 1557264060,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35267",
          "subject_time": 1557264000,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35268",
          "subject_time": 1557264300,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35269",
          "subject_time": 1557264360,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35270",
          "subject_time": 1557307140,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35271",
          "subject_time": 1557307080,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35272",
          "subject_time": 1557307200,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35273",
          "subject_time": 1557307320,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35274",
          "subject_time": 1557307680,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35275",
          "subject_time": 1557307440,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35276",
          "subject_time": 1557302340,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35277",
          "subject_time": 1557302400,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35278",
          "subject_time": 1557302640,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35279",
          "subject_time": 1558351920,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35280",
          "subject_time": 1557309240,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35281",
          "subject_time": 1557309360,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35282",
          "subject_time": 1557313800,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35283",
          "subject_time": 1557313860,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35284",
          "subject_time": 1557314100,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35285",
          "subject_time": 1557300900,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35286",
          "subject_time": 1557301860,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35287",
          "subject_time": 1557301080,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35288",
          "subject_time": 1557325920,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35289",
          "subject_time": 1557326100,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35290",
          "subject_time": 1557326640,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35291",
          "subject_time": 1557327060,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35292",
          "subject_time": 1557325740,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35293",
          "subject_time": 1557328140,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35294",
          "subject_time": 1557343920,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35295",
          "subject_time": 1557344280,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35296",
          "subject_time": 1557344760,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35297",
          "subject_time": 1557344760,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35298",
          "subject_time": 1557345120,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35299",
          "subject_time": 1557345120,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-34730",
          "subject_time": 1556116980,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-34740",
          "subject_time": 1556019900,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-34740",
          "subject_time": 1557393360,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-34740",
          "subject_time": 1557996060,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-34747",
          "subject_time": 1555918560,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-34754",
          "subject_time": 1555917480,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-34754",
          "subject_time": 1557394740,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-34759",
          "subject_time": 1556021040,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-34790",
          "subject_time": 1555961220,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-34834",
          "subject_time": 1555918800,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-34858",
          "subject_time": 1556020260,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-34858",
          "subject_time": 1557394260,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-34865",
          "subject_time": 1557523320,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-35500",
          "subject_time": 1557909780,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35501",
          "subject_time": 1557909840,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35503",
          "subject_time": 1557910140,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35504",
          "subject_time": 1557910020,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35505",
          "subject_time": 1557911580,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35506",
          "subject_time": 1557918600,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35507",
          "subject_time": 1557914160,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35508",
          "subject_time": 1557918540,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35509",
          "subject_time": 1557918960,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35510",
          "subject_time": 1557918720,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35511",
          "subject_time": 1557919080,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35512",
          "subject_time": 1557924120,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35513",
          "subject_time": 1557923760,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35514",
          "subject_time": 1557922140,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35515",
          "subject_time": 1557922440,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35516",
          "subject_time": 1557922800,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35517",
          "subject_time": 1557922260,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35518",
          "subject_time": 1557922740,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35519",
          "subject_time": 1557922980,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35520",
          "subject_time": 1557930120,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35521",
          "subject_time": 1557930300,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35522",
          "subject_time": 1557930600,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35523",
          "subject_time": 1557930420,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35524",
          "subject_time": 1557930540,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35526",
          "subject_time": 1557948720,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35527",
          "subject_time": 1557948900,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35528",
          "subject_time": 1557949320,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35529",
          "subject_time": 1557949440,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35530",
          "subject_time": 1557992040,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35531",
          "subject_time": 1557950880,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35532",
          "subject_time": 1557992160,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35533",
          "subject_time": 1557992400,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35534",
          "subject_time": 1557992220,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35535",
          "subject_time": 1557992460,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35536",
          "subject_time": 1557992640,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35537",
          "subject_time": 1557992700,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35538",
          "subject_time": 1557993180,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35539",
          "subject_time": 1557955860,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35540",
          "subject_time": 1557955620,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35541",
          "subject_time": 1557956220,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35542",
          "subject_time": 1557956160,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35543",
          "subject_time": 1557956520,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35544",
          "subject_time": 1557999540,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35545",
          "subject_time": 1557999780,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35546",
          "subject_time": 1557999900,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35548",
          "subject_time": 1558000140,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35549",
          "subject_time": 1557999960,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35550",
          "subject_time": 1558000500,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35551",
          "subject_time": 1558006620,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35552",
          "subject_time": 1558006260,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35553",
          "subject_time": 1558006380,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35554",
          "subject_time": 1558006860,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35555",
          "subject_time": 1558007760,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35558",
          "subject_time": 1558011060,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35559",
          "subject_time": 1558011240,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35561",
          "subject_time": 1558010400,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35562",
          "subject_time": 1558010640,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35563",
          "subject_time": 1558010460,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35564",
          "subject_time": 1558010880,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35565",
          "subject_time": 1558010820,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35566",
          "subject_time": 1558011000,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35567",
          "subject_time": 1558037220,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35568",
          "subject_time": 1558016340,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35569",
          "subject_time": 1558016520,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35570",
          "subject_time": 1558017480,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35571",
          "subject_time": 1558016760,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35572",
          "subject_time": 1558016880,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35573",
          "subject_time": 1558017840,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35574",
          "subject_time": 1558037280,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35575",
          "subject_time": 1558039980,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35576",
          "subject_time": 1558038120,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35577",
          "subject_time": 1558038540,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35578",
          "subject_time": 1558040220,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35579",
          "subject_time": 1558078920,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35580",
          "subject_time": 1558079100,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35581",
          "subject_time": 1558078980,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35582",
          "subject_time": 1558079220,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35583",
          "subject_time": 1558079460,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35584",
          "subject_time": 1558079640,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35585",
          "subject_time": 1558080300,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35586",
          "subject_time": 1558080480,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35587",
          "subject_time": 1558080540,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35589",
          "subject_time": 1558081080,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35591",
          "subject_time": 1558080900,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35592",
          "subject_time": 1558082460,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35593",
          "subject_time": 1558082700,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35594",
          "subject_time": 1558083000,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35595",
          "subject_time": 1558082880,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35596",
          "subject_time": 1558084680,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35597",
          "subject_time": 1558084140,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35598",
          "subject_time": 1558094040,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35599",
          "subject_time": 1558093860,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35600",
          "subject_time": 1558094400,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35601",
          "subject_time": 1558094340,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35602",
          "subject_time": 1558094580,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35604",
          "subject_time": 1558094160,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35605",
          "subject_time": 1558094640,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35606",
          "subject_time": 1558096260,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35607",
          "subject_time": 1558096080,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35608",
          "subject_time": 1558096380,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35609",
          "subject_time": 1558096620,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35610",
          "subject_time": 1558096740,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35611",
          "subject_time": 1558097040,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35612",
          "subject_time": 1558104000,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35613",
          "subject_time": 1558104060,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35614",
          "subject_time": 1558104240,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35615",
          "subject_time": 1558104180,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35616",
          "subject_time": 1558104480,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35617",
          "subject_time": 1558104420,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35618",
          "subject_time": 1558121460,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35619",
          "subject_time": 1558121340,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35620",
          "subject_time": 1558122000,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35621",
          "subject_time": 1558122060,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35622",
          "subject_time": 1558122660,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35623",
          "subject_time": 1558122300,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35624",
          "subject_time": 1558126500,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35625",
          "subject_time": 1558126560,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35626",
          "subject_time": 1558127100,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35628",
          "subject_time": 1558127040,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35629",
          "subject_time": 1558127880,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35630",
          "subject_time": 1558127880,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35631",
          "subject_time": 1558338060,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35632",
          "subject_time": 1558338360,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35633",
          "subject_time": 1558338840,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35634",
          "subject_time": 1558338360,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35635",
          "subject_time": 1558338720,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35636",
          "subject_time": 1558338900,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35637",
          "subject_time": 1558343940,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35638",
          "subject_time": 1558344240,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35639",
          "subject_time": 1558354800,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35640",
          "subject_time": 1558355040,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35641",
          "subject_time": 1558355280,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35642",
          "subject_time": 1558355340,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35643",
          "subject_time": 1558355460,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35644",
          "subject_time": 1558355580,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35645",
          "subject_time": 1558353180,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35646",
          "subject_time": 1558352280,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35647",
          "subject_time": 1558353000,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35648",
          "subject_time": 1558353060,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35649",
          "subject_time": 1558353240,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35650",
          "subject_time": 1558355700,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35651",
          "subject_time": 1558380720,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35652",
          "subject_time": 1558381260,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35653",
          "subject_time": 1558381140,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35654",
          "subject_time": 1558381680,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35655",
          "subject_time": 1558381680,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35656",
          "subject_time": 1558382220,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35657",
          "subject_time": 1558387560,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35658",
          "subject_time": 1558388040,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35660",
          "subject_time": 1558387980,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35661",
          "subject_time": 1558388700,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35663",
          "subject_time": 1558388520,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35664",
          "subject_time": 1558389120,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35665",
          "subject_time": 1558427400,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35666",
          "subject_time": 1558427880,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35667",
          "subject_time": 1558428000,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35668",
          "subject_time": 1558428480,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35669",
          "subject_time": 1558428180,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35670",
          "subject_time": 1558428600,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35671",
          "subject_time": 1558439340,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35673",
          "subject_time": 1558438380,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35675",
          "subject_time": 1558439460,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35676",
          "subject_time": 1558439520,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35677",
          "subject_time": 1558439700,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35678",
          "subject_time": 1558441500,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35679",
          "subject_time": 1558441560,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35680",
          "subject_time": 1558441680,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35681",
          "subject_time": 1558441740,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35682",
          "subject_time": 1558441860,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35683",
          "subject_time": 1558442220,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35685",
          "subject_time": 1558467540,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35686",
          "subject_time": 1558467480,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35687",
          "subject_time": 1558467900,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35688",
          "subject_time": 1558468080,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35689",
          "subject_time": 1558468380,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35690",
          "subject_time": 1558468380,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35300",
          "subject_time": 1557345960,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35301",
          "subject_time": 1557346080,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35302",
          "subject_time": 1557346740,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35303",
          "subject_time": 1557346440,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35304",
          "subject_time": 1557346980,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35305",
          "subject_time": 1557346980,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35306",
          "subject_time": 1557349200,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35307",
          "subject_time": 1557349260,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35308",
          "subject_time": 1557349800,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35309",
          "subject_time": 1557349620,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35310",
          "subject_time": 1557350100,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35311",
          "subject_time": 1557350100,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35312",
          "subject_time": 1557402060,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35313",
          "subject_time": 1557401940,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35314",
          "subject_time": 1557402120,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35315",
          "subject_time": 1557402420,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35316",
          "subject_time": 1557402480,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35317",
          "subject_time": 1557402720,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35318",
          "subject_time": 1558034820,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35319",
          "subject_time": 1557394440,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35320",
          "subject_time": 1557394980,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35321",
          "subject_time": 1557409260,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35322",
          "subject_time": 1557409080,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35323",
          "subject_time": 1557409380,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35324",
          "subject_time": 1557409680,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35325",
          "subject_time": 1557409740,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35326",
          "subject_time": 1557409560,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35327",
          "subject_time": 1557392760,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35328",
          "subject_time": 1557393300,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35329",
          "subject_time": 1557392880,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35331",
          "subject_time": 1557413580,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35332",
          "subject_time": 1557414660,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35333",
          "subject_time": 1557414720,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35334",
          "subject_time": 1557414900,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35335",
          "subject_time": 1557415080,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35336",
          "subject_time": 1557414480,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35337",
          "subject_time": 1557411600,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35338",
          "subject_time": 1557411780,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35339",
          "subject_time": 1557412380,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35340",
          "subject_time": 1557411960,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35341",
          "subject_time": 1557412740,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35342",
          "subject_time": 1557412260,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35343",
          "subject_time": 1557432480,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35344",
          "subject_time": 1557432600,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35346",
          "subject_time": 1557433020,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35347",
          "subject_time": 1557433080,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35348",
          "subject_time": 1558035060,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35349",
          "subject_time": 1557433440,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35350",
          "subject_time": 1557473760,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35351",
          "subject_time": 1557473820,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35352",
          "subject_time": 1557473940,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35353",
          "subject_time": 1557474060,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35354",
          "subject_time": 1557474240,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35355",
          "subject_time": 1557474240,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35356",
          "subject_time": 1557476880,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35357",
          "subject_time": 1557476820,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35359",
          "subject_time": 1557477600,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35360",
          "subject_time": 1557477240,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35361",
          "subject_time": 1557477180,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35362",
          "subject_time": 1557477600,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35363",
          "subject_time": 1557489900,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35364",
          "subject_time": 1557490080,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35365",
          "subject_time": 1557490140,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35366",
          "subject_time": 1557490260,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35367",
          "subject_time": 1557490440,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35368",
          "subject_time": 1557491520,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35369",
          "subject_time": 1557492000,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35370",
          "subject_time": 1557491700,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35371",
          "subject_time": 1557492240,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35373",
          "subject_time": 1557492300,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35374",
          "subject_time": 1557492360,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35375",
          "subject_time": 1557474960,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35376",
          "subject_time": 1557489960,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35377",
          "subject_time": 1557498060,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35378",
          "subject_time": 1557498180,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35379",
          "subject_time": 1557498240,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35380",
          "subject_time": 1557498600,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35381",
          "subject_time": 1557498660,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35382",
          "subject_time": 1557498360,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35383",
          "subject_time": 1557500580,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35384",
          "subject_time": 1557501000,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35385",
          "subject_time": 1557501960,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35387",
          "subject_time": 1557501900,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35388",
          "subject_time": 1557502320,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35389",
          "subject_time": 1557502740,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35391",
          "subject_time": 1557500700,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35392",
          "subject_time": 1557500820,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35393",
          "subject_time": 1557501480,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35394",
          "subject_time": 1558035300,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35395",
          "subject_time": 1557500940,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35396",
          "subject_time": 1557516660,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35397",
          "subject_time": 1557516720,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35398",
          "subject_time": 1557517140,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35399",
          "subject_time": 1557517440,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35400",
          "subject_time": 1557517860,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35401",
          "subject_time": 1557517860,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35403",
          "subject_time": 1557734280,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35404",
          "subject_time": 1557734520,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35405",
          "subject_time": 1557734400,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35406",
          "subject_time": 1557734640,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35407",
          "subject_time": 1557734760,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35408",
          "subject_time": 1557523980,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35409",
          "subject_time": 1557524280,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35410",
          "subject_time": 1557524520,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35411",
          "subject_time": 1557746340,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35412",
          "subject_time": 1557746280,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35414",
          "subject_time": 1557747360,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35415",
          "subject_time": 1557747480,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35416",
          "subject_time": 1557747240,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35417",
          "subject_time": 1557747120,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35418",
          "subject_time": 1557741000,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35419",
          "subject_time": 1557741180,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35420",
          "subject_time": 1557745680,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35421",
          "subject_time": 1557758760,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35422",
          "subject_time": 1557758820,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35423",
          "subject_time": 1557759000,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35424",
          "subject_time": 1557759600,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35425",
          "subject_time": 1557759060,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35426",
          "subject_time": 1557759660,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35427",
          "subject_time": 1557759960,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35428",
          "subject_time": 1557760080,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35430",
          "subject_time": 1557760260,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35431",
          "subject_time": 1557760380,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35432",
          "subject_time": 1557760440,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35433",
          "subject_time": 1557760560,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35434",
          "subject_time": 1557777000,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35435",
          "subject_time": 1557777360,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35436",
          "subject_time": 1557777720,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35437",
          "subject_time": 1557778020,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35438",
          "subject_time": 1557778320,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35439",
          "subject_time": 1557778620,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35440",
          "subject_time": 1557781500,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35441",
          "subject_time": 1557781440,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35442",
          "subject_time": 1557782160,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35443",
          "subject_time": 1557782160,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35444",
          "subject_time": 1557782400,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35445",
          "subject_time": 1557782640,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35446",
          "subject_time": 1557818940,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35447",
          "subject_time": 1557819000,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35448",
          "subject_time": 1557819480,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35449",
          "subject_time": 1557819420,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35450",
          "subject_time": 1557819660,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35451",
          "subject_time": 1557819780,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35452",
          "subject_time": 1557827640,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35453",
          "subject_time": 1557827460,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35454",
          "subject_time": 1557827820,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35455",
          "subject_time": 1557827940,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35456",
          "subject_time": 1557832320,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35457",
          "subject_time": 1557832620,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35458",
          "subject_time": 1557833340,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35459",
          "subject_time": 1557833580,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35460",
          "subject_time": 1557834900,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35461",
          "subject_time": 1557834720,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35462",
          "subject_time": 1557835260,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35463",
          "subject_time": 1557834660,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35464",
          "subject_time": 1557820560,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35465",
          "subject_time": 1557820920,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35467",
          "subject_time": 1557820620,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35468",
          "subject_time": 1557835980,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35469",
          "subject_time": 1557836520,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35470",
          "subject_time": 1557844440,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35471",
          "subject_time": 1557844440,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35472",
          "subject_time": 1557845340,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35473",
          "subject_time": 1557845160,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35474",
          "subject_time": 1557845520,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35475",
          "subject_time": 1557845640,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35476",
          "subject_time": 1557846300,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35478",
          "subject_time": 1557846540,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35479",
          "subject_time": 1557846600,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35480",
          "subject_time": 1557846420,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35481",
          "subject_time": 1557846900,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-35482",
          "subject_time": 1557864480,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35483",
          "subject_time": 1557862260,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35484",
          "subject_time": 1557865200,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35485",
          "subject_time": 1557865320,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35486",
          "subject_time": 1557865680,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35487",
          "subject_time": 1557865680,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35488",
          "subject_time": 1557905820,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-35489",
          "subject_time": 1557906540,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-35490",
          "subject_time": 1557906060,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-35491",
          "subject_time": 1557906660,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-35492",
          "subject_time": 1557906360,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-35493",
          "subject_time": 1557906840,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-35494",
          "subject_time": 1557877860,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-35495",
          "subject_time": 1557877740,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-35496",
          "subject_time": 1557878460,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-35497",
          "subject_time": 1557878340,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-35498",
          "subject_time": 1557878700,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-35499",
          "subject_time": 1557878820,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-36034",
          "subject_time": 1561429860,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-36046",
          "subject_time": 1561430100,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-36700",
          "subject_time": 1562070360,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36701",
          "subject_time": 1562070000,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36702",
          "subject_time": 1562070840,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36703",
          "subject_time": 1562071080,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-36704",
          "subject_time": 1562108160,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36705",
          "subject_time": 1562928420,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36706",
          "subject_time": 1562108280,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36707",
          "subject_time": 1562108400,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36708",
          "subject_time": 1562108640,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36709",
          "subject_time": 1562108700,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-36710",
          "subject_time": 1562110260,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-36711",
          "subject_time": 1562110080,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-36712",
          "subject_time": 1562110740,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-36713",
          "subject_time": 1562110860,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-36714",
          "subject_time": 1562110980,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-36715",
          "subject_time": 1562121000,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-36716",
          "subject_time": 1562122020,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-36717",
          "subject_time": 1562121900,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-36718",
          "subject_time": 1562122140,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-36719",
          "subject_time": 1562122320,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-36720",
          "subject_time": 1562115300,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-36721",
          "subject_time": 1562123100,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36722",
          "subject_time": 1562123340,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36723",
          "subject_time": 1562123520,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36724",
          "subject_time": 1562130960,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36725",
          "subject_time": 1562131080,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36726",
          "subject_time": 1562131500,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36727",
          "subject_time": 1562131740,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36728",
          "subject_time": 1562132100,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36729",
          "subject_time": 1562131860,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-36730",
          "subject_time": 1562151540,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36731",
          "subject_time": 1562151600,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36732",
          "subject_time": 1562151960,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36733",
          "subject_time": 1562152020,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36734",
          "subject_time": 1562152680,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36735",
          "subject_time": 1562152620,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-36736",
          "subject_time": 1562153220,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36737",
          "subject_time": 1562153100,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36738",
          "subject_time": 1562155440,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36739",
          "subject_time": 1562155320,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36740",
          "subject_time": 1562156040,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36741",
          "subject_time": 1562156100,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-36742",
          "subject_time": 1562156580,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-36743",
          "subject_time": 1562156700,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-36744",
          "subject_time": 1562157120,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-36745",
          "subject_time": 1562157180,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-36746",
          "subject_time": 1562157540,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-36747",
          "subject_time": 1562157660,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-36748",
          "subject_time": 1562194020,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36749",
          "subject_time": 1562194320,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36750",
          "subject_time": 1562194500,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36751",
          "subject_time": 1562194680,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36752",
          "subject_time": 1562194920,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36753",
          "subject_time": 1562194980,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-36754",
          "subject_time": 1562199360,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36755",
          "subject_time": 1562208960,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-36756",
          "subject_time": 1562209020,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-36757",
          "subject_time": 1562209260,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-36758",
          "subject_time": 1562209440,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-36759",
          "subject_time": 1562209320,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-36760",
          "subject_time": 1562209560,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-36761",
          "subject_time": 1562212380,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36762",
          "subject_time": 1562212620,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36763",
          "subject_time": 1562212800,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36764",
          "subject_time": 1562212920,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36765",
          "subject_time": 1562216700,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36766",
          "subject_time": 1562215260,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-36767",
          "subject_time": 1562200740,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36769",
          "subject_time": 1562219580,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36770",
          "subject_time": 1562219460,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36771",
          "subject_time": 1562220000,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36772",
          "subject_time": 1562219940,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36773",
          "subject_time": 1562220180,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36774",
          "subject_time": 1562220300,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-36775",
          "subject_time": 1562236200,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36776",
          "subject_time": 1562236260,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36777",
          "subject_time": 1562236620,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36778",
          "subject_time": 1562236740,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36779",
          "subject_time": 1562237100,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36780",
          "subject_time": 1562237220,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-36781",
          "subject_time": 1562237520,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-36782",
          "subject_time": 1562237640,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-36783",
          "subject_time": 1562238240,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-36784",
          "subject_time": 1562238180,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-36785",
          "subject_time": 1562238420,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-36786",
          "subject_time": 1562238600,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-36787",
          "subject_time": 1562280300,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36790",
          "subject_time": 1562280240,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36791",
          "subject_time": 1562280480,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36792",
          "subject_time": 1562280540,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36793",
          "subject_time": 1562280960,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-36794",
          "subject_time": 1562288220,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-36795",
          "subject_time": 1562288100,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-36796",
          "subject_time": 1562292720,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-36797",
          "subject_time": 1562292600,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-36798",
          "subject_time": 1562293020,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-36799",
          "subject_time": 1562292780,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-36800",
          "subject_time": 1562283660,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-36801",
          "subject_time": 1562283840,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-36802",
          "subject_time": 1562285340,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-36804",
          "subject_time": 1562285580,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-36805",
          "subject_time": 1562285640,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-36806",
          "subject_time": 1562293860,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36807",
          "subject_time": 1562294160,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36810",
          "subject_time": 1562294220,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36811",
          "subject_time": 1562295060,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36812",
          "subject_time": 1562295540,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36813",
          "subject_time": 1562295480,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-36814",
          "subject_time": 1562281380,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36816",
          "subject_time": 1562281620,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36817",
          "subject_time": 1562281860,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-36818",
          "subject_time": 1562296800,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36819",
          "subject_time": 1562296980,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36820",
          "subject_time": 1562297100,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36821",
          "subject_time": 1562297160,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36822",
          "subject_time": 1562297400,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36823",
          "subject_time": 1562297460,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-36824",
          "subject_time": 1562322480,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36825",
          "subject_time": 1562322840,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36826",
          "subject_time": 1562322960,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36827",
          "subject_time": 1562323320,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36828",
          "subject_time": 1562323380,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36830",
          "subject_time": 1562323920,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36831",
          "subject_time": 1562324040,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36832",
          "subject_time": 1562324700,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36833",
          "subject_time": 1562324820,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36834",
          "subject_time": 1562325060,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36835",
          "subject_time": 1562324580,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-36836",
          "subject_time": 1562540460,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-36837",
          "subject_time": 1562540520,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-36838",
          "subject_time": 1563331980,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-36839",
          "subject_time": 1562540760,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-36841",
          "subject_time": 1562540880,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-36842",
          "subject_time": 1562541300,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-36843",
          "subject_time": 1562543160,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-36843",
          "subject_time": 1563233400,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-36844",
          "subject_time": 1562543820,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-36845",
          "subject_time": 1562545380,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-36846",
          "subject_time": 1562545260,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-36847",
          "subject_time": 1562545560,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-36848",
          "subject_time": 1562545680,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-36850",
          "subject_time": 1562554440,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-36851",
          "subject_time": 1562554380,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-36852",
          "subject_time": 1562554560,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-36853",
          "subject_time": 1562554680,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-36854",
          "subject_time": 1562554920,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-36855",
          "subject_time": 1562554740,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-36857",
          "subject_time": 1562542140,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36858",
          "subject_time": 1562556360,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36859",
          "subject_time": 1562556300,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36860",
          "subject_time": 1562558340,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36861",
          "subject_time": 1562562360,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36862",
          "subject_time": 1562562540,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36863",
          "subject_time": 1562562720,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36864",
          "subject_time": 1562563140,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36865",
          "subject_time": 1562562900,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-36866",
          "subject_time": 1562582100,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36867",
          "subject_time": 1562582220,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36868",
          "subject_time": 1562582640,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36869",
          "subject_time": 1562582700,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36870",
          "subject_time": 1562583180,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36871",
          "subject_time": 1562583240,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-36872",
          "subject_time": 1562583660,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-36873",
          "subject_time": 1562583720,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-36874",
          "subject_time": 1562584140,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-36875",
          "subject_time": 1562584200,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-36876",
          "subject_time": 1562584560,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-36877",
          "subject_time": 1562584500,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-36878",
          "subject_time": 1562625120,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36879",
          "subject_time": 1562625180,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36880",
          "subject_time": 1562625420,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36881",
          "subject_time": 1562625480,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36882",
          "subject_time": 1562625780,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36884",
          "subject_time": 1562625840,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-36886",
          "subject_time": 1562626560,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-36887",
          "subject_time": 1562627040,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-36888",
          "subject_time": 1562626980,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-36889",
          "subject_time": 1562627280,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-36890",
          "subject_time": 1562627400,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-36891",
          "subject_time": 1562639220,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-36892",
          "subject_time": 1562639460,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-36893",
          "subject_time": 1562640060,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-36894",
          "subject_time": 1562639700,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-36895",
          "subject_time": 1562641680,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36896",
          "subject_time": 1562641620,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36897",
          "subject_time": 1562641500,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36898",
          "subject_time": 1562642040,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36899",
          "subject_time": 1562641980,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36431",
          "subject_time": 1562539140,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-36467",
          "subject_time": 1562538720,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-36467",
          "subject_time": 1563331920,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-36172",
          "subject_time": 1561517460,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-36503",
          "subject_time": 1561331700,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-36504",
          "subject_time": 1561331820,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-36505",
          "subject_time": 1561331940,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-36506",
          "subject_time": 1561332060,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-36507",
          "subject_time": 1561332660,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-36508",
          "subject_time": 1561332180,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-36509",
          "subject_time": 1561336800,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-36510",
          "subject_time": 1561336920,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-36511",
          "subject_time": 1561337100,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-36512",
          "subject_time": 1561336980,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-36513",
          "subject_time": 1561337400,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-36514",
          "subject_time": 1561337340,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-36515",
          "subject_time": 1561345680,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-36516",
          "subject_time": 1561346100,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-36517",
          "subject_time": 1561345860,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-36518",
          "subject_time": 1561346160,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-36519",
          "subject_time": 1561346640,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-36520",
          "subject_time": 1561346520,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-36521",
          "subject_time": 1561347540,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-36522",
          "subject_time": 1561347600,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-36523",
          "subject_time": 1561347960,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-36524",
          "subject_time": 1561347900,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-36525",
          "subject_time": 1561348200,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-36526",
          "subject_time": 1561348320,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-36527",
          "subject_time": 1561353660,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-36528",
          "subject_time": 1561353600,
          "event_value": ""
        },
        {
          "subject_name": "C1-6-D-36529",
          "subject_time": 1561371540,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36530",
          "subject_time": 1561371840,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36531",
          "subject_time": 1561371960,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36532",
          "subject_time": 1561372380,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36533",
          "subject_time": 1561372260,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36534",
          "subject_time": 1561375320,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-36535",
          "subject_time": 1561375620,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-36536",
          "subject_time": 1561375740,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-36537",
          "subject_time": 1561377240,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-36538",
          "subject_time": 1561377540,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-36539",
          "subject_time": 1561378500,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36540",
          "subject_time": 1561378800,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36541",
          "subject_time": 1561378980,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36542",
          "subject_time": 1561379220,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36543",
          "subject_time": 1561379220,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36544",
          "subject_time": 1561379640,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-36545",
          "subject_time": 1561416780,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36546",
          "subject_time": 1561416840,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36547",
          "subject_time": 1562539320,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36548",
          "subject_time": 1561417260,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36549",
          "subject_time": 1561417080,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36550",
          "subject_time": 1561417500,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-36551",
          "subject_time": 1561422120,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-36552",
          "subject_time": 1561421820,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-36553",
          "subject_time": 1561422420,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-36554",
          "subject_time": 1561422660,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-36555",
          "subject_time": 1561422600,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-36556",
          "subject_time": 1561422240,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-36556",
          "subject_time": 1562539440,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-36557",
          "subject_time": 1561430160,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36558",
          "subject_time": 1562539800,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36559",
          "subject_time": 1561433400,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-36560",
          "subject_time": 1561433460,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-36562",
          "subject_time": 1561434000,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-36564",
          "subject_time": 1561433760,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-36565",
          "subject_time": 1561433700,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-36566",
          "subject_time": 1561434240,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-36567",
          "subject_time": 1561434420,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36568",
          "subject_time": 1561434360,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36569",
          "subject_time": 1561434600,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36570",
          "subject_time": 1561434660,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36571",
          "subject_time": 1561460340,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36572",
          "subject_time": 1561460280,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36573",
          "subject_time": 1561460700,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36574",
          "subject_time": 1561460880,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36575",
          "subject_time": 1561461840,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36576",
          "subject_time": 1561458540,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36577",
          "subject_time": 1561458480,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36578",
          "subject_time": 1561459020,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36579",
          "subject_time": 1561459200,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36580",
          "subject_time": 1561459860,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36581",
          "subject_time": 1561459740,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-36582",
          "subject_time": 1561466760,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-36583",
          "subject_time": 1561466700,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-36584",
          "subject_time": 1561467120,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-36585",
          "subject_time": 1561467240,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-36586",
          "subject_time": 1561467480,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-36587",
          "subject_time": 1561471380,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-36588",
          "subject_time": 1561504680,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-36589",
          "subject_time": 1561504740,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-36590",
          "subject_time": 1561504800,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-36591",
          "subject_time": 1561505040,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-36592",
          "subject_time": 1561505160,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-36593",
          "subject_time": 1561505460,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-36594",
          "subject_time": 1561517340,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-36595",
          "subject_time": 1561517580,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-36596",
          "subject_time": 1561517640,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-36597",
          "subject_time": 1561517880,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-36598",
          "subject_time": 1561517820,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-36599",
          "subject_time": 1561519800,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36600",
          "subject_time": 1561519740,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36601",
          "subject_time": 1561520100,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36602",
          "subject_time": 1561520040,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36603",
          "subject_time": 1561520580,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36604",
          "subject_time": 1561526820,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36605",
          "subject_time": 1561527000,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36606",
          "subject_time": 1562759940,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36607",
          "subject_time": 1561527120,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36608",
          "subject_time": 1561527360,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36609",
          "subject_time": 1561549740,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36610",
          "subject_time": 1561550040,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36611",
          "subject_time": 1561550760,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36612",
          "subject_time": 1561550580,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36613",
          "subject_time": 1561551120,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36614",
          "subject_time": 1561552260,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36615",
          "subject_time": 1561552140,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36616",
          "subject_time": 1561552680,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36617",
          "subject_time": 1561552740,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36618",
          "subject_time": 1561553460,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36619",
          "subject_time": 1561553460,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-36620",
          "subject_time": 1561936740,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-36621",
          "subject_time": 1561936440,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-36622",
          "subject_time": 1561936860,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-36623",
          "subject_time": 1561936920,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-36624",
          "subject_time": 1561937220,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-36625",
          "subject_time": 1561937340,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-36626",
          "subject_time": 1561941600,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-36627",
          "subject_time": 1561941720,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-36628",
          "subject_time": 1561941960,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-36629",
          "subject_time": 1561942020,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-36630",
          "subject_time": 1561942380,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-36631",
          "subject_time": 1562760660,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-36632",
          "subject_time": 1561948620,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-36633",
          "subject_time": 1561948500,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-36634",
          "subject_time": 1561948800,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-36635",
          "subject_time": 1561949220,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-36636",
          "subject_time": 1561949100,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-36637",
          "subject_time": 1561948980,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-36638",
          "subject_time": 1561951080,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36639",
          "subject_time": 1561951740,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36640",
          "subject_time": 1561951200,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36641",
          "subject_time": 1561951380,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36642",
          "subject_time": 1561951440,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36643",
          "subject_time": 1561959360,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36644",
          "subject_time": 1561959180,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36645",
          "subject_time": 1561959780,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36646",
          "subject_time": 1561959600,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36647",
          "subject_time": 1561960020,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36648",
          "subject_time": 1561978200,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36649",
          "subject_time": 1561978260,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36650",
          "subject_time": 1561978620,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36651",
          "subject_time": 1561978680,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36652",
          "subject_time": 1561979100,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36653",
          "subject_time": 1561979580,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-36654",
          "subject_time": 1561980000,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-36655",
          "subject_time": 1561979880,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-36656",
          "subject_time": 1561980420,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-36657",
          "subject_time": 1561980300,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-36658",
          "subject_time": 1563246720,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-36659",
          "subject_time": 1562020560,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36660",
          "subject_time": 1562020620,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36661",
          "subject_time": 1562020860,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36662",
          "subject_time": 1562020920,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36663",
          "subject_time": 1562021460,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36664",
          "subject_time": 1562021340,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-36665",
          "subject_time": 1562034960,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-36666",
          "subject_time": 1562035860,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-36667",
          "subject_time": 1562034420,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-36668",
          "subject_time": 1562036100,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-36669",
          "subject_time": 1562037060,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-36670",
          "subject_time": 1562036400,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-36671",
          "subject_time": 1562036520,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36672",
          "subject_time": 1562036760,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36673",
          "subject_time": 1562037120,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36674",
          "subject_time": 1562024580,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-36675",
          "subject_time": 1562024640,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-36676",
          "subject_time": 1562024880,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-36677",
          "subject_time": 1562024940,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-36678",
          "subject_time": 1562026320,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-36679",
          "subject_time": 1562026620,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-36680",
          "subject_time": 1562046180,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36681",
          "subject_time": 1562046480,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36682",
          "subject_time": 1562046600,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36683",
          "subject_time": 1562046720,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36684",
          "subject_time": 1562046960,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36685",
          "subject_time": 1562047080,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-36686",
          "subject_time": 1562066520,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36687",
          "subject_time": 1562066940,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36688",
          "subject_time": 1562066580,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36689",
          "subject_time": 1562068440,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36690",
          "subject_time": 1562069280,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36691",
          "subject_time": 1562069100,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-36692",
          "subject_time": 1562071380,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-36693",
          "subject_time": 1562071620,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-36694",
          "subject_time": 1562071860,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-36695",
          "subject_time": 1562071920,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-36696",
          "subject_time": 1562072220,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-36697",
          "subject_time": 1562884680,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-36698",
          "subject_time": 1562070480,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36699",
          "subject_time": 1562069940,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36901",
          "subject_time": 1562649300,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36902",
          "subject_time": 1562649060,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36903",
          "subject_time": 1562649420,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36904",
          "subject_time": 1562649540,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36906",
          "subject_time": 1562649660,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36907",
          "subject_time": 1562649960,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-36908",
          "subject_time": 1562671440,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36909",
          "subject_time": 1562673000,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36910",
          "subject_time": 1562671740,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36911",
          "subject_time": 1562673240,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36912",
          "subject_time": 1562673900,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36913",
          "subject_time": 1562674200,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-36914",
          "subject_time": 1562674320,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36915",
          "subject_time": 1562673780,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36916",
          "subject_time": 1562674740,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36918",
          "subject_time": 1562675100,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36919",
          "subject_time": 1562675100,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36920",
          "subject_time": 1562676540,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-36921",
          "subject_time": 1562713080,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-36922",
          "subject_time": 1562713320,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-36923",
          "subject_time": 1562713380,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-36924",
          "subject_time": 1562713200,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-36927",
          "subject_time": 1562713500,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-36928",
          "subject_time": 1563405900,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-36929",
          "subject_time": 1562714580,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-36930",
          "subject_time": 1562715240,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-36931",
          "subject_time": 1562715300,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-36932",
          "subject_time": 1562715840,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-36933",
          "subject_time": 1562715720,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-36934",
          "subject_time": 1562760720,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-36935",
          "subject_time": 1562760960,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-36936",
          "subject_time": 1562761140,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-36937",
          "subject_time": 1562755680,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36938",
          "subject_time": 1562756340,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36939",
          "subject_time": 1562756040,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36940",
          "subject_time": 1562756760,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36941",
          "subject_time": 1562756880,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36942",
          "subject_time": 1562757180,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36943",
          "subject_time": 1562758140,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36944",
          "subject_time": 1562757540,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36945",
          "subject_time": 1562757600,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36946",
          "subject_time": 1562759700,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36947",
          "subject_time": 1562758080,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-36948",
          "subject_time": 1562798580,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-36949",
          "subject_time": 1562798520,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-36950",
          "subject_time": 1562799000,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-36951",
          "subject_time": 1562798940,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-36952",
          "subject_time": 1562799660,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-36953",
          "subject_time": 1562799240,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-36955",
          "subject_time": 1562801400,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36956",
          "subject_time": 1562800620,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36960",
          "subject_time": 1562800920,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36961",
          "subject_time": 1562801100,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36962",
          "subject_time": 1562801460,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-36963",
          "subject_time": 1562804820,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-36964",
          "subject_time": 1562802840,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-36965",
          "subject_time": 1562804700,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-36966",
          "subject_time": 1562780340,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-36968",
          "subject_time": 1562805300,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-36969",
          "subject_time": 1562805420,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-36971",
          "subject_time": 1562813280,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36972",
          "subject_time": 1562813520,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36973",
          "subject_time": 1562813700,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36974",
          "subject_time": 1562814240,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36975",
          "subject_time": 1562814420,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36976",
          "subject_time": 1563362580,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36977",
          "subject_time": 1562815020,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-36978",
          "subject_time": 1562846460,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-36979",
          "subject_time": 1562928000,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36980",
          "subject_time": 1562847000,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-36981",
          "subject_time": 1562886660,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-36982",
          "subject_time": 1562886300,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-36983",
          "subject_time": 1562886780,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-36984",
          "subject_time": 1562886600,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-36985",
          "subject_time": 1562886960,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-36986",
          "subject_time": 1562887140,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-36987",
          "subject_time": 1562908800,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-36988",
          "subject_time": 1562903760,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-36989",
          "subject_time": 1562909040,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-36990",
          "subject_time": 1562904180,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-36991",
          "subject_time": 1562909220,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-36992",
          "subject_time": 1562909460,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-36993",
          "subject_time": 1562927220,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-36994",
          "subject_time": 1562926800,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-36996",
          "subject_time": 1562926560,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-36997",
          "subject_time": 1562927340,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-36998",
          "subject_time": 1562928540,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-36999",
          "subject_time": 1562928060,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-37000",
          "subject_time": 1562929320,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-37001",
          "subject_time": 1562930040,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-37002",
          "subject_time": 1562929620,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-37003",
          "subject_time": 1562929980,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-37004",
          "subject_time": 1563232620,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-37005",
          "subject_time": 1563232320,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-37006",
          "subject_time": 1563232980,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-37008",
          "subject_time": 1563232500,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-37009",
          "subject_time": 1563232920,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-37100",
          "subject_time": 1563490560,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-37101",
          "subject_time": 1563490680,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-37102",
          "subject_time": 1563490800,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-37103",
          "subject_time": 1563490920,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-37104",
          "subject_time": 1563490920,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-37105",
          "subject_time": 1563491160,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-37106",
          "subject_time": 1563493020,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-37107",
          "subject_time": 1563493080,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-37108",
          "subject_time": 1563493140,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-37109",
          "subject_time": 1563493260,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-37110",
          "subject_time": 1563493320,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-37111",
          "subject_time": 1563493440,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-37112",
          "subject_time": 1563503280,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-37113",
          "subject_time": 1563503220,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-37114",
          "subject_time": 1563503520,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-37115",
          "subject_time": 1563503580,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-37116",
          "subject_time": 1563504060,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-37117",
          "subject_time": 1563504000,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-37118",
          "subject_time": 1563504360,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-37119",
          "subject_time": 1563504420,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-37120",
          "subject_time": 1563505440,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-37121",
          "subject_time": 1563515700,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-37122",
          "subject_time": 1563515640,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-37123",
          "subject_time": 1563516060,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-37124",
          "subject_time": 1563516060,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-37125",
          "subject_time": 1563516420,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-37126",
          "subject_time": 1563516480,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-37127",
          "subject_time": 1563513840,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-37128",
          "subject_time": 1563513900,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-37129",
          "subject_time": 1563513960,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-37130",
          "subject_time": 1563514200,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-37131",
          "subject_time": 1563513540,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-37132",
          "subject_time": 1563514440,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-37133",
          "subject_time": 1563531540,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-37134",
          "subject_time": 1563531900,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-37135",
          "subject_time": 1563532140,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-37136",
          "subject_time": 1563531480,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-37137",
          "subject_time": 1563532500,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-37138",
          "subject_time": 1563532680,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-37139",
          "subject_time": 1563533040,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-37140",
          "subject_time": 1563533100,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-37141",
          "subject_time": 1563533460,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-37142",
          "subject_time": 1563533520,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-37144",
          "subject_time": 1563533940,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-37145",
          "subject_time": 1563534120,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-37147",
          "subject_time": 1563750060,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-37148",
          "subject_time": 1563750360,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-37149",
          "subject_time": 1563750300,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-37150",
          "subject_time": 1563750600,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-37151",
          "subject_time": 1563750720,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-37152",
          "subject_time": 1563751740,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-37154",
          "subject_time": 1563751920,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-37155",
          "subject_time": 1563752220,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-37156",
          "subject_time": 1563752220,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-37157",
          "subject_time": 1563752580,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-37158",
          "subject_time": 1563748500,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-37159",
          "subject_time": 1563748860,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-37160",
          "subject_time": 1563748980,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-37161",
          "subject_time": 1563749580,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-37162",
          "subject_time": 1563749340,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-37163",
          "subject_time": 1563748920,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-37164",
          "subject_time": 1563762540,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-37165",
          "subject_time": 1563754440,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-37166",
          "subject_time": 1563754560,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-37167",
          "subject_time": 1563754680,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-37168",
          "subject_time": 1563754860,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-37169",
          "subject_time": 1563754980,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-37170",
          "subject_time": 1563755400,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-37171",
          "subject_time": 1563756300,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-37173",
          "subject_time": 1563761340,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-37174",
          "subject_time": 1563756480,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-37175",
          "subject_time": 1563756600,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-37176",
          "subject_time": 1563756720,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-37177",
          "subject_time": 1563756900,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-37010",
          "subject_time": 1563246120,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-37011",
          "subject_time": 1563246240,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-37012",
          "subject_time": 1563246420,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-37013",
          "subject_time": 1563246480,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-37014",
          "subject_time": 1563246060,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-37015",
          "subject_time": 1563277800,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-37016",
          "subject_time": 1563275880,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-37017",
          "subject_time": 1563276300,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-37018",
          "subject_time": 1563279000,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-37020",
          "subject_time": 1563278520,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-37021",
          "subject_time": 1563279900,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-37022",
          "subject_time": 1563318300,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-37023",
          "subject_time": 1563316080,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-37025",
          "subject_time": 1563316680,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-37026",
          "subject_time": 1563318660,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-37028",
          "subject_time": 1563317040,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-37029",
          "subject_time": 1563318120,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-37030",
          "subject_time": 1563321240,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-37032",
          "subject_time": 1563319620,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-37033",
          "subject_time": 1563322440,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-37034",
          "subject_time": 1563322500,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-37035",
          "subject_time": 1563322680,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-37036",
          "subject_time": 1563322740,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-37037",
          "subject_time": 1563332460,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-37038",
          "subject_time": 1563332520,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-37039",
          "subject_time": 1563332700,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-37040",
          "subject_time": 1563332820,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-37041",
          "subject_time": 1563333780,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-37042",
          "subject_time": 1563333720,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-37043",
          "subject_time": 1563334920,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-37046",
          "subject_time": 1563362460,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-37047",
          "subject_time": 1563364560,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-37048",
          "subject_time": 1563364440,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-37049",
          "subject_time": 1563365040,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-37050",
          "subject_time": 1563364920,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-37051",
          "subject_time": 1563360900,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-37052",
          "subject_time": 1563361380,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-37053",
          "subject_time": 1563361200,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-37054",
          "subject_time": 1563361620,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-37055",
          "subject_time": 1563361680,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-37056",
          "subject_time": 1563362160,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-37057",
          "subject_time": 1563365400,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-37058",
          "subject_time": 1563365520,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-37059",
          "subject_time": 1563365880,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-37060",
          "subject_time": 1563365940,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-37061",
          "subject_time": 1563365820,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-37062",
          "subject_time": 1563366360,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-37063",
          "subject_time": 1563403320,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-37064",
          "subject_time": 1563403200,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-37065",
          "subject_time": 1563403680,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-37066",
          "subject_time": 1563403680,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-37067",
          "subject_time": 1563402660,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-37068",
          "subject_time": 1563405060,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-37069",
          "subject_time": 1563421020,
          "event_value": 1
        },
        {
          "subject_name": "C1-6-D-37070",
          "subject_time": 1563421140,
          "event_value": 2
        },
        {
          "subject_name": "C1-6-D-37071",
          "subject_time": 1563421680,
          "event_value": 3
        },
        {
          "subject_name": "C1-6-D-37072",
          "subject_time": 1563421740,
          "event_value": 4
        },
        {
          "subject_name": "C1-6-D-37073",
          "subject_time": 1563422040,
          "event_value": 5
        },
        {
          "subject_name": "C1-6-D-37075",
          "subject_time": 1563420720,
          "event_value": 6
        },
        {
          "subject_name": "C1-6-D-37076",
          "subject_time": 1563418920,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-37077",
          "subject_time": 1563418500,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-37078",
          "subject_time": 1563418560,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-37079",
          "subject_time": 1563418860,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-37081",
          "subject_time": 1563427620,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-37082",
          "subject_time": 1563427980,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-37083",
          "subject_time": 1563427740,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-37084",
          "subject_time": 1563428160,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-37085",
          "subject_time": 1563428460,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-37086",
          "subject_time": 1563428280,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-37087",
          "subject_time": 1563448620,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-37089",
          "subject_time": 1563451620,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-37090",
          "subject_time": 1563448920,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-37091",
          "subject_time": 1563449340,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-37092",
          "subject_time": 1563450660,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-37093",
          "subject_time": 1563451080,
          "event_value": 13
        },
        {
          "subject_name": "C1-6-D-37094",
          "subject_time": 1563451740,
          "event_value": 7
        },
        {
          "subject_name": "C1-6-D-37095",
          "subject_time": 1563452940,
          "event_value": 8
        },
        {
          "subject_name": "C1-6-D-37096",
          "subject_time": 1563452160,
          "event_value": 9
        },
        {
          "subject_name": "C1-6-D-37097",
          "subject_time": 1563452580,
          "event_value": 11
        },
        {
          "subject_name": "C1-6-D-37098",
          "subject_time": 1563452640,
          "event_value": 12
        },
        {
          "subject_name": "C1-6-D-37099",
          "subject_time": 1563453120,
          "event_value": 13
        }
      ]

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
    onDCP(client, params) {
        console.log(params.key);
        const event = 'dcp';
        const data = { key: params.select, data: this.dcpData[params.key] };
        console.log(data);

        return of({ event, data }).pipe(delay(0));
    }

    @SubscribeMessage('dcp-visualization')
    onVisualizationData(client, dcp) {
        const event = 'dcp-visualization';
        let data: Object[];

        if (dcp.id.startsWith('UAP')) {
            data = this.visualizationData1;
        } else if (dcp.id.startsWith('CAW')) {
            data = this.visualizationData2;
        }

        return of({ event, data }).pipe(delay(1000));
    }
}
