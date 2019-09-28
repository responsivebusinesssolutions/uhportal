import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { appRoutes } from '../../app-routing.module';
import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';

import { MainLayoutComponent } from 'src/app/layout/main-layout/main-layout.component';
import { RoleDirective } from './role.directive';
import { ToolbarComponent } from 'src/app/layout/toolbar/toolbar.component';

describe('NumberInputDirective', () => {
  let fixture: ComponentFixture<NumberInputComponent>;
  let inputWithDirective: Array<DebugElement>;
  let inputWithoutDirective: Array<DebugElement>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, MaterialModule, RouterModule.forRoot(appRoutes)],
      declarations: [MainLayoutComponent, NumberInputComponent, NumberInputDirective, ToolbarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [NumberInputDirective]
    }).createComponent(NumberInputComponent);

    fixture.detectChanges();

    inputWithDirective = fixture.debugElement.queryAll(By.directive(NumberInputDirective));
    inputWithoutDirective = fixture.debugElement.queryAll(By.css('input:not([appNumberInput])'));
  });

  it('should have one input element with directive', () => {
    expect(inputWithDirective.length).toBe(1);
  });

  it('should have two input elements without directive', () => {
    expect(inputWithoutDirective.length).toBe(2);
  });
});
