
export enum FileType {
  Image = 'image/*',
  Video= 'video/*',
  OtherFile= '.pdf,.doc,.docx,.ptx,.pptx'
}

export class ClassFile {
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
  files?: ClassFile[] = []

  // eslint-disable-next-line no-useless-constructor
  constructor (
    public id: string,
    public lessonNumber: number,
    public title: string,
    public shortDescription: string,
    public isLive = false,
 ) {}
}
