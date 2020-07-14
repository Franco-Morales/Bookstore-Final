import { Component, OnInit } from '@angular/core';
import { BookInterface } from "../../models/book";
import { DataApiService } from "../../services/data-api.service";


@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  description = "lorem ipsum dolor amet";

  public books: BookInterface[];

  constructor(private dataApi: DataApiService) { }

  ngOnInit() {
    this.getOffers();
  }

  
  getOffers() {
    this.dataApi.getAllBooksOffers().subscribe(offers => this.books = offers);
  }

  
}
