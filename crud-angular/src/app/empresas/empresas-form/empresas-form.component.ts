import { EmpresasService } from './../services/empresas.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Empresa } from '../model/empresa';
import { Observable, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-empresas-form',
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './empresas-form.component.html',
  styleUrl: './empresas-form.component.scss'
})
export class EmpresasFormComponent implements OnInit{

  form: FormGroup;
  empresas$: Observable<Empresa[]>;
  displayedColumns = [ 'document', 'name', 'adressCode', 'actions' ];

  constructor(private formBuilder: FormBuilder,
    private service: EmpresasService,
    private snackBar: MatSnackBar,
    private location: Location,
    public empresasService: EmpresasService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.form = this.formBuilder.group({
      _document: [null],
      fornecedorDocumento: [null],
    })

    this.empresas$ = this.empresasService.listContratos()
    .pipe(
      catchError(error => {
        this.onErrorContratos('Erro ao carregar Contratos!')
        return of([])
      })
    )


  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['fornecedorDocumento']) {
        this.form.patchValue({
          fornecedorDocumento: params['fornecedorDocumento']
        });
      }
    });
  }

  onErrorContratos(errorMsg: String) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    })
  }

  private onSuccessCancel() {
    this.snackBar.open('Contrato cancelado com sucesso!', '', {duration: 5000});
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar empresa', '', {duration: 5000});
  }

  onCancelContract() {
    this.service.delete()
    .subscribe(result => this.onSuccessCancel(), error => this.onError());
  }

  onCancel() {
    this.location.forward();
  }

  buscarEmpresa() {
    const empresa = this.form.get('_document')?.value;
    const fornecedor = this.form.get('fornecedorDocumento')?.value;

    if (empresa && fornecedor) {
      this.http.put('http://localhost:8080/api/fornecedores/empresas/contratar', { fornecedor: fornecedor, empresa: empresa })
        .subscribe(
          () => {
            this.onSuccessSearch();
          },
          (error) => {
            console.error('Erro ao contratar:', error);
            this.snackBar.open('Erro ao contratar serviço!', '', { duration: 5000 });
          }
        );
    } else {
      console.error('Valores de contratante ou fornecedorDocumento são nulos ou indefinidos.');
    }
  }

  cadastrarEmpresa() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  onSuccessSearch() {
    this.snackBar.open('Contratado com sucesso!', '', {duration: 5000});
    this.onlistContratos();
  }

  onNotFoud() {
    this.snackBar.open('Empresa não encontrada. Cadastre-se!', '', {duration: 5000});
  }

  onlistContratos() {
    this.router.navigate(['contratos'], {relativeTo: this.route})
  }

  back() {
    this.location.back();
  }

}
