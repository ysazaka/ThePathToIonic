import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Chapter } from '../interfaces/chapter';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {
  private chapterCollection: AngularFirestoreCollection<Chapter>;

  constructor(private afs: AngularFirestore) {
    this.chapterCollection = this.afs.collection<Chapter>('chapters')
  }

  getChapters() {
    return this.chapterCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  addChapter(chapter: Chapter) {
    return this.chapterCollection.add(chapter);
  }

  getChapter(id: string) {
    return this.chapterCollection.doc<Chapter>(id).valueChanges();
  }

  updateChapter(id: string, chapter: Chapter) {
    return this.chapterCollection.doc<Chapter>(id).update(chapter);
  }

  deleteChapter(id: string) {
    return this.chapterCollection.doc(id).delete();
  }
}
