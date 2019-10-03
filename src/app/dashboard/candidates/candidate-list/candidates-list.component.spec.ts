import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTableDataSource, MatTableModule } from '@angular/material';
import { of } from 'rxjs';

import { CandidateService } from '../candidate.service';

import { CandidateListComponent } from './candidate-list.component';

import { Candidate } from '../models/candidate.model';

import candidatesMock from '@assets/mocks/candidates.json';

describe('CandidateListComponent', () => {
  let candidateService: any;
  let component: CandidateListComponent;
  let fixture: ComponentFixture<CandidateListComponent>;
  let el: DebugElement;
  const candidateServiceSpy = jasmine.createSpyObj('CandidateService', ['getCandidates']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatTableModule],
      declarations: [CandidateListComponent],
      providers: [{ provide: CandidateService, useValue: candidateServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(CandidateListComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    candidateService = TestBed.inject(CandidateService);
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display breadcrumb', () => {
    fixture.detectChanges();

    const breadcrumb: HTMLHeadingElement = (el.nativeElement as HTMLElement).querySelector('app-breadcrumb');

    expect(breadcrumb).toBeTruthy();
  });

  it('should display the candidates list', () => {
    const list: Array<DebugElement> = el.queryAll(By.css('.candidate-list__table'));

    expect(list).toBeTruthy();
    expect(list.length).toBe(1);
  });

  it('should display 3 rows in the candidates list', () => {
    const candidates: Array<Candidate> = Object.values(candidatesMock);
    candidateService.getCandidates.and.returnValue(of(candidates));

    fixture.detectChanges();

    expect(candidates).toEqual(candidatesMock);

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      component.dataSource = new MatTableDataSource();
      component.dataSource.data = candidates;
      component.table.dataSource = component.dataSource;

      fixture.detectChanges();

      const tableRows: NodeListOf<HTMLTableRowElement> = (fixture.nativeElement as HTMLElement).querySelectorAll('tr');

      expect(tableRows.length).toBe(4);

      // Header row
      const headerRow: HTMLTableRowElement = tableRows[0];

      expect(headerRow.cells[0].innerHTML).toBe('ID');
      expect(headerRow.cells[1].innerHTML).toBe('Name');
      expect(headerRow.cells[2].innerHTML).toBe('E-mail');

      // Data rows
      const row2: HTMLTableRowElement = tableRows[2];

      expect(row2.cells[0].innerHTML).toBe('2');
      expect(row2.cells[1].innerHTML).toBe('Name 2');
      expect(row2.cells[2].innerHTML).toBe('E-mail 2');
    });
  });
});
