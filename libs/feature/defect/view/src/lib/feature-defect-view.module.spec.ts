import { async, TestBed } from '@angular/core/testing';
import { FeatureDefectViewModule } from './feature-defect-view.module';

describe('FeatureDefectViewModule', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FeatureDefectViewModule]
        }).compileComponents();
    }));

    it('should create', () => {
        expect(FeatureDefectViewModule).toBeDefined();
    });
});
