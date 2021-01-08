import { Lesson } from './Lesson'

export class Unit {
   lessons?: Lesson[] = []

  // eslint-disable-next-line no-useless-constructor
  constructor (
    public unitNumber: number,
    public title: string,
    public shortDescription: string,
    public isLive: boolean,
  ) {}
}
