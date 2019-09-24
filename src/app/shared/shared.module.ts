import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, FormsModule, MaterialModule, ReactiveFormsModule, RouterModule],
  exports: [CommonModule, FormsModule, MaterialModule, ReactiveFormsModule, RouterModule]
})
export class SharedModule {}
