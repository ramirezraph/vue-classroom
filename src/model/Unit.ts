import { Lesson } from './Lesson'

export class Unit {
  public lessons?: Lesson[] = []

  // eslint-disable-next-line no-useless-constructor
  constructor (
    public id: string,
    public unitNumber: number,
    public title: string,
    public shortDescription: string,
    public isLive: boolean,
  ) {}
}
