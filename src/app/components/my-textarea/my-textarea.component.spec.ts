import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTextareaComponent } from './my-textarea.component';

describe('MyTextareaComponent', () => {
  let component: MyTextareaComponent;
  let fixture: ComponentFixture<MyTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTextareaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
