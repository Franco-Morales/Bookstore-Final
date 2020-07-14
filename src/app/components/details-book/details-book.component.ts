import { Component, OnInit } from '@angular/core';
import { DataApiService } from "../../services/data-api.service";
import { BookInterface } from "../../models/book";
import { ActivatedRoute, Params } from "@angular/router";


@Component({
  selector: 'app-details-book',
  templateUrl: './details-book.component.html',
  styleUrls: ['./details-book.component.css']
})
export class DetailsBookComponent implements OnInit {

  public book: BookInterface = {};

  constructor(private dataApi: DataApiService, private route:ActivatedRoute) { }

  ngOnInit() {
    const idBook = this.route.snapshot.params['id'];
    this.getDetails(idBook);
    
  }

  getDetails(idBook: string):void {
    this.dataApi.getOneBook(idBook).subscribe( book => {
      console.log('Book : ',book);
      this.book = book;
    });
  }

}
