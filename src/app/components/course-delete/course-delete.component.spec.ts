import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDeleteComponent } from './course-delete.component';

describe('CourseDeleteComponent', () => {
  let component: CourseDeleteComponent;
  let fixture: ComponentFixture<CourseDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseDeleteComponent]
    });
    fixture = TestBed.createComponent(CourseDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
