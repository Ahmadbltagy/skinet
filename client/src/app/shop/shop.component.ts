import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { IProduct } from '../shared/models/product';
import { IProductBrand } from '../shared/models/productBrand';
import { IProductType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit, OnDestroy {
  products: IProduct[] = [];
  brands: IProductBrand[] = [];
  types: IProductType[] = [];
  totalCount: number = 0;
  shopParams = new ShopParams();

  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to high', value: 'priceAsc' },
    { name: 'Price: High to low', value: 'priceDesc' },
  ];

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe({
      next: (response) => {
        (this.products = response.data),
          (this.shopParams.pageNumber = response.pageIndex),
          (this.shopParams.pageSize = response.pageSize),
          (this.totalCount = response.count);
      },
      error: (err) => console.log(err),
    });
  }
  getBrands() {
    this.shopService.getBrands().subscribe({
      next: (response) => (this.brands = [{ id: 0, name: 'All' }, ...response]),
      error: (err) => console.log(err),
    });
  }
  getTypes() {
    this.shopService.getTypes().subscribe({
      next: (response) => (this.types = [{ id: 0, name: 'All' }, ...response]),
      error: (err) => console.log(err),
    });
  }

  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;

    this.getProducts();
  }
  onSortSelected(sort: string) {
    this.shopParams.sort = sort;

    this.getProducts();
  }
  onPageChange(pageIndex) {
    this.shopParams.pageNumber = pageIndex;
    this.getProducts();
  }
  onSearch(search) {
    this.shopParams.search = search;
    this.shopParams.pageNumber = 1;

    this.getProducts();
  }
  onReset() {
    this.shopParams = new ShopParams();
    this.getProducts();
  }
  ngOnDestroy(): void {}
}
