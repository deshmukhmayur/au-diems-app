import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import 'fetch';
import { MdToastService } from 'aurelia-materialize-bridge/toast/toastService';
import { App } from '../../../app';

@autoinject
export class AddMarks {
  public file: any;
  public ctNo: Number = 1;
  public totalMarks: Number = 40;
  public passingMarks: Number = 24;

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

  get isUnsaved() {
    return this.file; // || this.ctNo || this.totalMarks || this.passingMarks;
  }

  public upload() {
    if (this.file) {
      // console.log('uploading...');

      let formData = new FormData();

      formData.append('file', this.file[0]);
      formData.append('ct_no', this.ctNo.toString());
      formData.append('passing_marks', this.passingMarks.toString());
      formData.append('total_marks', this.totalMarks.toString());
      // console.log(formData.getAll('file'));

      let url = new URLSearchParams();
      // url.set('ct_no', this.ctNo.toString());
      // url.set('passing_marks', this.passingMarks.toString());
      // url.set('total_marks', this.totalMarks.toString());
      url.set('access_token', App.user.getToken.toString());

      this.http.fetch(`api/staff/add-marks?${url.toString()}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      })
        .then(res => res.json())
        .then(data => {
          // console.log('data', data);
          this.toast.show(data.message, 4000, 'green');
          this.clearForm();
        })
        .catch(err => {
          console.log(err);
          this.toast.show('Network Error', 4000, 'red');
        });

    } else {
      // console.log('No file selected');
      this.toast.show('Please select a file', 4000, 'blue');
    }
  }

  public canDeactivate() {
    if (this.isUnsaved) {
      return confirm('Are you sure you want to leave?');
    }
  }

  private clearForm() {
    this.file = null;
    // this.ctNo = null;
    // this.passingMarks = null;
    // this.totalMarks = null;
  }
}
