interface Comment {
  name: string;
  time: string;
  message: string;
}
export class Post {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    public name: string,
    public time: string,
    public message: string,
    public comments: Comment[],
  ) {}
}
