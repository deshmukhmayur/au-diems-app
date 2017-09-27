import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import 'fetch';
import { MdToastService } from 'aurelia-materialize-bridge/toast/toastService';
import { App } from '../../app';

@autoinject
export class MyMentees {
  public mentees: any[];

  constructor(
    private toast: MdToastService,
    private http: HttpClient
  ) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('http://localhost:8880/');
    });
  }

  private attached() {
    this.http.fetch(`api/staff/mentees?access_token=${App.user.getToken}`)
        .then(res => res.json())
        .then(data => {
          // console.log(data);
          this.mentees = data.students;
        })
        .catch(err => {
          console.log(err);
          this.toast.show('Network Error. Could not load the list of mentees.', 4000, 'red');
        });
  }
}