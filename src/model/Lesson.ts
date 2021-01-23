
enum FileType {
  PDF,
  Document,
  PowerPoint,
  Video,
  Text
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
