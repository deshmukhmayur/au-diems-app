// import {computedFrom} from 'aurelia-framework';
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { App } from '../../app';

@inject(Router)
export class Welcome {
  public heading = '';
  public firstName = 'John';
  public lastName = 'Doe';
  private previousValue = this.fullName;

  constructor(public router: Router) {}

  // Getters can't be directly observed, so they must be dirty checked.
  // However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
  // To optimize by declaring the properties that this getter is computed from, uncomment the line below
  // as well as the corresponding import above.
  // @computedFrom('firstName', 'lastName')
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  public submit() {
    this.previousValue = this.fullName;
    alert(`Welcome, ${this.fullName}!`);
  }

  public canDeactivate() {
    if (this.fullName !== this.previousValue) {
      return confirm('Are you sure you want to leave?');
    }
  }
}
