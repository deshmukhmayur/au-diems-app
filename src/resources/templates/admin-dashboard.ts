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
        route: 'notice-admin', name: 'notice-admins', title: 'Notice Administrators',
        moduleId: 'resources/pages/admin/notice-admin',
        settings: { icon: 'people' }, nav: true
      },
      {
        route: 'Students', name: 'student-list', title: 'Students',
        moduleId: 'resources/pages/admin/student-list',
        settings: { icon: 'people' }, nav: true
      }
    ]);
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
  }
}
