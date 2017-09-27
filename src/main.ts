import {Aurelia} from 'aurelia-framework';
import 'jquery';
import 'materialize';

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-materialize-bridge', bridge => {
      bridge.useAll();
    })
    .plugin('aurelia-validation');

  // Uncomment the line below to enable animation.
  // aurelia.use.plugin('aurelia-animator-css');

  aurelia.start().then(() => aurelia.setRoot());
}
