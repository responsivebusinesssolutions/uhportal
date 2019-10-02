import { ActivatedRoute, Router, Routes } from '@angular/router';
import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

import { BreadcrumbComponent } from './breadcrumb.component';

describe('BreadcrumbComponent', () => {
  const testRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: BreadcrumbComponent }
  ];
  let fixture: ComponentFixture<BreadcrumbComponent>;
  let location: Location;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(testRoutes)],
      declarations: [BreadcrumbComponent],
      providers: [{ provide: ActivatedRoute, useValue: { snapshot: { data: { title: 'Breadcrumb test' } } } }, Location]
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(BreadcrumbComponent);

    router.initialNavigation();

    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(fixture.componentInstance).toBeDefined();
  });

  it('should navigate to "/home"', fakeAsync(() => {
    router.navigate(['']);

    tick();

    expect(fixture.componentInstance.title).toEqual('Breadcrumb test');
    expect(location.path()).toBe('/home');
  }));
});
