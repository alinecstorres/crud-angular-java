import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EmpresasService } from '../services/empresas.service';
import { Location } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-empresas-cadatro-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatCardModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatInputModule
  ],
  templateUrl: './empresas-cadatro-form.component.html',
  styleUrl: './empresas-cadatro-form.component.scss'
})
export class EmpresasCadatroFormComponent {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private service: EmpresasService,
    private location: Location,
    private snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      _document: [null],
      name: [null],
      email: [null],
      adressCode: [null]
    })
  }

  onSubmit() {
    this.service.save(this.form.value)
    .subscribe(result => this.onSuccess(), error => this.onError());
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Empresa cadastrada com sucesso!', '', {duration: 5000});
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar empresa', '', {duration: 5000});
  }

}
