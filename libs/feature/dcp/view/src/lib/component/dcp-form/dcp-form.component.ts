import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DcpDataService, DCP } from '@zsszym/feature/dcp/api';
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
    public plantKeys$: Observable<string[]>;
    public route$: Observable<string[]>;
    public operation$: Observable<string[]>;

    public constructor(
        private formBuilder: FormBuilder,
        private dcpDataService: DcpDataService
    ) {}

    public plantKeyChangeHandler(plantKey: string): void {
        if (plantKey) {
            this.dcpDataService.requestData(
                DcpDataService.PROPERTY_NAMES.ROUTE,
                plantKey
            );
        }
    }

    public routeChangeHandler(route: string): void {
        if (route) {
            this.dcpDataService.requestData(
                DcpDataService.PROPERTY_NAMES.OPERATION,
                route
            );
        }
    }

    public operationChangeHandler(operation: string): void {}

    public ngOnInit() {
        this.dcpForm = this.formBuilder.group({
            deptOfAnalysis: [0, [Validators.required]],
            filterOutliers: [null, [Validators.required]],
            fromDate: [null, [Validators.required]],
            lineNumber: [null, [Validators.required]],
            maximumY: [null, [Validators.required]],
            minimumY: [null, [Validators.required]],
            operation: [null, [Validators.required]],
            partNumber: [null, [Validators.required]],
            plantKey: [null, [Validators.required]],
            route: [null, [Validators.required]],
            toDate: [null, [Validators.required]]
        });

        this.plantKeys$ = this.dcpDataService.receiveData$(
            DcpDataService.PROPERTY_NAMES.PLANT_KEY
        );

        this.route$ = this.dcpDataService
            .receiveData$(DcpDataService.PROPERTY_NAMES.ROUTE)
            .pipe(
                tap(routes => {
                    this.dcp.route = routes[0];
                })
            );

        this.operation$ = this.dcpDataService
            .receiveData$(DcpDataService.PROPERTY_NAMES.OPERATION)
            .pipe(
                tap(operations => {
                    console.log(operations);
                    this.dcp.operation = operations[0];
                })
            );

        this.plantKeys$.subscribe(plantKeys => {
            this.dcp.plantKey = plantKeys[0];
        });

        this.dcpDataService.requestData(
            DcpDataService.PROPERTY_NAMES.PLANT_KEY,
            ''
        );
    }

    public compareFn = (o1: string, o2: string) => {
        return o1 === o2;
    };
}
