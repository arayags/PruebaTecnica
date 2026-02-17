// Se importan los módulos necesarios
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

// Decorador que permite que el servicio esté disponible en toda la aplicación
@Injectable({
  providedIn: 'root'
})

// Clase del servicio de categorías
export class CategoryService {

  // URL base del endpoint de categorías
  private apiUrl = 'https://localhost:7145/api/categorias';

  // BehaviorSubject que almacena la lista actual de categorías
  private categoriasSubject = new BehaviorSubject<any[]>([]);

  // Observable público que los componentes pueden suscribirse para obtener las categorías
  categorias$ = this.categoriasSubject.asObservable();

  // Constructor donde se inyecta el HttpClient para realizar peticiones HTTP
  constructor(private http: HttpClient) {}

  // Método que carga todas las categorías desde el backend
  loadCategorias() {

    this.http.get<any[]>(this.apiUrl)
      .subscribe(data => this.categoriasSubject.next(data));
  }

  // Método que agrega una nueva categoría
  addCategoria(descripcion: string) {

    return this.http.post(this.apiUrl, {
      categoria_Descripcion: descripcion

    })

    // Después de agregar, se vuelven a cargar las categorías
      .pipe(tap(() => this.loadCategorias()));
  }
}
