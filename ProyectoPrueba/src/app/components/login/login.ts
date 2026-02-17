// Se importan los módulos necesarios
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

// Decorador que define la configuración del componente
@Component({

  // Selector que se utilizará en el HTML para llamar este componente
  selector: 'app-login',
  standalone: true,

  // Módulos que este componente necesita para funcionar
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})

// Clase principal del componente
export class Login {

  // Evento que se emite cuando el login es exitoso
  @Output() loginSuccess = new EventEmitter<void>();

  // Evento que se emite para navegar a la creación de usuario
  @Output() createUser = new EventEmitter<void>();

  // Propiedad que almacena el nombre de usuario
  username = '';

  // Propiedad que almacena la contraseña
  password = '';

  // Propiedad que controla el estado de carga
  loading = false;

  // Constructor donde se inyecta el servicio de autenticación
  constructor(private authService: AuthService) {}

  // Método que se ejecuta al intentar iniciar sesión
  login() {

    // Validación: verifica que usuario y contraseña no estén vacíos
    if (!this.username || !this.password) {
      alert('Debe ingresar usuario y contraseña');
      return;
    }

    // Activa el indicador de carga
    this.loading = true;

    // Llama al servicio de autenticación enviando usuario y contraseña
    this.authService.login(this.username, this.password)
      .subscribe({

        // Si la autenticación es exitosa
        next: () => {
          console.log('Login correcto con JWT');
          this.loginSuccess.emit();
        },

        // Si ocurre un error (credenciales inválidas)
        error: () => {
          alert('Credenciales inválidas');
          this.loading = false;
        }
      });
  }

  // Método que emite el evento para ir a la pantalla de crear usuario
  goToCreateUser() {
    this.createUser.emit();
  }
}
