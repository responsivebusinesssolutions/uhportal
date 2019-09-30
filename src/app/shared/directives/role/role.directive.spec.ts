import { By } from '@angular/platform-browser';
import { Component, DebugNode } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../material/material.module';

import { AuthService } from 'src/app/auth/auth.service';
import { NotificationService } from '../../notification/notification.service';

import { RoleDirective } from './role.directive';

import { Role } from './enums/role.enum';
import { User } from 'src/app/auth/interfaces/user.interface';

@Component({
  selector: 'app-role-component'
})
class RoleComponent {
  roles = Role;
}

describe('RoleDirective', () => {
  let component: RoleComponent;
  let fixture: ComponentFixture<RoleComponent>;
  let directiveElement: DebugNode;

  // That's how you test a structural directive...
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MaterialModule],
      declarations: [RoleComponent, RoleDirective],
      providers: [AuthService, NotificationService]
    }).compileComponents();

    TestBed.overrideComponent(RoleComponent, {
      set: {
        template: '<div *appRole=[roles.INTERNAL]><p>Internal element</p></div>'
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleComponent);
    component = fixture.componentInstance;
    directiveElement = fixture.debugElement.queryAllNodes(By.directive(RoleDirective))[0];
  });

  afterEach(() => {
    localStorage.removeItem('currentUser');
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should have RoleDirective on component', () => {
    expect(directiveElement).toBeTruthy();
  });

  it('should hide RoleComponent with HR_CONSULTANT role', () => {
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

  it('should show RoleComponent with INTERNAL role', () => {
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

  it('should show RoleComponent with both roles', () => {
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
