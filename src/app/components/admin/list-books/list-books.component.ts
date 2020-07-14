import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../../services/data-api.service';
import { BookInterface } from '../../../models/book';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from 'src/app/models/user';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})

export class ListBooksComponent implements OnInit {

  public books: BookInterface[];

  public isAdmin: any = null;
  public userUid: string = null;


  constructor(private dataApi: DataApiService,private authService: AuthService) { }


  ngOnInit(): void {
    this.getCurrentUser();
    this.getListBooks();
  }


  getCurrentUser(){
    this.authService.isAuth().subscribe(auth => {
      if(auth){
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe( userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
        });
      }
    });
  }

  //Obtener Lista de libros
  getListBooks(){
    this.dataApi.getAllBooks().subscribe(books => {
      this.books = books;
    });
  }

  //Borrar libro
  onDeleteBook(idBook: string):void {
    const confirmacion = confirm('¿Estás seguro que quieres eliminar este registro?');
    if(confirmacion){
      this.dataApi.deleteBook(idBook);
    }
  }


  onPreUpdateBook(book: BookInterface){
    this.dataApi.selectedBook = Object.assign({},book);
  }

}
