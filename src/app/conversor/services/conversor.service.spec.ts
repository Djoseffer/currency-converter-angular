import { TestBed } from '@angular/core/testing';

import { ConversorService } from './conversor.service';
import {HttpClientModule} from "@angular/common/http";

describe('ConversorService', () => {
  let service: ConversorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConversorService
      ],
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(ConversorService);
  });
});
