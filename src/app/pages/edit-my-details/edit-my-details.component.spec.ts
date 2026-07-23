import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMyDetailsComponent } from './edit-my-details.component';

describe('EditMyDetailsComponent', () => {
  let component: EditMyDetailsComponent;
  let fixture: ComponentFixture<EditMyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMyDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
