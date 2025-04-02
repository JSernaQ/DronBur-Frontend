import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MomentsPage } from './moments.page';

describe('MomentsPage', () => {
  let component: MomentsPage;
  let fixture: ComponentFixture<MomentsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MomentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
