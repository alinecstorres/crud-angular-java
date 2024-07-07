import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-fornecedor-form',
  standalone: true,
  imports: [ MatFormFieldModule, ReactiveFormsModule ],
  templateUrl: './fornecedor-form.component.html',
  styleUrl: './fornecedor-form.component.scss'
})
export class FornecedorFormComponent implements OnInit{

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: [null],
      email: [null],
      adressCode: [null]
    })
  }

  ngOnInit(): void {

  }

}
