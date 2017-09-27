import { Router, RouterConfiguration } from 'aurelia-router';

export class ChildRouter {
  public heading = 'Child Router';
  public router: Router;

  public configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      {
        route: ['', 'welcome'], name: 'welcome',
        moduleId: 'resources/pages/welcome', nav: true, title: 'Welcome'
      },
      {
        route: 'users', name: 'users',
        moduleId: 'resources/pages/users', nav: true, title: 'Github Users'
      },
      {
        route: 'child-router', name: 'child-router',
        moduleId: 'resources/pages/child-router', nav: true, title: 'Child Router'
      }
    ]);

    this.router = router;
  }
}
