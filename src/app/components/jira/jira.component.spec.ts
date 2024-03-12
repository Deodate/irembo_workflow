import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JiraComponent } from './jira.component';

describe('JiraComponent', () => {
  let component: JiraComponent;
  let fixture: ComponentFixture<JiraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JiraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
