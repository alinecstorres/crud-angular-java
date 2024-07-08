import { ContratosComponent } from './../empresas/contratos/contratos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FornecedoresComponent } from './fornecedores/fornecedores.component';
import { FornecedorFormComponent } from './fornecedor-form/fornecedor-form.component';
import { EmpresasFormComponent } from '../empresas/empresas-form/empresas-form.component';
import { EmpresasCadatroFormComponent } from '../empresas/empresas-cadatro-form/empresas-cadatro-form.component';

const routes: Routes = [
  { path: '', component: FornecedoresComponent },
  { path: 'new', component: FornecedorFormComponent },
  { path: 'empresas', component: EmpresasFormComponent },
  { path: 'empresas/new', component: EmpresasCadatroFormComponent },
  { path: 'empresas/contratos', component: ContratosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornecedoresRoutingModule { }
