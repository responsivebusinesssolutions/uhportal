import { DataTableService } from '../../core/services/data-table.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { DataTableItem } from '../../core/interfaces/data-table-item';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<DataTableItem>;
  dataSource: MatTableDataSource<DataTableItem>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'email'];

  constructor(private dataTableService: DataTableService) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.loadTableData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  public applyFilter = (searchKey: string) => {
    this.dataSource.filter = searchKey.trim().toLocaleLowerCase();
  }

  private loadTableData() {
    this.dataTableService.getTableData().subscribe(
      data => {
        this.dataSource.data = data;
      }
    );
  }
}
