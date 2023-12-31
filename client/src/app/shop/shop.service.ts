import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/models/pagination';
import { Observable, map } from 'rxjs';
import { IProductBrand } from '../shared/models/productBrand';
import { IProductType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'https://localhost:44353/api/';

  constructor(private http: HttpClient) {}

  getProducts(shopParams: ShopParams): Observable<IPagination> {
    let params = new HttpParams();
    if (shopParams.brandId) {
      params = params.append('brandId', shopParams.brandId.toString());
    }
    if (shopParams.typeId) {
      params = params.append('typeId', shopParams.typeId.toString());
    }

    if (shopParams.sort) {
      params = params.append('sort', shopParams.sort);
    }
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageIndex', shopParams.pageSize.toString());
    if (shopParams.search) params = params.append('search', shopParams.search);
    return this.http
      .get<IPagination>(`${this.baseUrl}products`, {
        observe: 'response',
        params,
      })
      .pipe(map((res) => res.body));
  }
  getProduct(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseUrl}products/${id}`);
  }
  getBrands(): Observable<IProductBrand[]> {
    return this.http.get<IProductBrand[]>(`${this.baseUrl}products/brands`);
  }
  getTypes(): Observable<IProductType[]> {
    return this.http.get<IProductType[]>(`${this.baseUrl}products/types`);
  }
}
