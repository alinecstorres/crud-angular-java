import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'fornecedores' },
  {
    path: 'fornecedores',
    loadChildren: () => import('./fornecedores/fornecedores.module').then(m => m.FornecedoresModule)
  }
];
