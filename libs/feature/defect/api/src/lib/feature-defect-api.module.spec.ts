import { async, TestBed } from '@angular/core/testing';
import { FeatureDefectApiModule } from './feature-defect-api.module';

describe('FeatureDefectApiModule', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FeatureDefectApiModule]
        }).compileComponents();
    }));

    it('should create', () => {
        expect(FeatureDefectApiModule).toBeDefined();
    });
});
