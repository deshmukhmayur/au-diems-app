import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import 'fetch';
import { MdToastService } from 'aurelia-materialize-bridge/toast/toastService';

import { App } from '../../../app';

@autoinject
export class AdminHome {
  public stats: any;

  constructor(
    private http: HttpClient,
    private toast: MdToastService) {
    this.http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl(App.apiServer);
    });
  }

  public attached() {
    let url = new URLSearchParams();
    url.set('access_token', App.user.getToken.toString());
    this.http.fetch(`api/admin/home?${url.toString()}`)
        .then(res => res.json())
        .then(data => {
          if (data.status >= 200 && data.status < 300) {
            this.stats = data.data;
          } else {
            this.toast.show('Error: ' + data.error, 4000, 'red');
          }
        })
        .catch(err => {
          console.log(err);
          this.toast.show('Network Error. Try refreshing the page.', 4000, 'red');
        });
  }
}
