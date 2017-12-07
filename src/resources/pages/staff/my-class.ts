import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import 'fetch';
import { MdToastService } from 'aurelia-materialize-bridge/toast/toastService';
import { App } from '../../../app';

@autoinject
export class MyClass {
  public students: any[];

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
    this.http.fetch(`api/staff/class?access_token=${App.user.getToken}`)
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        this.students = data.students;
      })
      .catch(err => {
        this.toast.show('Network Error. Could not load the list of students.', 4000, 'red');
        console.log(err);
      });
  }
}
