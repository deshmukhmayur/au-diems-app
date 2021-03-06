import { Router, RouterConfiguration, Redirect } from 'aurelia-router';
import { environment } from './environment';
import { User } from './resources/models/user';

export class App {
  public static user: User;
  public static apiServer: string = environment.api_url;
  public static refreshUserData(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

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
        nav: false
      },
      {
        route: '404', name: 'not-found', title: 'Page not found',
        moduleId: 'resources/pages/not-found',
        nav: false
      }
    ]);
    config.mapUnknownRoutes('resources/pages/not-found');
    config.fallbackRoute('not-found');
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
      .some(i => i.config.settings && i.config.settings.roles &&
        (i.config.settings.roles.indexOf('admin') !== -1 ||
          i.config.settings.roles.indexOf('staff') !== -1))
    ) {
      let isLoggedIn = App.user ? true : false;
      if (!isLoggedIn) {
        return next.cancel(new Redirect('login'));
      }
    }

    return next();
  }
}
