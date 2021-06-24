import firebase from 'firebase'
import Timestamp = firebase.firestore.Timestamp;

export enum NotificationType {
  ClassInvite,
  ClassInviteResult,
  Assignment,
  Regular,
}

export class Notification {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    public id: string,
    public userId: string,
    public userName: string,
    public type: NotificationType,
    public date: Timestamp,
    public read: boolean,
  ) {}
}

export class RegularNotification extends Notification {
  constructor (
    public id: string,
    public userId: string,
    public userName: string,
    public type: NotificationType,
    public date: Timestamp,
    public read: boolean,
    public content: string,
  ) {
    super(id, userId, userName, type, date, read)
  }
}

export class AssignmentNotification extends Notification {
  constructor (
    public id: string,
    public userId: string,
    public userName: string,
    public type: NotificationType,
    public date: Timestamp,
    public read: boolean,
    public classId: string,
    public classTitle: string,
    public classCode: string,
    public due: Timestamp,
  ) {
    super(id, userId, userName, type, date, read)
  }
}

export class ClassInviteNotification extends Notification {
  constructor (
    public id: string,
    public userId: string,
    public userName: string,
    public type: NotificationType,
    public date: Timestamp,
    public read: boolean,
    public classId: string,
    public classCode: string,
    public classTitle: string,
  ) {
    super(id, userId, userName, type, date, read)
  }
}

export class ClassInviteResultNotification extends Notification {
  constructor (
    public id: string,
    public userId: string,
    public userName: string,
    public type: NotificationType,
    public date: Timestamp,
    public read: boolean,
    public classId: string,
    public classCode: string,
    public classTitle: string,
  ) {
    super(id, userId, userName, type, date, read)
  }
}
