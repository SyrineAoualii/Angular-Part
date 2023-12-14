import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AminCourseComponent } from './amin-course.component';

describe('AminCourseComponent', () => {
  let component: AminCourseComponent;
  let fixture: ComponentFixture<AminCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AminCourseComponent]
    });
    fixture = TestBed.createComponent(AminCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
