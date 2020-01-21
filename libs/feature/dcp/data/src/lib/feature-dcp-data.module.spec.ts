import { async, TestBed } from '@angular/core/testing';
import { FeatureDcpDataModule } from './feature-dcp-data.module';

describe('FeatureDcpDataModule', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FeatureDcpDataModule]
        }).compileComponents();
    }));

    it('should create', () => {
        expect(FeatureDcpDataModule).toBeDefined();
    });
});
