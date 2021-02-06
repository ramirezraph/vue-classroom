export class Class {
    // list of user id's
    public userList?: string[] = []

  // eslint-disable-next-line no-useless-constructor
  constructor (
    public id: string,
    public title: string,
    public description: string,
    public code: string,
    public teacherName: string,
    public imageSource: string,
    public color: string,
    public ownerId: string,
  ) {}
}
