
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

  get fullName (): string {
    return `${this.firstName} ${this.middleInitial} ${this.lastName}`
  }

  get middleInitial (): string {
    const midName: string[] = this.middleName.split(' ')
    let middleInitial = ''
    for (let i = 0; i < midName.length; i++) {
      middleInitial += midName[i].substring(0, 1) + '.'
    }

    return middleInitial
  }
}
