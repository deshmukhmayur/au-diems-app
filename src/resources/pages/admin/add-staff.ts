import { autoinject } from 'aurelia-framework';

export class AddStaff {
  public staff: any = {
    isClassTeacher: false,
    isMentor: false,
    subjects: [
      { name: '', 'class': '', division: ''},
      { name: '', 'class': '', division: ''},
      { name: '', 'class': '', division: ''}
    ]
  }
}
