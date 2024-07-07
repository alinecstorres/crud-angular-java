import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FornecedoresRoutingModule } from './fornecedores-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FornecedoresRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class FornecedoresModule { }
