import { Fornecedor } from './../model/fornecedor';
import { Injectable } from '@angular/core';
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

  getById(){
    return this.httpClient.get<number>(this.API)
  }

  save(record: Fornecedor) {
    return this.httpClient.post<Fornecedor>(this.API, record);
  }

}
