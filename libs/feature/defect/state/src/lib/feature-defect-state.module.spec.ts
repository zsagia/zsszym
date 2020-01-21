import { async, TestBed } from '@angular/core/testing';
import { FeatureDefectStateModule } from './feature-defect-state.module';

describe('FeatureDefectStateModule', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FeatureDefectStateModule]
        }).compileComponents();
    }));

    it('should create', () => {
        expect(FeatureDefectStateModule).toBeDefined();
    });
});
