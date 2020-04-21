import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from "@angular/fire/firestore";
import { BookInterface } from "../models/book";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  private bookCollection: AngularFirestoreCollection<BookInterface>;
  private books: Observable<BookInterface[]>;
  private bookDoc: AngularFirestoreDocument<BookInterface>;
  private book: Observable<BookInterface>;

  constructor(private afs: AngularFirestore) { 
    this.bookCollection = afs.collection<BookInterface>('books');
    this.books = this.bookCollection.valueChanges();
  }


  getAllBooks(){
    return this.books = this.bookCollection.snapshotChanges()
    .pipe(map( changes => {
      return changes.map( action => {
        const data = action.payload.doc.data() as BookInterface;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }

  getOneBook(idBook: string){
    this.bookDoc = this.afs.doc<BookInterface>(`books/${idBook}`);
    return this.book = this.bookDoc.snapshotChanges().pipe( map( action => {
      if(action.payload.exists == false){
        return null;
      } else{
        const data = action.payload.data() as BookInterface;
        data.id = action.payload.id;
        return data;
      }
    }));
  }

  addBook(){

  }

  updateBook(){

  }

  deleteBook(){

  }
}
