import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DebugNode } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LoadingSpinnerComponent } from 'src/app/shared/components/loading/loading-spinner/loading-spinner.component';
import { MainLayoutComponent } from './main-layout.component';

class LoadingServiceMock {
  push(value: boolean): boolean {
    return value;
  }
}

describe('MainLayoutComponent', () => {
  let loadingService: LoadingServiceMock;
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainLayoutComponent],
      providers: [LoadingServiceMock]
    }).compileComponents();

    loadingService = TestBed.inject(LoadingServiceMock);

    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  xit('should show loading spinner', () => {
    loadingService.push(false);

    fixture.detectChanges();

    const loadingElement: Array<DebugNode> = fixture.debugElement.queryAllNodes(By.directive(LoadingSpinnerComponent));

    expect(loadingElement.length).toEqual(1);
  });

  xit('should hide loading spinner and show router-outlet', () => {
    loadingService.push(true);

    fixture.detectChanges();

    const loadingElement: Array<DebugNode> = fixture.debugElement.queryAllNodes(By.directive(LoadingSpinnerComponent));
    const routerOutletElement: Array<DebugNode> = fixture.debugElement.queryAllNodes(By.directive(RouterOutlet));

    expect(loadingElement.length).toEqual(0);
    expect(routerOutletElement.length).toEqual(1);
  });
});
