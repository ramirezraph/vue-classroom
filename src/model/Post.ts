import firebase from 'firebase'
import Timestamp = firebase.firestore.Timestamp;

interface Comment {
  id: string;
  userId: string;
  time: Timestamp;
  message: string;
}

export class Post {
  comments?: Comment[] = []
  userName = ''
  userProfile = ''
  // eslint-disable-next-line no-useless-constructor
  constructor (
    public id: string,
    public userId: string,
    public time: Timestamp,
    public message: string,
  ) {}
}
