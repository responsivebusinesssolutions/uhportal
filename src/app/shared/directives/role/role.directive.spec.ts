import { By } from '@angular/platform-browser';
import { Component, DebugNode } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from '../../material/material.module';

import { AuthService } from 'app/auth/auth.service';
import { NotificationService } from '../../notification/notification.service';

import { RoleDirective } from './role.directive';

import { Role } from './enums/role.enum';
import { User } from 'app/auth/interfaces/user.interface';

@Component({})
class RoleTestComponent {
  roles = Role;
}

describe('RoleDirective', () => {
  let component: RoleTestComponent;
  let fixture: ComponentFixture<RoleTestComponent>;
  let directiveElement: DebugNode;

  // That's how you test a structural directive...
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MaterialModule],
      declarations: [RoleTestComponent, RoleDirective],
      providers: [AuthService, NotificationService]
    }).compileComponents();

    TestBed.overrideComponent(RoleTestComponent, {
      set: {
        template: '<div *appRole=[roles.INTERNAL]><p>Internal element</p></div>'
      }
    });

    fixture = TestBed.createComponent(RoleTestComponent);
    component = fixture.componentInstance;
    directiveElement = fixture.debugElement.queryAllNodes(By.directive(RoleDirective))[0];
  }));

  afterEach(() => {
    localStorage.removeItem('currentUser');
  });

  it('should be created', () => {
    expect(component).toBeDefined();
  });

  it('should have RoleDirective on component', () => {
    expect(directiveElement).toBeTruthy();
  });

  it('should hide RoleTestComponent with HR_CONSULTANT role', () => {
    const user: User = {
      firstName: 'First name',
      id: 1,
      lastName: 'Last name',
      roles: [Role.HR_CONSULTANT],
      token: 'token',
      username: 'directive test user'
    };

    localStorage.setItem('currentUser', JSON.stringify(user));
    fixture.detectChanges();

    expect((fixture.debugElement.nativeElement as HTMLParagraphElement).querySelector('p')).toBeFalsy();
  });

  it('should show RoleTestComponent with INTERNAL role', () => {
    const user: User = {
      firstName: 'First name',
      id: 1,
      lastName: 'Last name',
      roles: [Role.INTERNAL],
      token: 'token',
      username: 'directive test user'
    };

    localStorage.setItem('currentUser', JSON.stringify(user));
    fixture.detectChanges();

    expect((fixture.debugElement.nativeElement as HTMLParagraphElement).querySelector('p')).toBeTruthy();
  });

  it('should show RoleTestComponent with both roles', () => {
    const user: User = {
      firstName: 'First name',
      id: 1,
      lastName: 'Last name',
      roles: [Role.HR_CONSULTANT, Role.INTERNAL],
      token: 'token',
      username: 'directive test user'
    };

    localStorage.setItem('currentUser', JSON.stringify(user));
    fixture.detectChanges();

    expect((fixture.debugElement.nativeElement as HTMLParagraphElement).querySelector('p')).toBeTruthy();
  });
});
