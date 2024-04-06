import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitionNewComponent } from './transition.component';

describe('TransitionComponent', () => {
  let component: TransitionNewComponent;
  let fixture: ComponentFixture<TransitionNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransitionNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransitionNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
