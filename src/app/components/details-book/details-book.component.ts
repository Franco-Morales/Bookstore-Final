import { Component, OnInit } from '@angular/core';
import { DataApiService } from "../../services/data-api.service";
import { BookInterface } from "../../models/book";


@Component({
  selector: 'app-details-book',
  templateUrl: './details-book.component.html',
  styleUrls: ['./details-book.component.css']
})
export class DetailsBookComponent implements OnInit {

  public book: BookInterface;

  constructor(private dataApi: DataApiService) { }

  ngOnInit() {
    const idBook = "bjZXxW4TZ0l3htLQag4C";
    this.dataApi.getOneBook(idBook).subscribe( book=>{
      console.log('Book : ',book);
      this.book = book;
    });
  }

}
