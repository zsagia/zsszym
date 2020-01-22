import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'zsszym-dcp-form',
    templateUrl: './dcp-form.component.html',
    styleUrls: ['./dcp-form.component.scss']
})
export class DcpFormComponent implements OnInit {
    public dcpForm: FormGroup;

    public constructor(private formBuilder: FormBuilder) {}

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
    }
}
