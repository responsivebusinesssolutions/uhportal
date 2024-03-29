import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTableDataSource, MatTableModule } from '@angular/material';

import { of } from 'rxjs';

import { CandidateService } from '../candidate.service';

import { CandidateListComponent } from './candidate-list.component';

import { Candidate } from '../models/candidate.model';

import candidatesMock from '@assets/mocks/candidates.json';
import { I18nPipe } from '../../../i18n/i18n.pipe';

describe('CandidateListComponent', () => {
  let candidateService: any;
  let component: CandidateListComponent;
  let fixture: ComponentFixture<CandidateListComponent>;
  let el: DebugElement;
  const candidateServiceSpy = jasmine.createSpyObj('CandidateService', ['getCandidates']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatTableModule],
      declarations: [CandidateListComponent, I18nPipe],
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

  it('should display the candidates list', () => {
    const list: Array<DebugElement> = el.queryAll(By.css('.candidate-list__table'));

    expect(list).toBeTruthy();
    expect(list.length).toBe(1);
  });

  xit('should display 3 rows in the candidates list', fakeAsync(() => {
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

      tick();

      // FIXME: handling async data flow due to i18n
      expect(headerRow.cells[0].innerHTML).toBe('');
      expect(headerRow.cells[1].innerHTML).toBe('');
      expect(headerRow.cells[2].innerHTML).toBe('');

      // Data rows
      const row2: HTMLTableRowElement = tableRows[2];

      expect(row2.cells[0].innerHTML).toBe('2');
      expect(row2.cells[1].innerHTML).toBe('Name 2');
      expect(row2.cells[2].innerHTML).toBe('E-mail 2');
    });
  }));
});
