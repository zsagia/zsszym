import { async, TestBed } from '@angular/core/testing';
import { FeatureDcpViewModule } from './feature-dcp-view.module';

describe('FeatureDcpViewModule', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FeatureDcpViewModule]
        }).compileComponents();
    }));

    it('should create', () => {
        expect(FeatureDcpViewModule).toBeDefined();
    });
});
