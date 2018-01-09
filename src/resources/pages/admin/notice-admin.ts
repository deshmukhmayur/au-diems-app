import { autoinject } from 'aurelia-framework';

@autoinject
export class NoticeAdmin {
  public notice_admins: any[] = [
    {
      name: 'Mno',
      email: 'mno@test.com',
      department: 'CSE'
    }
  ];

  public save(index: number) {

    console.log(this.notice_admins[index]);
  }
}
