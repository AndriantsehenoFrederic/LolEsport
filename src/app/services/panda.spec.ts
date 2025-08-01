// panda.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PandaService } from './panda';

describe('PandaService', () => {
  let service: PandaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Simule HttpClient
    });
    service = TestBed.inject(PandaService);
  });

  it('devrait récupérer les tournois', () => {
    // Ici, on testerait si getTournaments() appelle bien l'API
    expect(service.getTournaments).toBeDefined();
  });
});