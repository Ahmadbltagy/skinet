import { Component, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';
import { IProduct } from './interfaces/IProduct';
import { IPagination } from './interfaces/IPagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Skinet';
  products?: IProduct[];
  prdsPaginate?: IPagination;
  constructor(private prdService: ProductsService) {}
  ngOnInit(): void {
    this.prdService.GetProducts().subscribe({
      next: (prds) => (this.products = prds),
      error: (err) => console.log(err),
    });
    this.prdService.PaginateProduct().subscribe({
      next: (data) => (this.prdsPaginate = data),

      error: (err) => console.log(err),
    });
  }
}
