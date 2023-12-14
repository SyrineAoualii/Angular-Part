import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSaveComponent } from './course-save.component';

describe('CourseSaveComponent', () => {
  let component: CourseSaveComponent;
  let fixture: ComponentFixture<CourseSaveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseSaveComponent]
    });
    fixture = TestBed.createComponent(CourseSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
