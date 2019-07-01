import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
         MatButtonModule, 
         MatCardModule, 
         MatFormFieldModule,
         MatInputModule,
         MatToolbarModule        
        } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule, 
    MatCardModule, 
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule
  ],
  exports: [
    FormsModule,
    MatButtonModule, 
    MatCardModule, 
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule   
  ]
})
export class AppMaterialModule { }