import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRequestTagsComponent } from './add-request-tags.component';

describe('AddRequestTagsComponent', () => {
  let component: AddRequestTagsComponent;
  let fixture: ComponentFixture<AddRequestTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRequestTagsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRequestTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
