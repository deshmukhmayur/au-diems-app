import { inject, NewInstance } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { ValidationController, ValidationRules } from 'aurelia-validation';
import { MaterializeFormValidationRenderer } from 'aurelia-materialize-bridge';
import { MdToastService } from 'aurelia-materialize-bridge/toast/toastService';

import { App } from '../../app';

@inject(HttpClient, MdToastService, NewInstance.of(ValidationController))
export class Feedback {
  public subject: String;
  public message: String;
  public isProcessing: Boolean = false;
  public isSubmitted: Boolean = false;

  public rules = ValidationRules
    .ensure('subject')
      .displayName('Subject')
      .required()
    .ensure('message')
      .displayName('Message')
      .required()
    .rules;

  constructor(
    private http: HttpClient,
    private toast: MdToastService,
    private controller: ValidationController
  ) {
    this.controller.addRenderer(new MaterializeFormValidationRenderer());

    this.http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl(App.apiServer)
        .withDefaults({
          headers: {
            'Content-Type': 'application/json'
          }
        });
    });
  }

  public submit() {
    this.controller.validate().then(v => {
      if (v.valid) {
        this.http.fetch(`api/feedback?access_token=${App.user.getToken}`, {
          method: 'POST',
          body: JSON.stringify({
            subject: this.subject,
            message: this.message
          })
        })
        .then(res => res.json())
        .then(data => {
          if (data.status >= 200 && data.status < 300) {
            this.isSubmitted = true;
            this.toast.show(data.message, 3000, 'green');
          } else {
            console.log(data.error);
            this.toast.show(data.error, 3000, 'red');
          }
        })
        .catch(err => {
          console.log(err);
          this.toast.show('Network Error. Please try again later.', 3000, 'red');
        });
      }
    });
  }

  public reload() {
    this.clearForm();
    this.isSubmitted = false;
  }

  private clearForm() {
    this.subject = '';
    this.message = '';
  }
}