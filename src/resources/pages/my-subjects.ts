import { autoinject, observable } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import 'fetch';
import { MdToastService } from 'aurelia-materialize-bridge/toast/toastService';
import { App } from '../../app';

@autoinject
export class MySubjects {
  @observable public selectedSubId: Number = -1;
  public subjects: any[];
  public students: any[];

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

  public attached() {
    this.http.fetch(`api/staff/subjects?access_token=${App.user.getToken}`)
      .then(res => res.json())
      .then(data => {
        if (data.status >= 200 && data.status < 300) {
          this.subjects = data.subjects;
        } else {
          this.toast.show('There was a problem loading the subjects.', 4000, 'red');
        }
      })
      .catch(err => {
        console.log(err);
        this.toast.show('Network Error. Could not load the subjects.', 4000, 'red');
      });
  }

  public selectSub(subId) {
    this.selectedSubId = subId;
  }

  public selectedSubIdChanged(newVal, oldVal) {
    if (newVal !== -1) {
      this.http.fetch(`api/staff/subjects/${this.selectedSubId}?access_token=${App.user.getToken}`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.students = data.students;
        })
        .catch(err => {
          console.log(err);
          this.toast.show('Network error.', 4000, 'red');
        });
    }
  }
}
