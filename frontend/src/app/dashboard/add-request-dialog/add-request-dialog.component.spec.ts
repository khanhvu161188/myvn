import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRequestDialogComponent } from './add-request-dialog.component';

describe('AddRequestDialogComponent', () => {
  let component: AddRequestDialogComponent;
  let fixture: ComponentFixture<AddRequestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRequestDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
