// Se importan los módulos necesarios
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product, CreateProduct } from '../models/product.model';

// Decorador que permite que el servicio esté disponible en toda la aplicación
@Injectable({
  providedIn: 'root'
})

// Clase del servicio de productos
export class ProductService {

  // URL base del endpoint de productos
  private apiUrl = 'https://localhost:7145/api/productos';

  // BehaviorSubject que almacena la lista actual de productos
  private productosSubject = new BehaviorSubject<Product[]>([]);

  // Observable público que los componentes pueden usar para obtener los productos
  productos$ = this.productosSubject.asObservable();

  // Constructor donde se inyecta el HttpClient para realizar peticiones HTTP
  constructor(private http: HttpClient) {}

  // Método que carga todos los productos desde el backend
  loadProductos(): void {

    this.http.get<Product[]>(this.apiUrl)
      .subscribe({

        // Si la petición es exitosa
        next: (productos) => {
          console.log('Productos cargados:', productos);

          // Se actualiza el BehaviorSubject con la nueva lista
          this.productosSubject.next(productos);
        },

        // Si ocurre un error
        error: (err) => {
          console.error('Error cargando productos:', err);
        }
      });
  }

  // Método que agrega un nuevo producto
  addProducto(product: CreateProduct): Observable<any> {

    return this.http.post(this.apiUrl, product)

      // Después de agregar, se recarga la lista de productos
      .pipe(tap(() => this.loadProductos()));
  }

  // Método que actualiza un producto existente
  updateProducto(id: number, product: CreateProduct): Observable<any> {

    return this.http.put(`${this.apiUrl}/${id}`, product)

      // Después de actualizar, se recarga la lista
      .pipe(tap(() => this.loadProductos()));
  }

  // Método que elimina un producto por su id
  deleteProducto(id: number): Observable<any> {

    return this.http.delete(`${this.apiUrl}/${id}`)

      // Después de eliminar, se recarga la lista
      .pipe(tap(() => this.loadProductos()));
  }
}
