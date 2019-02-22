import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeasFilterComponent } from './ideas-filter.component';

describe('IdeasFilterComponent', () => {
  let component: IdeasFilterComponent;
  let fixture: ComponentFixture<IdeasFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdeasFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeasFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
