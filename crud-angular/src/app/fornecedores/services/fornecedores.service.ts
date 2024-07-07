import { Injectable } from '@angular/core';

import { Fornecedor } from '../model/fornecedor';
import { HttpClient } from '@angular/common/http';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FornecedoresService {

  private readonly API = 'api/fornecedores';
  constructor(private httpClient: HttpClient) { }

  list(){
    return this.httpClient.get<Fornecedor[]>(this.API)
    .pipe(
      first(),
      delay(5000),
      tap()
    );
  }

}
