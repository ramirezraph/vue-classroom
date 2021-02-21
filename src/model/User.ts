
export enum UserType {
  Owner = 'Owner',
  Teacher = 'Teacher',
  Student = 'Student',
}

export class User {
  public userType: UserType = UserType.Student

  // extras
  public phoneNumber = ''
  public school = ''
  public homeAddress = ''
  public studentNumber = ''
  public course = ''
  public section = ''

  // eslint-disable-next-line no-useless-constructor
  constructor (
    public id: string,
    public firstName: string,
    public middleName: string,
    public lastName: string,
    public birthdate: string,
    public email: string,
    public profile: string = '',
  ) {}
}
