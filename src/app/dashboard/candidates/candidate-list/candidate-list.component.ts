import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { MatTableDataSource } from '@angular/material';

import { CandidateService } from '../candidate.service';
import { LoadingService } from 'src/app/shared/components/loading/loading.service';

import { Candidate } from '../interfaces/candidate.interface';
import { Role } from '../../../auth/enums/role.enum';

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
  roles = Role;

  constructor(private candidateService: CandidateService, private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadCandidates();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.table.dataSource = this.dataSource;
  }

  onApplyFilter(searchKey: string): void {
    this.dataSource.filter = searchKey.trim().toLocaleLowerCase();
  }

  private loadCandidates() {
    this.loadingService.push(true);
    this.dataSource = new MatTableDataSource();

    this.candidateService.getCandidates().subscribe((res: Array<Candidate>) => {
      this.dataSource.data = res;
      this.loadingService.push(false);
    });
  }
}
