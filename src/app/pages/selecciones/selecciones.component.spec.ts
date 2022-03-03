import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionesComponent } from './selecciones.component';

describe('SeleccionesComponent', () => {
  let component: SeleccionesComponent;
  let fixture: ComponentFixture<SeleccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
