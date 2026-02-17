import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http'; // <- para llamadas HTTP

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private products: Product[] = [];
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  private apiUrl = 'https://localhost:7145/api/Productos'; // <- define tu URL de API

  constructor(private http: HttpClient) { // <- inyecta HttpClient

    // SOLO ejecutar localStorage si estamos en el navegador
    if (this.isBrowser) {
      const data = localStorage.getItem('products');
      if (data) {
        this.products = JSON.parse(data);
        this.productsSubject.next(this.products);
      }
    }
  }

  private updateStorage() {
    if (this.isBrowser) {
      localStorage.setItem('products', JSON.stringify(this.products));
    }
    this.productsSubject.next(this.products);
  }

  // Agregar producto en localStorage
  addProduct(product: Product) {
    this.products.push(product);
    this.updateStorage();
  }

  // Eliminar producto vía HTTP
  deleteProduct(product: Product) {
    return this.http.delete(`${this.apiUrl}/${product.producto_id}`);
  }
}
