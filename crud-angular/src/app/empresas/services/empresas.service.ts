import { Injectable } from '@angular/core';
import { Empresa } from '../model/empresa';
import { HttpClient } from '@angular/common/http';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  private readonly API = 'api/fornecedores/empresas';

  constructor(private httpClient: HttpClient) { }

  listContratos() {
    return this.httpClient.get<Empresa[]>(this.API)
    .pipe(
      first(),
      delay(5000),
      tap()
    );
  }

  getById() {
    return this.httpClient.get<Empresa>(this.API);
  }

  getContratos(record: Empresa) {
    return this.httpClient.get<Empresa[]>(this.API);
  }

  save(record: Empresa) {
    return this.httpClient.post<Empresa>(this.API, record);
  }

  delete() {
    return this.httpClient.delete<Empresa>(this.API);
  }

  update(record: Empresa) {
    return this.httpClient.put<Empresa>(this.API, record);
  }
}
