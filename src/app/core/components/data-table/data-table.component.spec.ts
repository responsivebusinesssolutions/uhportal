import { async, fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';

import { AppMaterialModule } from '../../../app-material/app-material.module';
import { DataTableContainerComponent } from './../../containers/data-table-container/data-table-container.component';
import { DataTableComponent } from './data-table.component';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableComponent, DataTableContainerComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [
        AppMaterialModule, 
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        RouterTestingModule
      ]      
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
