import { async, TestBed } from '@angular/core/testing';
import { FeatureDcpStateModule } from './feature-dcp-state.module';

describe('FeatureDcpStateModule', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FeatureDcpStateModule]
        }).compileComponents();
    }));

    it('should create', () => {
        expect(FeatureDcpStateModule).toBeDefined();
    });
});
