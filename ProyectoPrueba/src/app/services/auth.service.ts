// Se importan los módulos necesarios
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

// Decorador que permite que el servicio esté disponible en toda la aplicación
@Injectable({
  providedIn: 'root'
})

// Clase del servicio de autenticación
export class AuthService {

  // URL base del endpoint de autenticación
  private apiUrl = 'https://localhost:7145/api/auth';

  // Constructor donde se inyecta el HttpClient para realizar peticiones HTTP
  constructor(private http: HttpClient) {}

  // Método que realiza el login enviando usuario y contraseña al backend
  login(username: string, password: string): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/login`, {

      // Datos que se envían al backend
      usuario_user: username,
      usuario_Contrasena: password

    }).pipe(

      // Operador que permite ejecutar una acción secundaria con la respuesta
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  // Método que elimina el token del localStorage (cerrar sesión)
  logout() {
    localStorage.removeItem('token');
  }

  // Método que obtiene el token almacenado
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Método que verifica si el usuario está autenticado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
