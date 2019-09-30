import { MaterialModule } from './../../shared/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MainLayoutComponent } from './main-layout.component';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainLayoutComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MaterialModule,
        RouterTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
