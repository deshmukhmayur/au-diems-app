import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { MdToastService } from 'aurelia-materialize-bridge/toast/toastService';

import { App } from '../../../app';

@autoinject
export class Profile {
  public profileData: any;

  constructor(private http: HttpClient, private toast: MdToastService) {
    this.http.configure(config => {
      config.useStandardConfiguration()
      .withBaseUrl(App.apiServer);
    });
  }

  private attached() {
    this.http.fetch(`api/staff/self?access_token=${App.user.getToken}`)
      .then(res => res.json())
      .then(data => {
        if (data.status >= 200 && data.status < 300) {
          this.profileData = data;
        } else {
          this.toast.show('Error: ' + data.error, 3000, 'red');
        }
      })
      .catch(err => {
        console.log(err);
        this.toast.show('Network Error', 4000, 'red');
      });
  }
}
