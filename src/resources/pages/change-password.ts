import { inject, NewInstance } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { HttpClient } from 'aurelia-fetch-client';
import 'fetch';
import { ValidationController, ValidationRules } from 'aurelia-validation';
import { MaterializeFormValidationRenderer } from 'aurelia-materialize-bridge';
import { MdToastService } from 'aurelia-materialize-bridge/toast/toastService';

import { App } from '../../app';

@inject(Router, HttpClient, MdToastService, NewInstance.of(ValidationController))
export class ChangePassword {
  public currPass: String;
  public newPass: String;
  public newPass2: String;
  public isProcessing: Boolean = false;

  public rules = ValidationRules
    .ensure('currPass')
      .required()
        .withMessage('Please enter the current password')
    .ensure('newPass')
      .required()
        .withMessage('Please enter a new password')
    .ensure('newPass2')
      .required()
        .withMessage('Please re-enter the new password')
      .satisfies(val => val === this.newPass)
        .withMessage('The passwords do not match')
    .rules;

  constructor(
    private router: Router,
    private http: HttpClient,
    private toast: MdToastService,
    private controller: ValidationController
  ) {
    this.controller.addRenderer(new MaterializeFormValidationRenderer());

    this.http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl(App.apiServer);
    });
  }

  public submit() {
    this.controller.validate().then(v => {
      if (v.valid) {
        this.isProcessing = true;
        this.http.fetch(`api/changepass?access_token=${App.user.getToken}`, {
          method: 'PUT',
          body: JSON.stringify({
            old_pass: this.currPass,
            new_pass: this.newPass
          })
        }).then(res => res.json())
        .then(data => {
          if (data.status >= 200 && data.status < 300) {
            App.user.setToken = data.access_token;
            App.refreshUserData(App.user);
            this.toast.show('Password Changed Successfully', 3000, 'green');
            this.isProcessing = false;
          } else if (data.status === 304) {
            this.toast.show(data.message, 3000, 'blue');
            this.isProcessing = false;
          } else {
            this.toast.show(data.error, 3000, 'red');
            this.isProcessing = false;
          }
        }).catch(err => {
          console.log(err);
          this.toast('Network Error. Please try again later.', 3000, 'red');
          this.isProcessing = false;
        });
      }
    });
  }

  private get currentUser() {
    return App.user.getType;
  }
}
