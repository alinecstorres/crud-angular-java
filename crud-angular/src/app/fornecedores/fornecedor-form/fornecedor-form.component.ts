import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FornecedoresService } from '../services/fornecedores.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-fornecedor-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatSnackBarModule,
    CommonModule,
  ],
  templateUrl: './fornecedor-form.component.html',
  styleUrl: './fornecedor-form.component.scss'
})
export class FornecedorFormComponent implements OnInit{

  form!: FormGroup;
  isCpf: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private service: FornecedoresService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      _document: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      adressCode: ['', Validators.required],
      documentRG: [''],
      birth: [''],
    });

    this.form.get('_document')?.valueChanges.subscribe(value => {
      if (value && (value.length === 11 || value.length === 14)) {
        this.isCpf = (value.length === 11); // Verifica se é CPF (11 dígitos)
        this.updateValidation();
      } else {
        this.isCpf = false;
        this.clearValidation();
      }
    });
  }

  onSubmit() {

  let cpfCnpj = this.form.get('_document')?.value;
  if (cpfCnpj && cpfCnpj.length === 11) {
    cpfCnpj = '0' + cpfCnpj;
  }

  this.service.save(this.form.value)
    .subscribe(
      result => this.onSuccess(),
      error => this.onError()
    );
}



  onCancel() {
    this.location.back();
  }

  isCpfDocument(document: string): boolean {
    return document.length === 11;
  }

  updateValidation() {
    if (this.isCpf) {
      this.form.get('documentRG')?.setValidators([Validators.required]);
      this.form.get('birth')?.setValidators([Validators.required]);
    } else {
      this.form.get('documentRG')?.clearValidators();
      this.form.get('birth')?.clearValidators();
    }
    this.form.get('documentRG')?.updateValueAndValidity();
    this.form.get('birth')?.updateValueAndValidity();
  }

  clearValidation() {
    this.form.get('documentRG')?.clearValidators();
    this.form.get('birth')?.clearValidators();
    this.form.get('documentRG')?.updateValueAndValidity();
    this.form.get('birth')?.updateValueAndValidity();
  }
  private onSuccess() {
    this.snackBar.open('Fornecedor cadastrado com sucesso!', '', {duration: 5000});
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar fornecedor', '', {duration: 5000});
  }

}
