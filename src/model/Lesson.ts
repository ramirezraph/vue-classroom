
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
  isLive ?= false;
  // eslint-disable-next-line no-useless-constructor
  constructor (
   public title: string,
   public shortDescription: string,
 ) {}
}
