import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { MatTableDataSource } from '@angular/material';

import { CandidateService } from '../candidate.service';

import { Candidate } from '../interfaces/candidate.interface';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss']
})
export class CandidateListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<Candidate>;

  dataSource: MatTableDataSource<Candidate>;
  displayedColumns = ['id', 'name', 'email'];

  constructor(private candidateService: CandidateService) {}

  ngOnInit(): void {
    this.loadTableData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.table.dataSource = this.dataSource;
  }

  onApplyFilter(searchKey: string): void {
    this.dataSource.filter = searchKey.trim().toLocaleLowerCase();
  }

  private loadTableData() {
    this.dataSource = new MatTableDataSource();

    this.candidateService.getCandidates().subscribe(data => {
      this.dataSource.data = data;
    });
  }
}
