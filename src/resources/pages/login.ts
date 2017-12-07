import { inject } from 'aurelia-framework';
import { NewInstance } from 'aurelia-dependency-injection';
import { Router } from 'aurelia-router';
import { HttpClient } from 'aurelia-fetch-client';
import 'fetch';
import { ValidationController, ValidationRules } from 'aurelia-validation';
import { MaterializeFormValidationRenderer } from 'aurelia-materialize-bridge';
import { MdToastService } from 'aurelia-materialize-bridge/toast/toastService';

import { App } from '../../app';
import { User } from '../../resources/models/user';

@inject(Router, HttpClient, NewInstance.of(ValidationController), MdToastService)
export class Login {
  public userType: String;
  public userName: String;
  public password: String;

  public showPassword: Boolean = false;
  private processing: Boolean;

  get getPassStatus() {
    return (this.showPassword) ? 'text' : 'password';
  }
  private rules = ValidationRules
    .ensure('userName')
    .required()
    .email()
    .ensure('password')
    .required()
    .ensure('userType')
    .required()
    .rules;

  constructor(
    private router: Router,
    private http: HttpClient,
    private controller: ValidationController,
    private toast: MdToastService) {
    this.controller.addRenderer(new MaterializeFormValidationRenderer());

    let isLoggedIn = App.user ? true : false;

    if (isLoggedIn) {
      router.navigateToRoute(App.user.getType.toString());
    }

    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl(App.apiServer);
    });
  }

  public submit() {
    this.controller.validate().then(v => {
      if (v.valid) {
        this.processing = true;
        this.http.fetch('api/login', {
          method: 'POST',
          body: JSON.stringify({
            username: this.userName,
            password: this.password,
            u_type: this.userType
          })
        }).then(res => res.json())
          .then(data => {
            // console.log(data);
            if (data.status >= 200 && data.status < 300) {
              App.user = new User(
                data.username,
                data.access_token,
                this.userType
              );
              // console.log(App.user);
              App.refreshUserData(App.user);
              // this.toast.show('Login Successfull', 3000, 'green');
              this.router.navigateToRoute(App.user.getType.toString());
            } else {
              this.toast.show(data.error, 3000, 'red');
              this.processing = false;
            }
          })
          .catch(err => {
            console.log(err);
            this.toast.show('Network error. Please try again later.', 3000, 'red');
            this.processing = false;
          });
      }
    });
  }

  get isProcessing() {
    return this.processing;
  }
}
