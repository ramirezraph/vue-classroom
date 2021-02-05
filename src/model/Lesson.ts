
export enum FileType {
  Image = 'image/*',
  Video= 'video/*',
  OtherFile= '.pdf,.doc,.docx,.ptx,.pptx'
}

interface File {
  type: FileType;
  name: string;
  link: string;
}

export class Lesson {
  files?: File[] = []

  // eslint-disable-next-line no-useless-constructor
  constructor (
    public id: string,
    public lessonNumber: number,
    public title: string,
    public shortDescription: string,
    public isLive = false,
 ) {}
}
