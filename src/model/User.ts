
export enum UserType {
  Owner,
  Student
}

export class User {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    public id: string,
    public firstName: string,
    public middleName: string,
    public lastName: string,
    public email: string,
    public profile: string = '',
  ) {}
}
