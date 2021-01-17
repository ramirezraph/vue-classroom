import { Unit } from './Unit'
import { Post } from '@/model/Post'

export class Class {
    public units?: Unit[] = []
    public discussions?: Post[] = []

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
