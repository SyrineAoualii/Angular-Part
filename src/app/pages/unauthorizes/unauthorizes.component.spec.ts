import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorizesComponent } from './unauthorizes.component';

describe('UnauthorizesComponent', () => {
  let component: UnauthorizesComponent;
  let fixture: ComponentFixture<UnauthorizesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnauthorizesComponent]
    });
    fixture = TestBed.createComponent(UnauthorizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
