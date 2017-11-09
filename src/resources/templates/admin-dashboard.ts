import { autoinject, useView } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';
import { MdToastService } from 'aurelia-materialize-bridge/toast/toastService';

import { App } from '../../app';

@useView('./dashboard.html')
@autoinject
export class Dashboard {
  public app: App;
  public router: Router;
  public username: String;

  constructor(
    private toast: MdToastService,
    public mainRouter: Router) { }

  public configureRouter(config: RouterConfiguration, chrouter: Router) {
    // config.addAuthorizeStep(AuthorizationStep);
    config.map([
      {
        route: ['', 'home'], name: 'home', title: 'Home',
        moduleId: 'resources/pages/admin/admin-home',
        settings: { icon: 'home' }, nav: true
      },
      {
        route: 'staff', name: 'staff-list', title: 'Staff',
        moduleId: 'resources/pages/admin/staff-list',
        settings: { icon: 'people' }, nav: true
      },
      {
        route: 'students', name: 'student-list', title: 'Students',
        moduleId: 'resources/pages/admin/student-list',
        settings: { icon: 'school' }, nav: true
      },
      {
        route: 'notice-admin', name: 'notice-admins', title: 'Notice Administrators',
        moduleId: 'resources/pages/admin/notice-admin',
        settings: { icon: 'supervisor_account' }, nav: true
      },
      {
        route: 'add-staff', name: 'add-staff', title: 'Add Staff',
        moduleId: 'resources/pages/admin/add-staff',
        settings: { icon: '', isChild: true}, nav: false
      },
      {
        route: 'add-student', name: 'add-student', title: 'Add Student',
        moduleId: 'resources/pages/admin/add-student',
        settings: { icon: '', isChild: true}, nav: false
      },
      {
        route: 'add-notice-admin', name: 'add-notice-admin', title: 'Add Notice Administrator',
        moduleId: 'resources/pages/admin/add-notice-admin',
        settings: { icon: '', isChild: true}, nav: false
      },
      {
        route: 'settings', name: 'settings', title: 'Settings',
        moduleId: 'resources/pages/admin/admin-settings',
        settings: { icon: 'settings' }, nav: false
      }
    ]);
    config.fallbackRoute('home');
    this.router = chrouter;
  }

  public showToast(e) {
    this.toast.show(`You clicked ${e.target.innerText}`, 4000);
  }

  public signOut() {
    localStorage.clear();
    App.user = null;
    this.toast.show('You have been logged out successfully.', 4000, 'blue');
    this.router.navigateToRoute('login');
  }

  public attached() {
    this.username = App.user.getUsername;
    this.toast.show('Welcome ' + this.username, 1000, 'blue');
    // console.log(this.router);
  }
}
