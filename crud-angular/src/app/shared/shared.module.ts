import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [],
  imports: [
    ErrorDialogComponent,
    CommonModule,
    MatButtonModule
  ],
  exports: [
    ErrorDialogComponent,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule
  ]
})
export class SharedModule { }
