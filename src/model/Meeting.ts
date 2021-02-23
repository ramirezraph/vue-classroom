import firebase from 'firebase'
import Timestamp = firebase.firestore.Timestamp;

export class Meeting {
  public unitId = ''
  public lessonId = ''
  public isClosed = false

  // eslint-disable-next-line no-useless-constructor
  constructor (
    public id: string,
    public teacherId: string,
    public classId: string,
    public title: string,
    public description: string,
    public date: Timestamp,
    public timeEnd: string,
    public timeStart: string,
    public link: string,
    public dateCreated: Timestamp,
  ) { }
}
