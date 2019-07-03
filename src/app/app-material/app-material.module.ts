import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
         MatButtonModule, 
         MatCardModule, 
         MatFormFieldModule,
         MatInputModule,
         MatToolbarModule        
        } from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule, 
    MatCardModule, 
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule
  ],
  exports: [
    MatButtonModule, 
    MatCardModule, 
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule   
  ]
})
export class AppMaterialModule { }