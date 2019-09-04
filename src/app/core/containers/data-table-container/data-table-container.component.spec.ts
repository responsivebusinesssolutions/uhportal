import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import { AppMaterialModule } from '../../../app-material/app-material.module';
import { DataTableContainerComponent } from './data-table-container.component';
import { DataTableComponent } from './../../components/data-table/data-table.component';

describe('DataTableContainerComponent', () => {
  let component: DataTableContainerComponent;
  let fixture: ComponentFixture<DataTableContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableContainerComponent, DataTableComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [
        AppMaterialModule, 
        BrowserAnimationsModule,
        MatTableModule
      ]      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
