import { Component, OnInit } from '@angular/core';
import { Fornecedor } from '../model/fornecedor';
import { MatTableModule } from '@angular/material/table';
import { FornecedoresService } from '../services/fornecedores.service';
import { catchError, Observable, of } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf, CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fornecedores',
  standalone: true,
  imports: [
    MatTableModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    NgIf,
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './fornecedores.component.html',
  styleUrl: './fornecedores.component.scss'
})
export class FornecedoresComponent {

  fornecedores$: Observable<Fornecedor[]>;
  displayedColumns = [ 'document', 'name', 'email', 'adressCode', 'actions' ];

  constructor(
    public fornecedoresService: FornecedoresService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.fornecedores$ = this.fornecedoresService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar Fornecedores!')
        return of([]);
      })
    )
  }

  onError(errorMsg: String) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    })
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  onEmpresa(fornecedorDocumento: string) {
    this.router.navigate(['empresas'], {relativeTo: this.route, queryParams: { fornecedorDocumento } })
  }
}
