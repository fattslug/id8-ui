import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconpickerComponent } from './iconpicker.component';

describe('IconpickerComponent', () => {
  let component: IconpickerComponent;
  let fixture: ComponentFixture<IconpickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconpickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconpickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
