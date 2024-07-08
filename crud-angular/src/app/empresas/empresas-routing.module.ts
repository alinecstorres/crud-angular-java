import { EmpresasCadatroFormComponent } from './empresas-cadatro-form/empresas-cadatro-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresasFormComponent } from './empresas-form/empresas-form.component';

const routes: Routes = [
  { path: 'empresas', component: EmpresasFormComponent },
  { path: 'new', component: EmpresasCadatroFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresasRoutingModule {}
