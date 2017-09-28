import { Router, RouterConfiguration, Redirect } from 'aurelia-router';

import { User } from './resources/models/user';

export class App {
  public static user: User; // = new User('test', 'asdkfjhasdf', 'staff');
  public router: Router;

  public configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;
    config.title = 'DIEMS App';
    // config.options.pushState = true;             // reloading problem when using jspm
    config.addAuthorizeStep(AuthorizeStep);
    config.map([
      {
        route: '', redirect: 'login'
      },
      {
        route: 'admin', name: 'admin',
        moduleId: 'resources/templates/admin-dashboard',
        settings: { roles: ['admin'] }, nav: false
      },
      {
        route: 'staff', name: 'staff',
        moduleId: 'resources/templates/staff-dashboard',
        settings: { roles: ['staff'] }, nav: false
      },
      {
        route: 'login', name: 'login', title: 'Sign In',
        moduleId: 'resources/pages/login',
        settings: { roles: ['none'] }, nav: false
      }
    ]);
  }
}

class AuthorizeStep {
  public run(navigationInstruction, next) {
    // TODO: Register a service worker

    if (!App.user && localStorage.getItem('user')) {
      let u = JSON.parse(localStorage.getItem('user'));
      App.user = new User(u.username, u.token, u.uType);
    }

    if (navigationInstruction.getAllInstructions()
      .some(i => i.config.settings.roles.indexOf('admin') !== -1 ||
        i.config.settings.roles.indexOf('staff') !== -1)) {
      let isLoggedIn = App.user ? true : false;
      if (!isLoggedIn) {
        return next.cancel(new Redirect('login'));
      // } else if (navigationInstruction.config.settings.roles.indexOf(App.user.getType) === -1) {
      //   return next.cancel(new Redirect(App.user.getType.toString()));
      }
    }

    return next();
  }
}
