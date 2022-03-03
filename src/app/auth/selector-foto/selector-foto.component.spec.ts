import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorFotoComponent } from './selector-foto.component';

describe('SelectorFotoComponent', () => {
  let component: SelectorFotoComponent;
  let fixture: ComponentFixture<SelectorFotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorFotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorFotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
