import { Unit } from './Unit'

export class Class {
    public units?: Unit[] = []

  // eslint-disable-next-line no-useless-constructor
  constructor (
    public id: string,
    public title: string,
    public description: string,
    public code: string,
    public teacherName: string,
    public imageSource: string,
    public color: string,
  ) {}
}
