import { Comment } from '@/model/Post'

export class ClassFile {
  public comments: Comment[] = []

  // eslint-disable-next-line no-useless-constructor
  constructor (
    public id: string,
    public type: string,
    public name: string,
    public link: string,
  ) {
  }
}

export class Lesson {
  public files?: ClassFile[] = []

  // eslint-disable-next-line no-useless-constructor
  constructor (
    public id: string,
    public lessonNumber: number,
    public title: string,
    public shortDescription: string,
    public isLive = false,
 ) {}
}
