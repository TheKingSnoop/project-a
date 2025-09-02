import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceCreatedComponent } from './invoice-created.component';

describe('InvoiceCreatedComponent', () => {
  let component: InvoiceCreatedComponent;
  let fixture: ComponentFixture<InvoiceCreatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceCreatedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
