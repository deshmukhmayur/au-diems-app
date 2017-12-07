import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import 'fetch';
import { MdToastService } from 'aurelia-materialize-bridge/toast/toastService';
import { App } from '../../../app';

@autoinject
export class StaffHome {
  public staff: any;

  constructor(
    private toast: MdToastService,
    private http: HttpClient
  ) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl(App.apiServer);
    });
  }

  private attached() {
    this.http.fetch(`api/staff?access_token=${App.user.getToken}`)
              .then(res => res.json())
              .then(data => {
                if (data.error) {
                  this.toast.show('Error: ' + JSON.stringify(data), 4000, 'red');
                } else {
                  this.staff = data;
                }
              })
              .catch(err => {
                console.log(err);
                this.toast.show('Network Error', 4000, 'red');
              });
  }
}
