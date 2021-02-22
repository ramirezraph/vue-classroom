import firebase from 'firebase'
import Timestamp = firebase.firestore.Timestamp;

export class Comment {
  userName = ''
  userProfile = ''

  // eslint-disable-next-line no-useless-constructor
  constructor (
    public id: string,
    public userId: string,
    public time: Timestamp,
    public message: string,
  ) { }
}

export class Post {
  comments?: Comment[] = []
  numberOfComments = 0
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
