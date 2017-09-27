import { autoinject, bindable } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import 'fetch';
import { MdToastService } from 'aurelia-materialize-bridge/toast/toastService';
import { App } from '.././../app';

@autoinject
export class ResultsTable {
  @bindable public studid: Number;
  @bindable public visible: Boolean = false;
  @bindable public belowAvgSubjects: Number;
  public isLoading = true;
  public marks: any[];

  constructor(
    private http: HttpClient,
    private toast: MdToastService
  ) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('http://localhost:8880/');
    });
  }

  public visibleChanged(newVal, oldVal) {
    if (newVal !== oldVal && newVal && !this.marks) {
      this.fetchStudentDetail();
    }
  }

  private fetchStudentDetail() {
    this.http.fetch(`api/students/${this.studid}?access_token=${App.user.getToken}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.marks = data.marks;
        this.isLoading = false;
      })
      .catch(err => {
        console.log(err);
      });
  }
}
