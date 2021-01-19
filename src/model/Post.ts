interface Comment {
  name: string;
  time: string;
  message: string;
}
export class Post {
   comments?: Comment[] = []
  // eslint-disable-next-line no-useless-constructor
  constructor (
    public id: string,
    public userId: string,
    public userName: string,
    public time: string,
    public message: string,
  ) {}
}
