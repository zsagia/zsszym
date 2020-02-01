import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
    DcpDataService,
    DCP,
    DCPStateService,
    OperationData
} from '@zsszym/feature/dcp/api';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
    selector: 'zsszym-dcp-form',
    templateUrl: './dcp-form.component.html',
    styleUrls: ['./dcp-form.component.scss']
})
export class DcpFormComponent implements OnInit {
    public dcp: DCP = {};
    public dcpForm: FormGroup;
    public lineNumberAndInputPrompts$: Observable<string[]>;
    public partNumbers$: Observable<string[]>;
    public plantKeys$: Observable<string[]>;
    public routes$: Observable<string[]>;
    private operationMap: Map<string, string[]>;
    public operations$: Observable<string[]>;

    public constructor(
        private formBuilder: FormBuilder,
        private dcpStateService: DCPStateService
    ) {}

    private createId(dcp: DCP): string {
        const properties: string[] = [dcp.plantKey, dcp.route, dcp.operation];

        return properties.filter(item => !!item).join('_');
    }

    public plantKeyChangeHandler(plantKey: string): void {
        if (plantKey) {
            this.dcp = {
                plantKey: plantKey
            };
            this.dcp.id = this.createId(this.dcp);

            this.dcpStateService.requestDataForSelect(this.dcp.id, 'routes');
        }
    }

    public routeChangeHandler(route: string): void {
        if (route) {
            this.dcp = {
                plantKey: this.dcp.plantKey,
                route: route
            };
            this.dcp.id = this.createId(this.dcp);

            this.dcpStateService.requestDataForSelect(
                this.dcp.id,
                'operations'
            );
        }
    }

    public operationChangeHandler(operation: string): void {
        if (operation) {
            this.dcp = {
                plantKey: this.dcp.plantKey,
                route: this.dcp.route,
                operation: operation
            };
            this.dcp.id = this.createId(this.dcp);

            this.dcpStateService.requestDataForSelect(
                this.dcp.id,
                'operationData'
            );
        }
    }

    public lineNumberAndInputPromptChangeHandler(
        lineNumberAndInputPrompt: string
    ): void {
        if (lineNumberAndInputPrompt) {
            this.dcp = {
                plantKey: this.dcp.plantKey,
                route: this.dcp.route,
                operation: this.dcp.operation,
                lineNumberAndInputPrompt: lineNumberAndInputPrompt
            };

            this.dcp.id = this.createId(this.dcp);

            this.dcpStateService.createPartNumberArray(
                'partNumbers',
                this.operationMap.get(lineNumberAndInputPrompt)
            );
        }
    }

    public partNumberChangeHandler(partNumber: string): void {
        if (partNumber) {
            this.dcp = {
                plantKey: this.dcp.plantKey,
                route: this.dcp.route,
                operation: this.dcp.operation,
                lineNumberAndInputPrompt: this.dcp.lineNumberAndInputPrompt,
                id:
                    this.dcp.plantKey +
                    '&&&' +
                    this.dcp.route +
                    '&&&' +
                    this.dcp.operation +
                    '&&&' +
                    this.dcp.lineNumberAndInputPrompt +
                    '&&&' +
                    partNumber,
                partNumber: partNumber
            };
        }
    }

    public ngOnInit() {
        this.dcpForm = this.formBuilder.group({
            deptOfAnalysis: [0, [Validators.required]],
            filterOutliers: [null, [Validators.required]],
            fromDate: [null, [Validators.required]],
            lineNumberAndInputPrompt: [null, [Validators.required]],
            maximumY: [null, [Validators.required]],
            minimumY: [null, [Validators.required]],
            operation: [null, [Validators.required]],
            partNumber: [null, [Validators.required]],
            plantKey: [null, [Validators.required]],
            route: [null, [Validators.required]],
            toDate: [null, [Validators.required]]
        });

        this.plantKeys$ = this.dcpStateService
            .selectDataForSelect$('plantKeys')
            .pipe(
                tap(plantKeys =>
                    this.dcpForm.patchValue({
                        plantKey: plantKeys[0]
                    })
                )
            );

        this.routes$ = this.dcpStateService.selectDataForSelect$('routes').pipe(
            tap(routes => {
                this.dcpForm.patchValue({
                    route: routes[0]
                });
            })
        );

        this.operations$ = this.dcpStateService
            .selectDataForSelect$('operations')
            .pipe(
                tap(operations => {
                    this.dcpForm.patchValue({
                        operation: operations[0]
                    });
                })
            );

        this.dcpStateService
            .selectDataForSelect$('operationData')
            .pipe(
                tap(operationData => {
                    const operationSet: Set<string> = new Set();
                    const operationMap: Map<string, string[]> = new Map();

                    operationData = operationData || [];

                    operationData.forEach((operation: OperationData) => {
                        const key =
                            operation.line_number +
                            ' ' +
                            operation.input_prompt;

                        operationSet.add(key);

                        if (!operationMap.has(key)) {
                            operationMap.set(key, [operation.partn_number]);
                        } else {
                            operationMap.get(key).push(operation.partn_number);
                        }
                    });

                    this.operationMap = operationMap;

                    this.dcpStateService.createLineNumberAndInputPromptArray(
                        'lineNumberAndInputPrompts',
                        Array.from(operationSet)
                    );
                })
            )
            .subscribe();

        this.lineNumberAndInputPrompts$ = this.dcpStateService
            .selectDataForSelect$('lineNumberAndInputPrompts')
            .pipe(
                tap(lineNumberAndInputPrompts => {
                    this.dcpForm.patchValue({
                        lineNumberAndInputPrompt: lineNumberAndInputPrompts[0]
                    });
                })
            );

        this.partNumbers$ = this.dcpStateService
            .selectDataForSelect$('partNumbers')
            .pipe(
                tap(partNumbers => {
                    this.dcpForm.patchValue({
                        partNumber: partNumbers[0]
                    });
                })
            );

        this.dcpStateService.requestDataForSelect('root', 'plantKeys');
    }

    public compareFn = (o1: string, o2: string) => {
        return o1 === o2;
    };

    public onSubmit(): void {
        this.dcpStateService.requestDataForTable(this.dcp);
    }
}
