import { autoinject } from "aurelia-framework";

@autoinject
export class StaffList {
  public staffs: any[] = [{
    name: 'Abc',
    email: 'abc@dietms.org',
    contact: '9876543210',
    department: 'CSE',
    mentee_batch: 'B1',
    'class': 'BE',
    division: '1',
    subjects: [
      'MOC',
      'SC',
      'CSSL'
    ]
  }];

}
