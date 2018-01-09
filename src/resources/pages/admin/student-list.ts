import { autoinject } from "aurelia-framework";

@autoinject
export class StudentList {
  public students: any[] = [
    {
      name: 'Xyz',
      roll_no: '12345',
      email: 'xyz@gmail.com',
      dob: '1996-04-20',
      contact: '9876543210',
      prn_no: '123456789',
      branch: 'CSE',
      'class': 'BE',
      division: '1',
      mentor_batch: 'B1'
    }
  ];
}
