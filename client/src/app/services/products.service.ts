import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/IProduct';
import { IPagination } from '../interfaces/IPagination';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseUrl = 'https://localhost:44353/api/';
  constructor(private http: HttpClient) {}

  GetProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.baseUrl}products`);
  }
  PaginateProduct(): Observable<IPagination> {
    return this.http.get<IPagination>(`${this.baseUrl}products?PageSize=5`);
  }
}
