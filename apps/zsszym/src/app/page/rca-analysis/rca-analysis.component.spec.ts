import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcaAnalysisComponent } from './rca-analysis.component';

describe('RcaAnalysisComponent', () => {
    let component: RcaAnalysisComponent;
    let fixture: ComponentFixture<RcaAnalysisComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RcaAnalysisComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RcaAnalysisComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
