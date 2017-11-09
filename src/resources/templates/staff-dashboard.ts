import { inject, useView } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';
import { MdToastService } from 'aurelia-materialize-bridge/toast/toastService';

import { App } from '../../app';

@useView('./dashboard.html')
@inject(MdToastService, Router)
export class Dashboard {
  public app: App;
  public router: Router;

  constructor(
    private toast: MdToastService,
    public mainRouter: Router
  ) { }

  public configureRouter(config: RouterConfiguration, chrouter: Router) {
    // config.addAuthorizeStep(AuthorizationStep);
    config.map([
      {
        route: '', redirect: 'home'
      },
      {
        route: 'home', name: 'home', title: 'Home',
        moduleId: 'resources/pages/staff/staff-home',
        settings: { icon: 'home', fab: true }, nav: true
      },
      {
        route: 'class', name: 'class', title: 'My Class',
        moduleId: 'resources/pages/staff/my-class',
        settings: { icon: 'people', fab: true }, nav: true
      },
      {
        route: 'mentees', name: 'mentees', title: 'My Mentees',
        moduleId: 'resources/pages/staff/my-mentees',
        settings: { icon: 'people_outline' }, nav: true
      },
      {
        route: 'subjects', name: 'subjects', title: 'My Subjects',
        moduleId: 'resources/pages/staff/my-subjects',
        settings: { icon: 'book' }, nav: true
      },
      {
        route: 'add-marks', name: 'add-marks', title: 'Add Class Test Marks',
        moduleId: 'resources/pages/staff/add-marks',
        settings: { icons: 'insert_chart', isChild: true }, nav: false
      }
    ]);
    config.fallbackRoute('home');
    this.router = chrouter;
  }

  get username() {
    return App.user.getUsername;
  }

  public showToast(e) {
    this.toast.show(`You clicked ${e.target.innerText}`, 4000);
  }

  public signOut() {
    localStorage.clear();
    App.user = null;
    this.toast.show('You have been logged out successfully.', 4000, 'blue');
    this.router.navigate('/');
  }

  public attached() {
    this.toast.show('Welcome ' + App.user.getUsername, 1000, 'blue');
  }
}
