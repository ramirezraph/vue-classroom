import firebase from 'firebase'
import Timestamp = firebase.firestore.Timestamp;

export class Meeting {
  public unitId = ''
  public lessonId = ''
  public isClosed = false

  // eslint-disable-next-line no-useless-constructor
  constructor (
    public teacherId: string,
    public classId: string,
    public title: string,
    public description: string,
    public date: Timestamp,
    public timeEnd: Timestamp,
    public timeStart: Timestamp,
    public link: string,
  ) { }
}
