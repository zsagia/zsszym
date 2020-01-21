import { async, TestBed } from '@angular/core/testing';
import { FeatureDcpApiModule } from './feature-dcp-api.module';

describe('FeatureDcpApiModule', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FeatureDcpApiModule]
        }).compileComponents();
    }));

    it('should create', () => {
        expect(FeatureDcpApiModule).toBeDefined();
    });
});
