import { Router, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

import { ErrorComponent } from './error.component';

import { I18nPipe } from '../i18n/i18n.pipe';

@Component({})
class HomeComponent {}

describe('BreadcrumbComponent', () => {
  const testRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'error', component: ErrorComponent },
    { path: '**', redirectTo: 'error' }
  ];
  let fixture: ComponentFixture<ErrorComponent>;
  let location: Location;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(testRoutes)],
      declarations: [ErrorComponent, I18nPipe],
      providers: [Location]
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(ErrorComponent);

    router.initialNavigation();

    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(fixture.componentInstance).toBeDefined();
  });

  it('should navigate to "/error"', fakeAsync(() => {
    router.navigate(['/some-unreal-path']);

    tick();

    expect(location.path()).toBe('/error');
  }));
});
