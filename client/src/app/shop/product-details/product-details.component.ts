import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../shop.service';
import { IPagination } from 'src/app/shared/models/pagination';
import { IProduct } from 'src/app/shared/models/product';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  id: string;
  product: IProduct;
  constructor(route: ActivatedRoute, private shopService: ShopService) {
    this.id = route.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.loadProduct();
  }
  loadProduct() {
    this.shopService.getProduct(this.id).subscribe({
      next: (response) => {
        this.product = response;
        console.log(this.product);
      },
      error: (err) => console.log(err),
    });
  }
}
