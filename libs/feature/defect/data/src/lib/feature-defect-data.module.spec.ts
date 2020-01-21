import { async, TestBed } from '@angular/core/testing';
import { FeatureDefectDataModule } from './feature-defect-data.module';

describe('FeatureDefectDataModule', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FeatureDefectDataModule]
        }).compileComponents();
    }));

    it('should create', () => {
        expect(FeatureDefectDataModule).toBeDefined();
    });
});
