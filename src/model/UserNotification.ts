import firebase from 'firebase'
import Timestamp = firebase.firestore.Timestamp;

export enum NotificationType {
  ClassInvite = 'ClassInvite',
  ClassInviteResult = 'ClassInviteResult',
  Assignment = 'Assignment',
  Regular = 'Regular',
  Post = 'Post',
  Comment = 'Comment',
}

export class UserNotification {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    public id: string,
    public userId: string,
    public type: NotificationType,
    public date: Timestamp,
    public read: boolean,
  ) {}
}

export class RegularNotification extends UserNotification {
  constructor (
    public id: string,
    public userId: string,
    public type: NotificationType,
    public date: Timestamp,
    public read: boolean,
    public content: string,
  ) {
    super(id, userId, type, date, read)
  }
}

export class PostNotification extends UserNotification {
  constructor (
    public id: string,
    public userId: string,
    public type: NotificationType,
    public date: Timestamp,
    public read: boolean,
    public classId: string,
    public postId: string,
  ) {
    super(id, userId, type, date, read)
  }
}

export class CommentNotification extends UserNotification {
  constructor (
    public id: string,
    public userId: string, // last commenter id
    public type: NotificationType,
    public date: Timestamp,
    public read: boolean,
    public classId: string,
    public postId: string,
    public numberOfOtherUser: number,
  ) {
    super(id, userId, type, date, read)
  }
}

export class AssignmentNotification extends UserNotification {
  constructor (
    public id: string,
    public userId: string,
    public type: NotificationType,
    public date: Timestamp,
    public read: boolean,
    public classId: string,
    public due: Timestamp,
  ) {
    super(id, userId, type, date, read)
  }
}

export class ClassInviteNotification extends UserNotification {
  constructor (
    public id: string,
    public userId: string,
    public type: NotificationType,
    public date: Timestamp,
    public read: boolean,
    public classId: string,
    public result: string,
  ) {
    super(id, userId, type, date, read)
  }
}

export class ClassInviteResultNotification extends UserNotification {
  constructor (
    public id: string,
    public userId: string,
    public type: NotificationType,
    public date: Timestamp,
    public read: boolean,
    public classId: string,
  ) {
    super(id, userId, type, date, read)
  }
}
