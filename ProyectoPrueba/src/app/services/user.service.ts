// Se importan los módulos necesarios
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User, CreateUser } from '../models/user.model';

// Decorador que permite que el servicio esté disponible en toda la aplicación
@Injectable({
  providedIn: 'root'
})

// Clase del servicio de usuarios
export class UserService {

  // URL base del endpoint de usuarios
  private apiUrl = 'https://localhost:7145/api/usuarios';

  // BehaviorSubject que almacena la lista actual de usuarios
  private usuariosSubject = new BehaviorSubject<User[]>([]);

  // Observable público que los componentes pueden usar para obtener los usuarios
  usuarios$ = this.usuariosSubject.asObservable();

  // Constructor donde se inyecta el HttpClient para realizar peticiones HTTP
  constructor(private http: HttpClient) {}

  // Método que carga todos los usuarios desde el backend
  loadUsuarios(): void {

    this.http.get<User[]>(this.apiUrl)
      .subscribe({

        // Si la petición es exitosa, se actualiza la lista
        next: data => this.usuariosSubject.next(data),

        // Si ocurre un error, se muestra en consola
        error: err => console.error(err)
      });
  }

  // Método que agrega un nuevo usuario
  addUsuario(user: CreateUser): Observable<any> {

    return this.http.post(this.apiUrl, user)

      // Después de agregar, se recarga la lista de usuarios
      .pipe(tap(() => this.loadUsuarios()));
  }

  // Método que actualiza un usuario existente
  updateUsuario(id: number, user: CreateUser): Observable<any> {

    return this.http.put(`${this.apiUrl}/${id}`, user)

      // Después de actualizar, se recarga la lista
      .pipe(tap(() => this.loadUsuarios()));
  }

  // Método que elimina un usuario por su id
  deleteUsuario(id: number): Observable<any> {

    return this.http.delete(`${this.apiUrl}/${id}`)

      // Después de eliminar, se recarga la lista
      .pipe(tap(() => this.loadUsuarios()));
  }
}
