import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcpTableComponent } from './dcp-table.component';

describe('DcpTableComponent', () => {
  let component: DcpTableComponent;
  let fixture: ComponentFixture<DcpTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcpTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcpTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
