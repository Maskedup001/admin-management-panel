import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsListPageComponent } from './admins-list-page.component';

describe('AdminsListPageComponent', () => {
  let component: AdminsListPageComponent;
  let fixture: ComponentFixture<AdminsListPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminsListPageComponent]
    });
    fixture = TestBed.createComponent(AdminsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
