import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcpFormComponent } from './dcp-form.component';

describe('DcpFormComponent', () => {
  let component: DcpFormComponent;
  let fixture: ComponentFixture<DcpFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcpFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
