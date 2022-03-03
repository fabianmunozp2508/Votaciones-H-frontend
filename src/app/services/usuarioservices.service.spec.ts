/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UsuarioservicesService } from './usuario.service';

describe('Service: Usuarioservices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuarioservicesService]
    });
  });

  it('should ...', inject([UsuarioservicesService], (service: UsuarioservicesService) => {
    expect(service).toBeTruthy();
  }));
});
